import {extractId, extractQueryParams} from '../utils/utils';
import {handleMissingId} from "../utils/errors";

import {CriarVendasController} from "../modules/create-vendas/criar-vendas.controller";
import {AtualizarProdutosController} from "../modules/atualizar-produtos/atualizar-produtos.controller";
import {DeletarProdutosController} from "../modules/deletar-produtos/deletar-produtos.controller";
import {BuscarProdutosController} from "../modules/buscar-produtos/buscar-produtos.controller";
import {ListarVendasController} from "../modules/listar-vendas/listar-vendas.controller";

const routes = async (req: any, res: any) => {
    const id = extractId(req.url);
    const queryParams = extractQueryParams(req.url);

    if ((!id || Object.keys(queryParams).length) && req.method === 'GET') {
        return new ListarVendasController().handle(req, res);
    } else if (id && req.method === 'GET') {
        return new BuscarProdutosController().handle(req, res);
    } else if (req.url === '/' && req.method === 'POST') {
        return new CriarVendasController().handle(req, res);
    } else if (id && req.method === 'PUT') {
        return new AtualizarProdutosController().handle(req, res);
    } else if (id && req.method === 'DELETE') {
        return new DeletarProdutosController().handle(req, res);
    } else {
        handleMissingId(res);
    }
};

export default routes;