import {prismaClient} from "../../infra/database/prismaClient";
import {FakeJWT} from "../../utils/fakeJWT";

export class DeletarVendasUsecase {
    constructor() {
    }

    async execute(id: string) {
        if (!id) throw new Error('O ID do registro não foi fornecido');

        // Verifique se a venda existe
        const vendaExistente = await prismaClient.vendas.findUnique({
            where: { id },
        });

        if (!vendaExistente) throw new Error('Venda não encontrada');

        // Exclua os registros associados na tabela VendasProdutos
        await prismaClient.vendasProdutos.deleteMany({
            where: {
                vendaId: id,
            },
        });

        // Exclua a venda principal
        return prismaClient.vendas.delete({
            where: {
                id,
                id_usuario: FakeJWT().id,
            },
        });
    }
}