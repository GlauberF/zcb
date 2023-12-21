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
exports.kafka = exports.run = void 0;
const kafkajs_1 = require("kafkajs");
const kafka = new kafkajs_1.Kafka({
    clientId: 'ms-apps',
    brokers: ['frank-goat-11116-us1-kafka.upstash.io:9092'], // Replace with your Kafka broker
    ssl: true,
    sasl: {
        mechanism: 'scram-sha-256', // Replace with your SASL mechanism
        username: 'ZnJhbmstZ29hdC0xMTExNiRY5DrjJl7FdTWkEeCPwg54WLgiitsGUfW1ovknP-I', // Replace with your username
        password: 'YzVhMGYxMWMtYzk4Yy00NTFmLWExNDktN2M4ODRhMTZhZWZl' // Replace with your password
    }
});
exports.kafka = kafka;
// const kafka = new Kafka({
//     clientId: 'ms-apps',
//     brokers: ['localhost:9091']
// });
const producer = kafka.producer();
const run = (topic, payload) => __awaiter(void 0, void 0, void 0, function* () {
    yield producer.connect();
    yield producer.send({
        topic,
        messages: [
            {
                value: JSON.stringify(payload),
            },
        ],
    });
    yield producer.disconnect();
});
exports.run = run;
