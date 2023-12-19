import {extractId, extractQueryParams} from '../utils/utils';
import {handleMissingId} from "../utils/errors";

import {CriarClientesController} from "../modules/create-client/criar-clientes.controller";
import {AtualizarClientesController} from "../modules/atualizar-client/atualizar-clientes.controller";
import {prismaClient} from "./database/prismaClient";
import {DeletarClientesController} from "../modules/deletar-client/deletar-clientes.controller";

const routes = async (req: any, res: any) => {
    const id = extractId(req.url);
    const queryParams = extractQueryParams(req.url);

    if ((!id || Object.keys(queryParams).length) && req.method === 'GET') {
        const a = await prismaClient.clientes.findMany()
        res.end(JSON.stringify(a));
        //getProducts(req, res);
    } else if (id && req.method === 'GET') {
        res.end(`GET ${id}`);
        //getProduct(req, res, id);
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