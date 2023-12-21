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
exports.DeletarClientesUsecase = void 0;
const prismaClient_1 = require("../../infra/database/prismaClient");
const producer_1 = require("../../infra/provider/kafka/producer");
class DeletarClientesUsecase {
    constructor() {
    }
    execute(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id)
                throw new Error('O ID do registro não foi fornecido');
            const deletarCliente = yield prismaClient_1.prismaClient.clientes.delete({
                where: { id }
            });
            console.log('MS_CLIENTES_DELETED');
            const kafkaProducer = new producer_1.KafkaSendMessage();
            yield kafkaProducer.execute('MS_CLIENTES_DELETED', deletarCliente);
            return deletarCliente;
        });
    }
}
exports.DeletarClientesUsecase = DeletarClientesUsecase;
