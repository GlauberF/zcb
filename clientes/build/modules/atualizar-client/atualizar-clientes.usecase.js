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
exports.AtualizarClientesUsecase = void 0;
const prismaClient_1 = require("../../infra/database/prismaClient");
const producer_1 = require("../../infra/provider/kafka/producer");
const fakeJWT_1 = require("../../utils/fakeJWT");
class AtualizarClientesUsecase {
    constructor() {
    }
    execute(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id)
                throw new Error('O ID do registro não foi fornecido');
            if (!data)
                throw new Error('Body da solicitação ausente');
            const atualizarCliente = yield prismaClient_1.prismaClient.clientes.update({
                where: {
                    id: id,
                    id_usuario: (0, fakeJWT_1.FakeJWT)().id,
                },
                data: {
                    nome: data.nome,
                    cpf: data.cpf,
                    endereco: data.endereco,
                    email: data.email,
                    cep: data.cep
                },
            });
            console.log('MS_CLIENTES_UPDATED');
            const kafkaProducer = new producer_1.KafkaSendMessage();
            yield kafkaProducer.execute('MS_CLIENTES_UPDATED', atualizarCliente);
            return atualizarCliente;
        });
    }
}
exports.AtualizarClientesUsecase = AtualizarClientesUsecase;
