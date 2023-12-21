import {prismaClient} from "../../../database/prismaClient";
import {kafka} from "../index";

const consumer = kafka.consumer({groupId: 'MS_VENDA_PRODUTO_CRIADO'});

export const produtoCriadoConsumers = async () => {
    await consumer.connect();
    await consumer.subscribe({topic: "MS_PRODUTOS_CREATED", fromBeginning: true});
    await consumer.run({
        eachMessage: async ({message}) => {
            const messageToString = message.value!.toString();
            const produto = JSON.parse(messageToString);

            await prismaClient.produtos.create({
                data: {
                    id: produto.id,
                    id_usuario: produto.id_usuario,
                    nome: produto.nome,
                    quantidade: produto.quantidade,
                    preco: produto.preco,
                }
            });
        }
    })
}

// call
produtoCriadoConsumers();