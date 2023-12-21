import {prismaClient} from "../../infra/database/prismaClient";
import {FakeJWT} from "../../utils/fakeJWT";

type AtualizarVendasRequest = {
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

export class AtualizarVendasUsecase {
    constructor() {
    }

    async execute(id: string, data: AtualizarVendasRequest) {
        if (!id) throw new Error('O ID do registro não foi fornecido');

        if (!data) throw new Error('Body da solicitação ausente');

        // Aqui deveria fazer mesmo esquema de analisar se as quantidade mudaram para disparar o kafka

        return prismaClient.vendas.update({
            where: {
                id,
                id_usuario: FakeJWT().id
            },
            data: {
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
    }
}