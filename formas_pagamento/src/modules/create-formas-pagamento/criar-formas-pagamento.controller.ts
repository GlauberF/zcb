import {getPostData} from "../../utils/utils";
import {handleGenericError, handleNoBody} from "../../utils/errors";
import {handleResponse} from "../../utils/response";

import {CriarFormasPagamentoUsecase} from "./criar-formas-pagamento.usecase";

export class CriarFormasPagamentoController {
    constructor() {
    }

    async handle(req: any, res: any) {
        const body = await getPostData(req);
        const useCase = new CriarFormasPagamentoUsecase();

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