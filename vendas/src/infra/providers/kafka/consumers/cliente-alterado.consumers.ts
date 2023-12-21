import {kafkaConsumers} from "../kafka.consumers";
import {prismaClient} from "../../../database/prismaClient";

export async function clienteAlteradoConsumers() {
    const consumer = await kafkaConsumers('MS_CLIENTES_UPDATED');
    await consumer.run({
        eachMessage: async ({ message, partition, offset }) => {
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