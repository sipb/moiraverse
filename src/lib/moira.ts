import { PUBLIC_MOIRA_API } from '$env/static/public';
import type {
	HttpMethod,
	UserInfo,
	Belonging,
	ListInfo,
	ListMembers,
	MoiraException,
	MemberType
} from '$lib/types';


export async function klist(ticket: string) {
	const response = await fetch(`${PUBLIC_MOIRA_API}/klist`, {
		headers: {
			Authorization: `webathena ${ticket}`
		},
	});
	return await response.text();
}

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

export async function isTicketExpired(ticket: string): Promise<boolean> {
	const result = await makeQuery({
		method: 'GET',
		path: '/status',
		ticket
	});
	return result.status === 'expired';
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

export async function getAllListMembers(ticket: string, list: string): Promise<ListMembers> {
	return await makeQuery({
		method: 'GET',
		path: `/lists/${list}/members/?recurse=true`,
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

export async function delUserFromList(
	ticket: string,
	list: string,
	member = 'me',
	type: MemberType = 'user'
): Promise<'success' | MoiraException> {
	return await makeQuery({
		method: 'DELETE',
		path: `/lists/${list}/members/${member}?type=${type}`,
		ticket
	});
}
