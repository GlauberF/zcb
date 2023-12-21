import {extractQueryParams} from "../../utils/utils";
import {handleGenericError} from "../../utils/errors";
import {handleResponse} from "../../utils/response";

import {ListarVendasUsecase} from "./listar-vendas.usecase";

export class ListarVendasController {
    constructor() {
    }

    async handle(req: any, res: any) {
        const queryParams = extractQueryParams(req.url);
        const useCase = new ListarVendasUsecase();
        let limit = parseInt(queryParams?.limit || '10', 10);
        let page = parseInt(queryParams?.page || '0', 10);

        try {
            const result = await useCase.execute(queryParams);
            return handleResponse(res, result, undefined, 200, page, limit);
        } catch (e) {
            return handleGenericError(res, e);
        }
    }
}