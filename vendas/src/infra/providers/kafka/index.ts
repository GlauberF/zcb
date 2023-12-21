import { Kafka, logLevel } from "kafkajs";

const kf = new Kafka({
    clientId: 'ms-apps',
    brokers: ['frank-goat-11116-us1-kafka.upstash.io:9092'],  // Replace with your Kafka broker
    ssl: true,
    sasl: {
        mechanism: 'scram-sha-256',  // Replace with your SASL mechanism
        username: 'ZnJhbmstZ29hdC0xMTExNiRY5DrjJl7FdTWkEeCPwg54WLgiitsGUfW1ovknP-I',   // Replace with your username
        password: 'YzVhMGYxMWMtYzk4Yy00NTFmLWExNDktN2M4ODRhMTZhZWZl'    // Replace with your password
    }
});

const kafka = kf.consumer({ groupId: 'ms_vendas' });

export { kafka };