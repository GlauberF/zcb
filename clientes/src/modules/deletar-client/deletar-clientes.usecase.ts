import {prismaClient} from "../../infra/database/prismaClient";
import {KafkaSendMessage} from "../../infra/provider/kafka/producer";
import {FakeJWT} from "../../utils/fakeJWT";

export class DeletarClientesUsecase {
    constructor() {
    }

    async execute(id: string) {
        if (!id) throw new Error('O ID do registro não foi fornecido');

        const deletarCliente = await prismaClient.clientes.delete({
            where: {
                id,
                id_usuario: FakeJWT().id
            }
        });

        console.log('MS_CLIENTES_DELETED')
        const kafkaProducer = new KafkaSendMessage();
        await kafkaProducer.execute('MS_CLIENTES_DELETED', deletarCliente);

        return deletarCliente;
    }
}