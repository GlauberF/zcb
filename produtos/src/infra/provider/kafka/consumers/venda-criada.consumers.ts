import {prismaClient} from "../../../database/prismaClient";
import {kafka} from "../index";

const consumer = kafka.consumer({groupId: 'MS_VENDA_CRIADA_PRODUTOS_UPDATE_QUANTIDADE'});

export const vendaCriadaConsumers = async () => {
    await consumer.connect();
    await consumer.subscribe({topic: "MS_PRODUTOS_UPDATE_QUANTIDADE", fromBeginning: true});
    await consumer.run({
        eachMessage: async ({message}) => {
            const messageToString = message.value!.toString();
            const produto = JSON.parse(messageToString);

            await prismaClient.produtos.update({
                where: {
                    id: produto.id,
                },
                data: {
                    quantidade: produto.quantidade
                }
            });
        }
    })
}

// call
vendaCriadaConsumers();