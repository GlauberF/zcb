"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPostData = exports.writeDataToFile = exports.extractQueryParams = exports.extractId = void 0;
const fs_1 = require("fs");
const extractId = (url) => {
    const parts = url.split('/');
    return parts.length > 1 ? parts[1] : null;
};
exports.extractId = extractId;
const extractQueryParams = (url) => {
    const queryParams = {};
    const queryString = url.split('?')[1];
    if (queryString) {
        const pairs = queryString.split('&');
        pairs.forEach(pair => {
            const [key, value] = pair.split('=');
            queryParams[key] = value;
        });
    }
    return queryParams;
};
exports.extractQueryParams = extractQueryParams;
function writeDataToFile(filename, content) {
    (0, fs_1.writeFileSync)(filename, JSON.stringify(content), 'utf8');
}
exports.writeDataToFile = writeDataToFile;
function getPostData(req) {
    return new Promise((resolve, reject) => {
        try {
            let body = '';
            req.on('data', (chunk) => {
                body += chunk.toString();
            });
            req.on('end', () => {
                resolve(body);
            });
        }
        catch (error) {
            reject(error);
        }
    });
}
exports.getPostData = getPostData;
