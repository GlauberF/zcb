import {prismaClient} from "../../infra/database/prismaClient";
import {FakeJWT} from "../../utils/fakeJWT";

export class BuscarVendasUsecase {
    constructor() {
    }

    async execute(id: string) {
        if (!id) throw new Error('O ID do registro não foi fornecido');

        return prismaClient.vendas.findUnique({
            where: {
                id,
                id_usuario: FakeJWT().id
            },
            include: {
                cliente: true,
                formaPagamento: true,
                produtos: {
                    include: {
                        produto: true,
                    },
                },
            },
        });

    }
}