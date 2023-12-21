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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListarProdutosUsecase = void 0;
const prismaClient_1 = require("../../infra/database/prismaClient");
class ListarProdutosUsecase {
    constructor() { }
    execute(queryParams) {
        return __awaiter(this, void 0, void 0, function* () {
            let limit = parseInt((queryParams === null || queryParams === void 0 ? void 0 : queryParams.limit) || '10', 10);
            let page = parseInt((queryParams === null || queryParams === void 0 ? void 0 : queryParams.page) || '0', 10);
            // Extrair limit e page e remover do queryParams
            const _a = queryParams || {}, { limit: queryParamsLimit, page: queryParamsPage } = _a, restQueryParams = __rest(_a, ["limit", "page"]);
            limit = parseInt(queryParamsLimit || '10', 10);
            page = parseInt(queryParamsPage || '0', 10);
            const where = Object.keys(restQueryParams).reduce((acc, key) => {
                acc[key] = { contains: restQueryParams[key], mode: 'insensitive' };
                return acc;
            }, {});
            const filter = Object.keys(where).length > 0 ? { where } : {};
            return prismaClient_1.prismaClient.produtos.findMany(Object.assign({ skip: page, take: limit }, filter));
        });
    }
}
exports.ListarProdutosUsecase = ListarProdutosUsecase;