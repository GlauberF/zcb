import {prismaClient} from "../../infra/database/prismaClient";

type CriarClientesRequest = {
    nome: string,
    cpf: string,
    endereco: string,
    email: string,
    cep: string
}

export class CriarClientesUseCase {
    constructor() {}

    async execute(data: CriarClientesRequest) {
        const cliente = await prismaClient.clientes.findFirst({
            where: {
                email: data.email
            }
        });

        if (cliente) throw new Error('Cliente já existe');

        const novoCliente = await prismaClient.clientes.create({
            data: {
                ...data
            }
        });

        return novoCliente;
    }
}