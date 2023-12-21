export const handleResponse = (res: any, data: any, message: string = undefined, statusCode: number = 201, page: number = undefined, limit: number = undefined) => {
    let restParams = {};
    if (page || page === 0) {
        restParams['page'] = page;
    }
    if (limit) {
        restParams['limit'] = limit;
    }

    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(
        JSON.stringify({
            error: null,
            message: message,
            data,
            ...restParams
        })
    );
};