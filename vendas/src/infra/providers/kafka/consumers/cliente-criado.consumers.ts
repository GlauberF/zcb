import {prismaClient} from "../../../database/prismaClient";
import {kafka} from "../index";

const consumer = kafka.consumer({groupId: 'MS_VENDA_CLI_CRIADO'});

export const clienteCriadoConsumers = async () => {
    await consumer.connect();
    await consumer.subscribe({topic: "MS_CLIENTES_CREATED", fromBeginning: true});
    await consumer.run({
        eachMessage: async ({message}) => {
            const messageToString = message.value!.toString();
            const cliente = JSON.parse(messageToString);

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