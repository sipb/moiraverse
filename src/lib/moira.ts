import { PUBLIC_MOIRA_API } from '$env/static/public';
import type { HttpMethod, UserInfo, Belonging, ListInfo, ListMembers } from '$lib/types';

// TODO: allow other input
// GET parameters
// and JSON body

type QueryOptions = { method: HttpMethod; path: string; ticket: string };

export async function makeQuery({ method, path, ticket }: QueryOptions): Promise<any> {
	const response = await fetch(`${PUBLIC_MOIRA_API}${path}`, {
		headers: {
			Authorization: `webathena ${ticket}`
		},
		method
	});
	console.log(response);
	const json = await response.json();
	if (response.status !== 200) {
		// TODO check is instance of MoiraException?
		throw json;
	}
	return json;
}

export async function getLists(ticket: string): Promise<string[]> {
	const lists: string[] = await makeQuery({
		method: 'GET',
		path: '/users/me/lists',
		ticket
	});
	lists.sort();
	return lists;
}

export async function getListsNoRecurse(ticket: string): Promise<string[]> {
	const lists: string[] = await makeQuery({
		method: 'GET',
		path: '/users/me/lists?recurse=false',
		ticket
	});
	lists.sort();
	return lists;
}

export async function getUserBelongings(ticket: string): Promise<Belonging[]> {
	const belongings: Belonging[] = await makeQuery({
		method: 'GET',
		path: '/users/me/belongings',
		ticket
	});
	return belongings;
}

export async function getListBelongings(ticket: string, list: string): Promise<Belonging[]> {
	const belongings: Belonging[] = await makeQuery({
		method: 'GET',
		path: `/lists/${list}/belongings`,
		ticket
	});
	return belongings;
}

export async function getUserInfo(ticket: string, user = 'me'): Promise<UserInfo> {
	return await makeQuery({
		method: 'GET',
		path: `/users/${user}/`,
		ticket
	});
}

export async function getListInfo(ticket: string, list: string): Promise<ListInfo> {
	return await makeQuery({
		method: 'GET',
		path: `/lists/${list}/`,
		ticket
	});
}

export async function getListMembers(ticket: string, list: string): Promise<ListMembers> {
	return await makeQuery({
		method: 'GET',
		path: `/lists/${list}/members/`,
		ticket
	});
}

export async function getListLists(ticket: string, list: string): Promise<string[]> {
	return await makeQuery({
		method: 'GET',
		path: `/lists/${list}/lists`,
		ticket
	});
}
