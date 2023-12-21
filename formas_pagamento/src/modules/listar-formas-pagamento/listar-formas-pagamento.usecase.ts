import {prismaClient} from "../../infra/database/prismaClient";

export class ListarFormasPagamentoUsecase {
    constructor() {}

    async execute(queryParams?: any) {
        let limit = parseInt(queryParams?.limit || '10', 10);
        let page = parseInt(queryParams?.page || '0', 10);

        // Extrair limit e page e remover do queryParams
        const {limit: queryParamsLimit, page: queryParamsPage, ...restQueryParams} = queryParams || {};
        limit = parseInt(queryParamsLimit || '10', 10);
        page = parseInt(queryParamsPage || '0', 10);

        const where = Object.keys(restQueryParams).reduce((acc, key) => {
            acc[key] = {contains: restQueryParams[key], mode: 'insensitive'};
            return acc;
        }, {});

        const filter = Object.keys(where).length > 0 ? {where} : {};

        return prismaClient.formasPagamento.findMany({
            skip: page,
            take: limit,
            ...(filter as any),
        });
    }
}