export class Api {
    static fetch(...args: Parameters<typeof fetch>) {
        const [url, options] = args;

        return fetch('http:/localhost:4000/' + url, {
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            ...options
        });
    }
}