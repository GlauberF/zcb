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
exports.CriarProdutosController = void 0;
const utils_1 = require("../../utils/utils");
const errors_1 = require("../../utils/errors");
const response_1 = require("../../utils/response");
const criar_produtos_usecase_1 = require("./criar-produtos.usecase");
class CriarProdutosController {
    constructor() {
    }
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = yield (0, utils_1.getPostData)(req);
            const useCase = new criar_produtos_usecase_1.CriarProdutosUsecase();
            try {
                const result = yield useCase.execute(JSON.parse(body));
                return (0, response_1.handleResponse)(res, result, 'Registro criado com sucesso.');
            }
            catch (e) {
                const msg = e.message || e.toString();
                if (msg === 'Body da solicitação ausente') {
                    return (0, errors_1.handleNoBody)(res);
                }
                return (0, errors_1.handleGenericError)(res, e);
            }
        });
    }
}
exports.CriarProdutosController = CriarProdutosController;
