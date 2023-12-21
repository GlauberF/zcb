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
exports.CriarVendasUsecase = void 0;
const prismaClient_1 = require("../../infra/database/prismaClient");
const producer_1 = require("../../infra/providers/kafka/producer");
const fakeJWT_1 = require("../../utils/fakeJWT");
class CriarVendasUsecase {
    constructor() {
    }
    execute(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!data)
                throw new Error('Body da solicitação ausente');
            const venda = yield prismaClient_1.prismaClient.vendas.create({
                data: {
                    id_usuario: (0, fakeJWT_1.FakeJWT)().id,
                    clienteId: data.clienteId,
                    produtos: {
                        createMany: {
                            data: data.produtos
                        }
                    },
                    formaPagamentoId: data.formaPagamentoId,
                    val_total: data.val_total
                }
            });
            // Com mais tempo, tiraria daqui e colocaria tudo em uma fila queue ou analisaria melhor a abordagem
            for (const item of data.produtos) {
                const produtoDB = yield prismaClient_1.prismaClient.produtos.findUnique({
                    where: {
                        id: item.produtoId
                    }
                });
                const produto = yield prismaClient_1.prismaClient.produtos.update({
                    where: {
                        id: item.produtoId
                    },
                    data: {
                        quantidade: ((produtoDB === null || produtoDB === void 0 ? void 0 : produtoDB.quantidade) || 0) - item.quantidade
                    }
                });
                // Envia solicitaćão para atualizar Estoque
                const kafkaProducer = new producer_1.KafkaSendMessage();
                yield kafkaProducer.execute('MS_PRODUTOS_UPDATE_QUANTIDADE', produto);
            }
            return venda;
        });
    }
}
exports.CriarVendasUsecase = CriarVendasUsecase;
