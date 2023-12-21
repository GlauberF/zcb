"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils/utils");
const errors_1 = require("../utils/errors");
const criar_formas_pagamento_controller_1 = require("../modules/create-formas-pagamento/criar-formas-pagamento.controller");
const atualizar_formas_pagamento_controller_1 = require("../modules/atualizar-formas-pagamento/atualizar-formas-pagamento.controller");
const deletar_formas_pagamento_controller_1 = require("../modules/deletar-formas-pagamento/deletar-formas-pagamento.controller");
const buscar_formas_pagamento_controller_1 = require("../modules/buscar-formas-pagamento/buscar-formas-pagamento.controller");
const listar_formas_pagamento_controller_1 = require("../modules/listar-formas-pagamento/listar-formas-pagamento.controller");
const routes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = (0, utils_1.extractId)(req.url);
    const queryParams = (0, utils_1.extractQueryParams)(req.url);
    if ((!id || Object.keys(queryParams).length) && req.method === 'GET') {
        return new listar_formas_pagamento_controller_1.ListarFormasPagamentoController().handle(req, res);
    }
    else if (id && req.method === 'GET') {
        return new buscar_formas_pagamento_controller_1.BuscarFormasPagamentoController().handle(req, res);
    }
    else if (req.url === '/' && req.method === 'POST') {
        return new criar_formas_pagamento_controller_1.CriarFormasPagamentoController().handle(req, res);
    }
    else if (id && req.method === 'PUT') {
        return new atualizar_formas_pagamento_controller_1.AtualizarFormasPagamentoController().handle(req, res);
    }
    else if (id && req.method === 'DELETE') {
        return new deletar_formas_pagamento_controller_1.DeletarFormasPagamentoController().handle(req, res);
    }
    else {
        (0, errors_1.handleMissingId)(res);
    }
});
exports.default = routes;
