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
exports.produtoCriadoConsumers = void 0;
const prismaClient_1 = require("../../../database/prismaClient");
const index_1 = require("../index");
const consumer = index_1.kafka.consumer({ groupId: 'MS_VENDA_PRODUTO_CRIADO' });
const produtoCriadoConsumers = () => __awaiter(void 0, void 0, void 0, function* () {
    yield consumer.connect();
    yield consumer.subscribe({ topic: "MS_PRODUTOS_CREATED", fromBeginning: true });
    yield consumer.run({
        eachMessage: ({ message }) => __awaiter(void 0, void 0, void 0, function* () {
            const messageToString = message.value.toString();
            const produto = JSON.parse(messageToString);
            yield prismaClient_1.prismaClient.produtos.create({
                data: {
                    id: produto.id,
                    id_usuario: produto.id_usuario,
                    nome: produto.nome,
                    quantidade: produto.quantidade,
                    preco: produto.preco,
                }
            });
        })
    });
});
exports.produtoCriadoConsumers = produtoCriadoConsumers;
// call
(0, exports.produtoCriadoConsumers)();
