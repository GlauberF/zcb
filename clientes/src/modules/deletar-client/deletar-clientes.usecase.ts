import {prismaClient} from "../../infra/database/prismaClient";

export class DeletarClientesUsecase {
    constructor() {}

    async execute(id: string) {
        if (!id) throw new Error('O ID do registro não foi fornecido');

        const deletarCliente = await prismaClient.clientes.delete({
            where: {
                id
            }
        });

        return deletarCliente;
    }
}