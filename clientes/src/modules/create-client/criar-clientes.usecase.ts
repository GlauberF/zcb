import {prismaClient} from "../../infra/database/prismaClient";
import {KafkaSendMessage} from "../../infra/provider/kafka/producer";
import {FakeJWT} from "../../utils/fakeJWT";

type CriarClientesRequest = {
    nome: string,
    cpf: string,
    endereco: string,
    email: string,
    cep: string
}

export class CriarClientesUseCase {
    constructor() {
    }

    async execute(data: CriarClientesRequest) {
        if (!data) throw new Error('Body da solicitação ausente');

        const cliente = await prismaClient.clientes.findFirst({
            where: {
                email: data.email
            }
        });

        if (cliente) throw new Error('Cliente já existe');

        const novoCliente = await prismaClient.clientes.create({
            data: {
                id_usuario: FakeJWT().id,
                ...data
            }
        });

        const kafkaProducer = new KafkaSendMessage();
        await kafkaProducer.execute('MS_CLIENTES_CREATED', novoCliente);

        return novoCliente;
    }
}