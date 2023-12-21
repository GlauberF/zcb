import {writeFileSync} from 'fs';

export const extractId = (url: string): string | null => {
    const parts = url.split('/');
    return parts.length > 1 ? parts[1] : null;
};

export const extractQueryParams = (url: string): Record<string, string> => {
    const queryParams: Record<string, string> = {};
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

export function writeDataToFile(filename: string, content: any): void {
    writeFileSync(filename, JSON.stringify(content), 'utf8');
}

export function getPostData(req: any): Promise<string> {
    return new Promise((resolve, reject) => {
        try {
            let body = '';

            req.on('data', (chunk) => {
                body += chunk.toString();
            });

            req.on('end', () => {
                resolve(body);
            });
        } catch (error) {
            reject(error);
        }
    });
}