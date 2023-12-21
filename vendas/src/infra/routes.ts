import {extractId, extractQueryParams} from '../utils/utils';
import {handleMissingId} from "../utils/errors";

import {CriarVendasController} from "../modules/create-vendas/criar-vendas.controller";
import {AtualizarVendasController} from "../modules/atualizar-vendas/atualizar-vendas.controller";
import {DeletarVendasController} from "../modules/deletar-vendas/deletar-vendas.controller";
import {BuscarVendasController} from "../modules/buscar-vendas/buscar-vendas.controller";
import {ListarVendasController} from "../modules/listar-vendas/listar-vendas.controller";

const routes = async (req: any, res: any) => {
    const id = extractId(req.url);
    const queryParams = extractQueryParams(req.url);

    if ((!id || Object.keys(queryParams).length) && req.method === 'GET') {
        return new ListarVendasController().handle(req, res);
    } else if (id && req.method === 'GET') {
        return new BuscarVendasController().handle(req, res);
    } else if (req.url === '/' && req.method === 'POST') {
        return new CriarVendasController().handle(req, res);
    } else if (id && req.method === 'PUT') {
        return new AtualizarVendasController().handle(req, res);
    } else if (id && req.method === 'DELETE') {
        return new DeletarVendasController().handle(req, res);
    } else {
        handleMissingId(res);
    }
};

export default routes;