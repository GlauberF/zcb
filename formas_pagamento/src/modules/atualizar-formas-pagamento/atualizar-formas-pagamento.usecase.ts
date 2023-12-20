import {prismaClient} from "../../infra/database/prismaClient";

type AtualizarFormasPagamentoRequest = {
    nome: string,
    parcelas: string
}

export class AtualizarFormasPagamentoUsecase {
    constructor() {
    }

    async execute(id: string, data: AtualizarFormasPagamentoRequest) {
        if (!id) throw new Error('O ID do registro não foi fornecido');

        if (!data) throw new Error('Body da solicitação ausente');

        return prismaClient.formasPagamento.update({
            where: {id: id},
            data: {
                nome: data.nome,
                parcelas: data.parcelas
            },
        });
    }
}