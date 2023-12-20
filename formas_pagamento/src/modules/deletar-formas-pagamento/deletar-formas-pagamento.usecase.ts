import {prismaClient} from "../../infra/database/prismaClient";

export class DeletarFormasPagamentoUsecase {
    constructor() {
    }

    async execute(id: string) {
        if (!id) throw new Error('O ID do registro não foi fornecido');

        return prismaClient.formasPagamento.delete({
            where: {id}
        });
    }
}