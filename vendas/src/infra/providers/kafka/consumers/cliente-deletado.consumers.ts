import {prismaClient} from "../../../database/prismaClient";
import {kafka} from "../index";

const consumer = kafka.consumer({groupId: 'MS_VENDA_CLI_DEL'});

export const clienteDeletadoConsumers = async () => {
    await consumer.connect();
    await consumer.subscribe({topic: "MS_CLIENTES_DELETED", fromBeginning: true});
    await consumer.run({
        eachMessage: async ({message, partition, offset}) => {
            const messageToString = message.value?.toString();
            const cliente = JSON.parse(messageToString);

            await prismaClient.clientes.update({
                where: {
                    id: cliente.id
                },
                data: {
                    data_exclusao: new Date()
                },
            });
        }
    })
}

// call
clienteDeletadoConsumers();