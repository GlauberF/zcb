"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleGenericError = exports.handleDataAlreadyExists = exports.handleNoBody = exports.handleMissingId = void 0;
const handleMissingId = (res, customMessage) => {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
        error: 'Resource Not Found',
        message: customMessage || 'O recurso solicitado não pôde ser encontrado. Certifique-se de fornecer um ID válido.',
    }));
};
exports.handleMissingId = handleMissingId;
const handleNoBody = (res) => {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
        error: 'Missing Request Body',
        message: 'O recurso solicitado não pôde ser executado. Certifique-se de fornecer os dados necessários no corpo da requisição.',
    }));
};
exports.handleNoBody = handleNoBody;
const handleDataAlreadyExists = (res, customMessage) => {
    res.writeHead(409, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
        error: 'Data Already Exists',
        message: customMessage || 'Os dados fornecidos já existem. Certifique-se de fornecer dados únicos.',
    }));
};
exports.handleDataAlreadyExists = handleDataAlreadyExists;
const handleGenericError = (res, error, customMessage) => {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
        error: 'Internal Server Error',
        message: customMessage || 'Algo deu errado no servidor. Por favor, tente novamente mais tarde.',
        originalError: error.message || error.toString(),
    }));
};
exports.handleGenericError = handleGenericError;
