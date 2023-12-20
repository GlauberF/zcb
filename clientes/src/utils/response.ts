export const handleResponse = (res: any, data: any, message: string = undefined, statusCode: number = 201, page: number = 0, limit: number = 10) => {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(
        JSON.stringify({
            error: null,
            message: message,
            data,
            page,
            limit
        })
    );
};