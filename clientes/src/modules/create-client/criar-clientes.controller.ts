import {getPostData} from "../../utils/utils";
import {handleDataAlreadyExists, handleGenericError, handleNoBody} from "../../utils/errors";
import {handleResponse} from "../../utils/response";

import {CriarClientesUseCase} from "./criar-clientes.usecase";

export class CriarClientesController {
    constructor() {
    }

    async handle(req: any, res: any) {
        const body = await getPostData(req);
        const useCase = new CriarClientesUseCase();

        try {
            const result = await useCase.execute(JSON.parse(body));
            return handleResponse(res, result);
        } catch (e) {
            const msg = (e as Error)?.message || e.toString();
            if (msg === 'Cliente já existe') {
                return handleDataAlreadyExists(res, 'Cliente já existe');
            } else if (msg === 'Body da solicitação ausente') {
                return handleNoBody(res);
            }
            return handleGenericError(res, e);
        }
    }
}