import {prismaClient} from "../../infra/database/prismaClient";
import {KafkaSendMessage} from "../../infra/provider/kafka/producer";
import {FakeJWT} from "../../utils/fakeJWT";

type CriarFormasPagamentoRequest = {
    nome: string,
    parcelas: string
}

export class CriarFormasPagamentoUsecase {
    constructor() {}

    async execute(data: CriarFormasPagamentoRequest) {
        if (!data) throw new Error('Body da solicitação ausente');

        const novaFormaPagamento = await prismaClient.formasPagamento.create({
            data: {
                id_usuario: FakeJWT().id,
                ...data
            }
        });

        const kafkaProducer = new KafkaSendMessage();
        await kafkaProducer.execute('MS_FORMAS_PAGAMENTO_CREATED', novaFormaPagamento);

        return novaFormaPagamento;
    }
}