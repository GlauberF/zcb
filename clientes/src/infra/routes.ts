import {extractId, extractQueryParams} from '../utils/utils';
import {handleMissingId} from "../utils/errors";
import {prismaClient} from "./database/prismaClient";

import {CriarClientesController} from "../modules/create-client/criar-clientes.controller";
import {AtualizarClientesController} from "../modules/atualizar-client/atualizar-clientes.controller";
import {DeletarClientesController} from "../modules/deletar-client/deletar-clientes.controller";
import {BuscarClientesController} from "../modules/buscar-client/buscar-clientes.controller";
import {ListarClientesController} from "../modules/listar-client/listar-clientes.controller";

const routes = async (req: any, res: any) => {
    const id = extractId(req.url);
    const queryParams = extractQueryParams(req.url);

    if ((!id || Object.keys(queryParams).length) && req.method === 'GET') {
        return new ListarClientesController().handle(req,res);
    } else if (id && req.method === 'GET') {
        return new BuscarClientesController().handle(req, res);
    } else if (req.url === '/' && req.method === 'POST') {
        return new CriarClientesController().handle(req, res);
    } else if (id && req.method === 'PUT') {
        return new AtualizarClientesController().handle(req, res);
    } else if (id && req.method === 'DELETE') {
        return new DeletarClientesController().handle(req, res);
    } else {
        handleMissingId(res);
    }
};

export default routes;