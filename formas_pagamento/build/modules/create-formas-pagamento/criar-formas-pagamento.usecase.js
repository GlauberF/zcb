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
exports.CriarFormasPagamentoUsecase = void 0;
const prismaClient_1 = require("../../infra/database/prismaClient");
const producer_1 = require("../../infra/provider/kafka/producer");
const fakeJWT_1 = require("../../utils/fakeJWT");
class CriarFormasPagamentoUsecase {
    constructor() { }
    execute(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!data)
                throw new Error('Body da solicitação ausente');
            const novaFormaPagamento = yield prismaClient_1.prismaClient.formasPagamento.create({
                data: Object.assign({ id_usuario: (0, fakeJWT_1.FakeJWT)().id }, data)
            });
            const kafkaProducer = new producer_1.KafkaSendMessage();
            yield kafkaProducer.execute('MS_FORMAS_PAGAMENTO_CREATED', novaFormaPagamento);
            return novaFormaPagamento;
        });
    }
}
exports.CriarFormasPagamentoUsecase = CriarFormasPagamentoUsecase;
