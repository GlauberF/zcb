import {CriarClientesUseCase} from "./criar-clientes.controller";

export class CriarClientesController {
    constructor() {
    }

    async handle(request: any, response: any) {
        //const useCase = new CriarClientesUseCase();
        //const result = await useCase.execute(request);

        console.log(request);
    }
}