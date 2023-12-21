import {prismaClient} from "../../infra/database/prismaClient";
import {FakeJWT} from "../../utils/fakeJWT";

export class DeletarProdutosUsecase {
    constructor() {
    }

    async execute(id: string) {
        if (!id) throw new Error('O ID do registro não foi fornecido');

        return prismaClient.produtos.delete({
            where: {
                id,
                id_usuario: FakeJWT().id
            }
        });
    }
}