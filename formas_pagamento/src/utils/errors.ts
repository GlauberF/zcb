export const handleMissingId = (res: any, customMessage?: string) => {
    res.writeHead(404, {'Content-Type': 'application/json'});
    res.end(
        JSON.stringify({
            error: 'Resource Not Found',
            message: customMessage || 'O recurso solicitado não pôde ser encontrado. Certifique-se de fornecer um ID válido.',
        })
    );
};

export const handleNoBody = (res: any) => {
    res.writeHead(400, {'Content-Type': 'application/json'});
    res.end(
        JSON.stringify({
            error: 'Missing Request Body',
            message: 'O recurso solicitado não pôde ser executado. Certifique-se de fornecer os dados necessários no corpo da requisição.',
        })
    );
};

export const handleDataAlreadyExists = (res: any, customMessage?: string) => {
    res.writeHead(409, {'Content-Type': 'application/json'});
    res.end(
        JSON.stringify({
            error: 'Data Already Exists',
            message: customMessage || 'Os dados fornecidos já existem. Certifique-se de fornecer dados únicos.',
        })
    );
};

export const handleGenericError = (res: any, error: any, customMessage?: string) => {
    res.writeHead(500, {'Content-Type': 'application/json'});
    res.end(
        JSON.stringify({
            error: 'Internal Server Error',
            message: customMessage || 'Algo deu errado no servidor. Por favor, tente novamente mais tarde.',
            originalError: error.message || error.toString(),
        })
    );
};