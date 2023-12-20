import {prismaClient} from "../../infra/database/prismaClient";

type CriarFormasPagamentoRequest = {
    id_usuario: string,
    nome: string,
    parcelas: string
}

export class CriarFormasPagamentoUsecase {
    constructor() {}

    async execute(data: CriarFormasPagamentoRequest) {
        if (!data) throw new Error('Body da solicitação ausente');

        return prismaClient.formasPagamento.create({
            data: {
                ...data
            }
        });
    }
}