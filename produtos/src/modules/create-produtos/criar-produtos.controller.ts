import {getPostData} from "../../utils/utils";
import {handleGenericError, handleNoBody} from "../../utils/errors";
import {handleResponse} from "../../utils/response";

import {CriarProdutosUsecase} from "./criar-produtos.usecase";

export class CriarProdutosController {
    constructor() {
    }

    async handle(req: any, res: any) {
        const body = await getPostData(req);
        const useCase = new CriarProdutosUsecase();

        try {
            const result = await useCase.execute(JSON.parse(body));
            return handleResponse(res, result, 'Registro criado com sucesso.');
        } catch (e) {
            const msg = e.message || e.toString();
            if (msg === 'Body da solicitação ausente') {
                return handleNoBody(res);
            }
            return handleGenericError(res, e);
        }
    }
}