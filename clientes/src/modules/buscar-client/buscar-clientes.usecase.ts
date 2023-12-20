import {prismaClient} from "../../infra/database/prismaClient";

export class BuscarClientesUsecase {
    constructor() {
    }

    async execute(id: string) {
        if (!id) throw new Error('O ID do registro não foi fornecido');

        return prismaClient.clientes.findUnique({
            where: {id}
        });
    }
}