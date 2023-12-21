import {kafkaConsumers} from "../kafka.consumers";
import {prismaClient} from "../../../database/prismaClient";

export async function clienteCriadoConsumers() {
    console.log('-----------------------')
    const consumer = await kafkaConsumers('MS_CLIENTES_CREATED');
    await consumer.run({
        eachMessage: async ({ message, partition, offset }) => {
            const messageToString = message.value!.toString();
            const cliente = JSON.parse(messageToString);
            console.log('---------create--------------')
            console.log(cliente)
            console.log('-----------create------------')

            await prismaClient.clientes.create({
                data: {
                    id: cliente.id,
                    id_usuario: cliente.id_usuario,
                    nome: cliente.nome,
                    cpf: cliente.cpf,
                    endereco: cliente.endereco,
                    email: cliente.email,
                    cep: cliente.cep,
                }
            });
        }
    })
}

// call
clienteCriadoConsumers();