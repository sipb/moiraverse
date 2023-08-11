import { PUBLIC_MOIRA_API } from '$env/static/public';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

// TODO: allow other input 
// GET parameters
// and JSON body

type QueryOptions = { method: HttpMethod, path: string, ticket: string, };

export async function makeQuery({ method, path, ticket }: QueryOptions): Promise<any> {
    const response = await fetch(`${PUBLIC_MOIRA_API}${path}`, {
        headers: {
            'Authorization': `webathena ${ticket}`
        },
        method,
    });
    const json = await response.json();
    if (response.status !== 200) {
        // TODO: make an object-oriented exception
        throw json;
    }
    return json;
}