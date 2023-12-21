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
exports.KafkaSendMessage = void 0;
const index_1 = require("./index");
class KafkaSendMessage {
    execute(topic, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, index_1.run)(topic, payload).catch(console.error);
            // const producer = kafka.producer();
            // await producer.connect();
            // await producer.send({
            //     topic,
            //     messages: [
            //         {
            //             value: JSON.stringify(payload),
            //         },
            //     ],
            // });
            // await producer.disconnect();
        });
    }
}
exports.KafkaSendMessage = KafkaSendMessage;
