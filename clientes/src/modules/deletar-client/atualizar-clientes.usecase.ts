import {prismaClient} from "../../infra/database/prismaClient";

type AtualizarClientesRequest = {
    nome: string,
    cpf: string,
    endereco: string,
    email: string,
    cep: string
}

export class AtualizarClientesUsecase {
    constructor() {}

    async execute(id: string, data: AtualizarClientesRequest) {
        if (!id) throw new Error('O ID do registro não foi fornecido');

        const atualizarCliente = await prismaClient.clientes.update({
            where: { id: id },
            data: {
                nome: data.nome,
                cpf: data.cpf,
                endereco: data.endereco,
                email: data.email,
                cep: data.cep
            },
        });

        return atualizarCliente;
    }
}