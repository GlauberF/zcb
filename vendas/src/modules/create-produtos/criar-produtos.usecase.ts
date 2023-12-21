import {prismaClient} from "../../infra/database/prismaClient";

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

        return prismaClient.produtos.create({
            data: {
                ...data
            }
        });
    }
}