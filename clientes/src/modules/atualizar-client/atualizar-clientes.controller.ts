import {extractId, getPostData} from "../../utils/utils";
import {handleDataAlreadyExists, handleGenericError, handleMissingId, handleNoBody} from "../../utils/errors";
import {handleResponse} from "../../utils/response";

import {AtualizarClientesUsecase} from "./atualizar-clientes.usecase";

export class AtualizarClientesController {
    constructor() {}

    async handle(req: any, res: any) {
        const body = await getPostData(req);
        const id = extractId(req.url) ?? '';

        if (!body) {
            return handleNoBody(res);
        }

        const useCase = new AtualizarClientesUsecase();

        try {
            const result = await useCase.execute(id, JSON.parse(body));
            return handleResponse(res, result);
        } catch (e) {
            const msg = e.message || e.toString();
            if (msg === 'O ID do registro não foi fornecido') {
                return handleMissingId(res, 'O ID do registro não foi fornecido. Por favor, informe o ID do registro no corpo da requisição');
            }
            return handleGenericError(res, e);
        }
    }
}