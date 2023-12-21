"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleResponse = void 0;
const handleResponse = (res, data, message = undefined, statusCode = 201, page = undefined, limit = undefined) => {
    let restParams = {};
    if (page || page === 0) {
        restParams['page'] = page;
    }
    if (limit) {
        restParams['limit'] = limit;
    }
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(Object.assign({ error: null, message: message, data }, restParams)));
};
exports.handleResponse = handleResponse;
