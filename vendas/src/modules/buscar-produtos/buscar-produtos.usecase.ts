import {prismaClient} from "../../infra/database/prismaClient";

export class BuscarProdutosUsecase {
    constructor() {
    }

    async execute(id: string) {
        if (!id) throw new Error('O ID do registro não foi fornecido');

        return prismaClient.produtos.findUnique({
            where: {id}
        });
    }
}