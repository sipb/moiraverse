import { PUBLIC_MOIRA_API } from '$env/static/public';
import type { HttpMethod, UserInfo, Belonging } from '$lib/types';

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
    console.log(response);
    const json = await response.json();
    if (response.status !== 200) {
        // TODO: make an object-oriented exception
        throw json;
    }
    return json;
}

export async function getLists(ticket: string): Promise<string[]> {
    const lists: string[] = await makeQuery({
        method: 'GET',
        path: '/users/me/lists',
        ticket,
    });
    lists.sort();
    return lists;
}

export async function getBelongings(ticket: string): Promise<any> {
    const belongings: Belonging[] = await makeQuery({
        method: 'GET',
        path: '/users/me/belongings',
        ticket,
    });
    return belongings;
}

export async function getUserInfo(ticket: string): Promise<UserInfo> {
    return await makeQuery({
        method: 'GET',
        path: '/users/me/',
        ticket,
    });
}