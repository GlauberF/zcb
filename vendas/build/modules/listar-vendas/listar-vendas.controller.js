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
exports.ListarVendasController = void 0;
const utils_1 = require("../../utils/utils");
const errors_1 = require("../../utils/errors");
const response_1 = require("../../utils/response");
const listar_vendas_usecase_1 = require("./listar-vendas.usecase");
class ListarVendasController {
    constructor() {
    }
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryParams = (0, utils_1.extractQueryParams)(req.url);
            const useCase = new listar_vendas_usecase_1.ListarVendasUsecase();
            let limit = parseInt((queryParams === null || queryParams === void 0 ? void 0 : queryParams.limit) || '10', 10);
            let page = parseInt((queryParams === null || queryParams === void 0 ? void 0 : queryParams.page) || '0', 10);
            try {
                const result = yield useCase.execute(queryParams);
                return (0, response_1.handleResponse)(res, result, undefined, 200, page, limit);
            }
            catch (e) {
                return (0, errors_1.handleGenericError)(res, e);
            }
        });
    }
}
exports.ListarVendasController = ListarVendasController;
