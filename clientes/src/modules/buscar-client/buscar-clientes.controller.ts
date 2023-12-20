import {extractId} from "../../utils/utils";
import {handleGenericError, handleMissingId} from "../../utils/errors";
import {handleResponse} from "../../utils/response";

import {BuscarClientesUsecase} from "./buscar-clientes.usecase";

export class BuscarClientesController {
    constructor() {
    }

    async handle(req: any, res: any) {
        const id = extractId(req.url) ?? '';
        const useCase = new BuscarClientesUsecase();

        try {
            const result = await useCase.execute(id);
            return handleResponse(res, result, `Registro encontrado com sucesso!`, 200);
        } catch (e) {
            const msg = e.message || e.toString();
            if (msg === 'O ID do registro não foi fornecido') {
                return handleMissingId(res, 'O ID do registro não foi fornecido. Por favor, informe o ID do registro.');
            }
            return handleGenericError(res, e);
        }
    }
}