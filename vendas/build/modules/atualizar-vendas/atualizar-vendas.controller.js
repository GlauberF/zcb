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
exports.AtualizarVendasController = void 0;
const utils_1 = require("../../utils/utils");
const errors_1 = require("../../utils/errors");
const response_1 = require("../../utils/response");
const atualizar_vendas_usecase_1 = require("./atualizar-vendas.usecase");
class AtualizarVendasController {
    constructor() {
    }
    handle(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const body = yield (0, utils_1.getPostData)(req);
            const id = (_a = (0, utils_1.extractId)(req.url)) !== null && _a !== void 0 ? _a : '';
            const useCase = new atualizar_vendas_usecase_1.AtualizarVendasUsecase();
            try {
                const result = yield useCase.execute(id, JSON.parse(body));
                return (0, response_1.handleResponse)(res, result, `Registro alterado com sucesso!`, 200);
            }
            catch (e) {
                const msg = e.message || e.toString();
                if (msg === 'O ID do registro não foi fornecido') {
                    return (0, errors_1.handleMissingId)(res, 'O ID do registro não foi fornecido. Por favor, informe o ID do registro.');
                }
                else if (msg === 'Body da solicitação ausente') {
                    return (0, errors_1.handleNoBody)(res);
                }
                return (0, errors_1.handleGenericError)(res, e);
            }
        });
    }
}
exports.AtualizarVendasController = AtualizarVendasController;
