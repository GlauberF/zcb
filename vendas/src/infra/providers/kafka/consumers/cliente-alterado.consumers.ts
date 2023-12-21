import {prismaClient} from "../../../database/prismaClient";
import {kafka} from "../index";

const consumer = kafka.consumer({groupId: 'MS_VENDA_CLI_ALTERADO'});

export const clienteAlteradoConsumers = async () => {
    await consumer.connect();
    await consumer.subscribe({topic: "MS_CLIENTES_UPDATED", fromBeginning: true});
    await consumer.run({
        eachMessage: async ({message, partition, offset}) => {
            const messageToString = message.value?.toString();
            const cliente = JSON.parse(messageToString);

            await prismaClient.clientes.update({
                where: {
                    id: cliente.id
                },
                data: {
                    nome: cliente.nome,
                    cpf: cliente.cpf,
                    endereco: cliente.endereco,
                    email: cliente.email,
                    cep: cliente.cep
                },
            });
        }
    })
}

// call
clienteAlteradoConsumers();