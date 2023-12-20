import {prismaClient} from "../../infra/database/prismaClient";

export class DeletarClientesUsecase {
    constructor() {}

    async execute(id: string) {
        if (!id) throw new Error('O ID do registro não foi fornecido');

        return prismaClient.clientes.delete({
            where: {id}
        });
    }
}