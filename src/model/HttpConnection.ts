

export interface HttpConnection {

    method: 'GET' | 'POST' | 'PUT' | 'DELETE';

    protocol: 'http' | 'https';

    host: string;

    port: number;

    path?: string;

}
