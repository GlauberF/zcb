import {prismaClient} from "../../infra/database/prismaClient";

type CriarClientesRequest = {
    nome: string,
    id_usuario: string,
    cpf: string,
    endereco: string,
    email: string,
    cep: string
}

export class CriarClientesUseCase {
    constructor() {
    }

    async execute(data: CriarClientesRequest) {
        if (!data) throw new Error('Body da solicitação ausente');

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