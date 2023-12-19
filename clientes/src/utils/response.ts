export const handleResponse = (res: any, data: any) => {
    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(
        JSON.stringify({
            error: null,
            message: null,
            data
        })
    );
};