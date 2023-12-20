import {extractQueryParams} from "../../utils/utils";
import {handleGenericError} from "../../utils/errors";
import {handleResponse} from "../../utils/response";

import {ListarProdutosUsecase} from "./listar-produtos.usecase";

export class ListarProdutosController {
    constructor() {
    }

    async handle(req: any, res: any) {
        const queryParams = extractQueryParams(req.url);
        const useCase = new ListarProdutosUsecase();
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