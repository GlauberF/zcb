import {kafka, run} from "./index";

export class KafkaSendMessage {
    public async execute(topic: string, payload: any): Promise<void> {
        run(topic, payload).catch(console.error)
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
    }
}