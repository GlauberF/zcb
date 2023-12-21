import {prismaClient} from "../../infra/database/prismaClient";
import {KafkaSendMessage} from "../../infra/provider/kafka/producer";
import {FakeJWT} from "../../utils/fakeJWT";

type AtualizarClientesRequest = {
    nome: string,
    cpf: string,
    endereco: string,
    email: string,
    cep: string
}

export class AtualizarClientesUsecase {
    constructor() {
    }

    async execute(id: string, data: AtualizarClientesRequest) {
        if (!id) throw new Error('O ID do registro não foi fornecido');

        if (!data) throw new Error('Body da solicitação ausente');

        const atualizarCliente = await prismaClient.clientes.update({
            where: {
                id: id,
                id_usuario: FakeJWT().id,
            },
            data: {
                nome: data.nome,
                cpf: data.cpf,
                endereco: data.endereco,
                email: data.email,
                cep: data.cep
            },
        });

        console.log('MS_CLIENTES_UPDATED')
        const kafkaProducer = new KafkaSendMessage();
        await kafkaProducer.execute('MS_CLIENTES_UPDATED', atualizarCliente);

        return atualizarCliente;
    }
}