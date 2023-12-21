import {kafka} from "./index";

export class KafkaSendMessage {
    public async execute(topic: string, payload: any): Promise<void> {
        //const producer = kafka.producer();
        await kafka.connect();
        await kafka.send({
            topic,
            messages: [
                {
                    value: JSON.stringify(payload),
                },
            ],
        });
        await kafka.disconnect();
    }
}