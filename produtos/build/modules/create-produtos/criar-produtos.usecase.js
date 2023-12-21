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
exports.CriarProdutosUsecase = void 0;
const prismaClient_1 = require("../../infra/database/prismaClient");
const producer_1 = require("../../infra/provider/kafka/producer");
class CriarProdutosUsecase {
    constructor() { }
    execute(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!data)
                throw new Error('Body da solicitação ausente');
            const novoProduto = yield prismaClient_1.prismaClient.produtos.create({
                data: Object.assign({}, data)
            });
            const kafkaProducer = new producer_1.KafkaSendMessage();
            yield kafkaProducer.execute('MS_PRODUTOS_CREATED', novoProduto);
            return novoProduto;
        });
    }
}
exports.CriarProdutosUsecase = CriarProdutosUsecase;