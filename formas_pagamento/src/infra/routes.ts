import {extractId, extractQueryParams} from '../utils/utils';
import {handleMissingId} from "../utils/errors";

import {CriarFormasPagamentoController} from "../modules/create-formas-pagamento/criar-formas-pagamento.controller";
import {AtualizarFormasPagamentoController} from "../modules/atualizar-formas-pagamento/atualizar-formas-pagamento.controller";
import {
    DeletarFormasPagamentoController
} from "../modules/deletar-formas-pagamento/deletar-formas-pagamento.controller";
import {BuscarFormasPagamentoController} from "../modules/buscar-formas-pagamento/buscar-formas-pagamento.controller";
import {ListarFormasPagamentoController} from "../modules/listar-formas-pagamento/listar-formas-pagamento.controller";

const routes = async (req: any, res: any) => {
    const id = extractId(req.url);
    const queryParams = extractQueryParams(req.url);

    if ((!id || Object.keys(queryParams).length) && req.method === 'GET') {
        return new ListarFormasPagamentoController().handle(req, res);
    } else if (id && req.method === 'GET') {
        return new BuscarFormasPagamentoController().handle(req, res);
    } else if (req.url === '/' && req.method === 'POST') {
        return new CriarFormasPagamentoController().handle(req, res);
    } else if (id && req.method === 'PUT') {
        return new AtualizarFormasPagamentoController().handle(req, res);
    } else if (id && req.method === 'DELETE') {
        return new DeletarFormasPagamentoController().handle(req, res);
    } else {
        handleMissingId(res);
    }
};

export default routes;