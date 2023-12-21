import {prismaClient} from "../../infra/database/prismaClient";
import {KafkaSendMessage} from "../../infra/providers/kafka/producer";
import {FakeJWT} from "../../utils/fakeJWT";

type CriarVendasRequest = {
    clienteId: string,
    produtos: [{
        index: number,
        produtoId: string,
        quantidade: number,
        val_unit: number,
        val_tot: number
    }],
    formaPagamentoId: string,
    val_total: number
}

export class CriarVendasUsecase {
    constructor() {
    }

    async execute(data: CriarVendasRequest) {
        if (!data) throw new Error('Body da solicitação ausente');

        const venda = await prismaClient.vendas.create({
            data: {
                id_usuario: FakeJWT().id,
                clienteId: data.clienteId,
                produtos: {
                    createMany: {
                        data: data.produtos
                    }
                },
                formaPagamentoId: data.formaPagamentoId,
                val_total: data.val_total
            }
        });

        // Com mais tempo, tiraria daqui e colocaria tudo em uma fila queue ou analisaria melhor a abordagem
        for (const item of data.produtos) {
            const produtoDB = await prismaClient.produtos.findUnique({
                where: {
                    id: item.produtoId
                }
            });

            const produto = await prismaClient.produtos.update({
                where: {
                    id: item.produtoId
                },
                data: {
                    quantidade: (produtoDB?.quantidade || 0) - item.quantidade
                }
            });

            // Envia solicitaćão para atualizar Estoque
            const kafkaProducer = new KafkaSendMessage();
            await kafkaProducer.execute('MS_PRODUTOS_UPDATE_QUANTIDADE', produto);
        }

        return venda;
    }
}