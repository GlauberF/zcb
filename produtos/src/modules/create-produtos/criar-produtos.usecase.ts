import {prismaClient} from "../../infra/database/prismaClient";
import {KafkaSendMessage} from "../../infra/provider/kafka/producer";
import {FakeJWT} from "../../utils/fakeJWT";

type CriarProdutosRequest = {
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
                id_usuario: FakeJWT().id,
                ...data
            }
        });

        const kafkaProducer = new KafkaSendMessage();
        await kafkaProducer.execute('MS_PRODUTOS_CREATED', novoProduto);

        return novoProduto;
    }
}