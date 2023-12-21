import {kafka} from "./index";

export const kafkaConsumers = async  (topic: string) => {
    //const consumer = kafka.consumer({ groupId: 'ms_vendas' });
    await kafka.connect();
    await kafka.subscribe({ topic: topic, fromBeginning: false });
    return kafka;
}