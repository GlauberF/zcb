import {kafkaConsumers} from "../kafka.consumers";
import {prismaClient} from "../../../database/prismaClient";

export async function clienteDeletadoConsumers() {
    const consumer = await kafkaConsumers('MS_CLIENTES_DELETED');
    await consumer.run({
        eachMessage: async ({ message, partition, offset }) => {
            const messageToString = message.value?.toString();
            const cliente = JSON.parse(messageToString);
            console.log('-----------del---------------')
            console.log(cliente)
            console.log('------------del--------------')

            await prismaClient.clientes.update({
                where: {
                    id: cliente.id
                },
                data: {
                    data_excusao: new Date()
                },
            });
        }
    })
}

// call
clienteDeletadoConsumers();