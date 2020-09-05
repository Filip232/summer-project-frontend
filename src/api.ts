export class Api {
    static fetch(...args: Parameters<typeof fetch>) {
        const [url, options] = args;

        return fetch('http://192.168.0.100:4000/' + url, {
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            ...options
        });
    }
}