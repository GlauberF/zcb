import {prismaClient} from "../../infra/database/prismaClient";
import {FakeJWT} from "../../utils/fakeJWT";

type AtualizarProdutosRequest = {
    nome: string,
    quantidade: number,
    preco: number
}

export class AtualizarProdutosUsecase {
    constructor() {
    }

    async execute(id: string, data: AtualizarProdutosRequest) {
        if (!id) throw new Error('O ID do registro não foi fornecido');

        if (!data) throw new Error('Body da solicitação ausente');

        return prismaClient.produtos.update({
            where: {
                id,
                id_usuario: FakeJWT().id
            },
            data: {
                nome: data.nome,
                quantidade: data.quantidade,
                preco: data.preco
            },
        });
    }
}