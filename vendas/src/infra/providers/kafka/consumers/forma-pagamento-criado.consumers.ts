import {prismaClient} from "../../../database/prismaClient";
import {kafka} from "../index";

const consumer = kafka.consumer({groupId: 'MS_VENDA_FORM_PAG_CRIADO'});

export const formasPagamentoCriadoConsumers = async () => {
    await consumer.connect();
    await consumer.subscribe({topic: "MS_FORMAS_PAGAMENTO_CREATED", fromBeginning: true});
    await consumer.run({
        eachMessage: async ({message}) => {
            const messageToString = message.value!.toString();
            const formaPagamento = JSON.parse(messageToString);

            await prismaClient.formasPagamento.create({
                data: {
                    id: formaPagamento.id,
                    id_usuario: formaPagamento.id_usuario,
                    nome: formaPagamento.nome,
                    parcelas: formaPagamento.parcelas
                }
            });
        }
    })
}

// call
formasPagamentoCriadoConsumers();