import {extractId, getPostData} from "../../utils/utils";
import {handleGenericError, handleMissingId, handleNoBody} from "../../utils/errors";
import {handleResponse} from "../../utils/response";

import {AtualizarVendasUsecase} from "./atualizar-vendas.usecase";

export class AtualizarVendasController {
    constructor() {
    }

    async handle(req: any, res: any) {
        const body = await getPostData(req);
        const id = extractId(req.url) ?? '';
        const useCase = new AtualizarVendasUsecase();

        try {
            const result = await useCase.execute(id, JSON.parse(body));
            return handleResponse(res, result, `Registro alterado com sucesso!`, 200);
        } catch (e) {
            const msg = e.message || e.toString();
            if (msg === 'O ID do registro não foi fornecido') {
                return handleMissingId(res, 'O ID do registro não foi fornecido. Por favor, informe o ID do registro.');
            }
            else if (msg === 'Body da solicitação ausente') {
                return handleNoBody(res);
            }
            return handleGenericError(res, e);
        }
    }
}