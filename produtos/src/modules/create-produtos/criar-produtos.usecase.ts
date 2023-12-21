import {prismaClient} from "../../infra/database/prismaClient";
import {KafkaSendMessage} from "../../infra/provider/kafka/producer";

type CriarProdutosRequest = {
    id_usuario: string,
    nome: string,
    quantidade: number,
    preco: number
}

export class CriarProdutosUsecase {
    constructor() {}

    async execute(data: CriarProdutosRequest) {
        if (!data) throw new Error('Body da solicitação ausente');

        const novoProduto = await prismaClient.produtos.create({
            data: {
                ...data
            }
        });

        const kafkaProducer = new KafkaSendMessage();
        await kafkaProducer.execute('MS_PRODUTOS_CREATED', novoProduto);

        return novoProduto;
    }
}