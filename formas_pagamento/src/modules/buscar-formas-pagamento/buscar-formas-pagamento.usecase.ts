import {prismaClient} from "../../infra/database/prismaClient";

export class BuscarFormasPagamentoUsecase {
    constructor() {}

    async execute(id: string) {
        if (!id) throw new Error('O ID do registro não foi fornecido');

        return prismaClient.formasPagamento.findUnique({
            where: {id}
        });
    }
}