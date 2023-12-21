import { Kafka } from "kafkajs";

const kafka = new Kafka({
    clientId: 'ms-apps',
    brokers: ['frank-goat-11116-us1-kafka.upstash.io:9092'],  // Replace with your Kafka broker
    ssl: true,
    sasl: {
        mechanism: 'scram-sha-256',  // Replace with your SASL mechanism
        username: 'ZnJhbmstZ29hdC0xMTExNiRY5DrjJl7FdTWkEeCPwg54WLgiitsGUfW1ovknP-I',   // Replace with your username
        password: 'YzVhMGYxMWMtYzk4Yy00NTFmLWExNDktN2M4ODRhMTZhZWZl'    // Replace with your password
    }
});
// const kafka = new Kafka({
//     clientId: 'ms-apps',
//     brokers: ['localhost:9091']
// });

const producer = kafka.producer();

export const run = async (topic: string, payload: any) => {
    await producer.connect();
    await producer.send({
        topic,
        messages: [
            {
                value: JSON.stringify(payload),
            },
        ],
    });
    await producer.disconnect();
}

export { kafka };