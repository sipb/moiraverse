import { PUBLIC_MOIRA_API } from '$env/static/public';
import type {
	HttpMethod,
	UserInfo,
	Belonging,
	ListInfo,
	ListMembers,
	MoiraException,
	MemberType,
	Finger,
	StringMap
} from '$lib/types';

export async function klist(ticket: string) {
	const response = await fetch(`${PUBLIC_MOIRA_API}/klist`, {
		headers: {
			Authorization: `webathena ${ticket}`
		}
	});
	return await response.text();
}

// TODO: allow other input
// GET parameters
// and JSON body

type QueryOptions = {
	method: HttpMethod;
	path: string;
	ticket: string;
	params?: Map<string, string> | undefined;
};

export async function makeQuery({ method, path, ticket, params }: QueryOptions): Promise<any> {
	let param_path = '';
	if (params !== undefined) {
		param_path = '?';
		for (const [key, value] of params) {
			param_path += `${key}=${value}&`;
		}
		param_path = param_path.slice(0, -1);
	}
	const response = await fetch(`${PUBLIC_MOIRA_API}${path}${param_path}`, {
		headers: {
			Authorization: `webathena ${ticket}`
		},
		method
	});
	const json = await response.json();
	if (response.status !== 200) {
		// TODO check is instance of MoiraException?
		throw json;
	}
	return json;
}

function makeParamsList(args: Map<string, string | boolean | number | undefined>) {
	let parameterMap;

	for (const [key, value] of args) {
		if (value !== undefined) {
			if (parameterMap === undefined) {
				parameterMap = new Map<string, string>();
			}
			parameterMap.set(key, value.toString());
		}
	}
	return parameterMap;
}

export async function isTicketExpired(ticket: string): Promise<boolean> {
	const result = await makeQuery({
		method: 'GET',
		path: '/status',
		ticket
	});
	return result.status === 'expired';
}

export async function testAuthentication(ticket: string): Promise<string[]> {
	return await makeQuery({
		method: 'GET',
		path: '/klist',
		ticket
	});
}

export async function whoAmI(ticket: string): Promise<string> {
	return await makeQuery({
		method: 'GET',
		path: '/whoami',
		ticket
	});
}

export async function getUserInfo(ticket: string, user = 'me'): Promise<UserInfo> {
	return await makeQuery({
		method: 'GET',
		path: `/users/${user}/`,
		ticket
	});
}

export async function getUserDisplayName(ticket: string, user = 'me'): Promise<{name: string}> {
	console.log('querying display name for ', user);
	return await makeQuery({
		method: 'GET',
		path: `/users/${user}/name`,
		ticket
	});
}

// Returns a mapping from kerbs to display names
export async function getListDisplayNames(ticket: string, list: string): Promise<StringMap> {
	return await makeQuery({
		method: 'GET',
		path: `/lists/${list}/names`,
		ticket
	});
}

export async function getUserBelongings(
	ticket: string,
	user = 'me',
	recurse?: boolean
): Promise<Belonging[]> {
	const belongings: Belonging[] = await makeQuery({
		method: 'GET',
		path: `/users/${user}/belongings`,
		ticket,
		params: makeParamsList(new Map([['recurse', recurse]]))
	});
	return belongings;
}

export async function getLists(
	ticket: string,
	user = 'me',
	include_properties?: boolean,
	recurse?: boolean
): Promise<string[]> {
	const lists: string[] = await makeQuery({
		method: 'GET',
		path: `/users/${user}/lists`,
		ticket,
		params: makeParamsList(
			new Map([
				['include_properties', include_properties],
				['recurse', recurse]
			])
		)
	});
	lists.sort();
	return lists;
}

export async function getListsNoRecurse(ticket: string) {
	return getLists(ticket, 'me', undefined, false);
}

export async function getUserTapaccess(ticket: string, user = 'me'): Promise<string[]> {
	return await makeQuery({
		method: 'GET',
		path: `/users/${user}/tapaccess`,
		ticket
	});
}

export async function getAllLists(
	ticket: string,
	active?: true | false | 'dontcare',
	publicLists?: true,
	hidden?: false,
	is_mailing_list?: true | false | 'dontcare',
	is_afs_group?: true | false | 'dontcare',
	confirm = false
): Promise<string[]> {
	return await makeQuery({
		method: 'GET',
		path: `/lists/`,
		ticket,
		params: makeParamsList(
			new Map([
				['active', active],
				['public', publicLists],
				['hidden', hidden],
				['is_mailing_list', is_mailing_list],
				['is_afs_group', is_afs_group],
				['confirm', confirm]
			])
		)
	});
}

export async function getListInfo(ticket: string, list: string): Promise<ListInfo> {
	return await makeQuery({
		method: 'GET',
		path: `/lists/${list}/`,
		ticket
	});
}

// TODO: ADD MAKE LIST HERE

// TODO: ADD EDIT LIST HERE

// TODO: ADD DELETE LIST HERE

export async function getListMembers(
	ticket: string,
	list: string,
	recurse?: boolean
): Promise<ListMembers> {
	return await makeQuery({
		method: 'GET',
		path: `/lists/${list}/members/`,
		ticket,
		params: makeParamsList(new Map([['recurse', recurse]]))
	});
}

export async function getAllListMembers(ticket: string, list: string): Promise<ListMembers> {
	return getListMembers(ticket, list, true);
}

// TODO: ADD MEMBER TO LIST HERE

export async function delUserFromList(
	ticket: string,
	list: string,
	member = 'me',
	type: MemberType = 'user'
): Promise<'success' | MoiraException> {
	return await makeQuery({
		method: 'DELETE',
		path: `/lists/${list}/members/${member}`,
		ticket,
		params: makeParamsList(new Map([['type', type]]))
	});
}

export async function getListBelongings(
	ticket: string,
	list: string,
	recurse?: boolean
): Promise<Belonging[]> {
	const belongings: Belonging[] = await makeQuery({
		method: 'GET',
		path: `/lists/${list}/belongings`,
		ticket,
		params: makeParamsList(new Map([['recurse', recurse]]))
	});
	return belongings;
}

export async function getListLists(
	ticket: string,
	list: string,
	include_properties?: boolean,
	recurse?: boolean
): Promise<string[] | ListInfo[]> {
	return await makeQuery({
		method: 'GET',
		path: `/lists/${list}/lists`,
		ticket,
		params: makeParamsList(
			new Map([
				['include_properties', include_properties],
				['recurse', recurse]
			])
		)
	});
}

export async function getListOwner(
	ticket: string,
	list: string
): Promise<{
	type: 'user' | 'list' | 'kerberos';
	name: string;
}> {
	return await makeQuery({
		method: 'GET',
		path: `/lists/${list}/owners`,
		ticket
	});
}

// TODO: ADD SET LIST OWNER HERE

export async function getListMembershipAdmin(
	ticket: string,
	list: string
): Promise<{
	type: 'user' | 'list' | 'kerberos';
	name: string;
}> {
	return await makeQuery({
		method: 'GET',
		path: `/lists/${list}/membership_admin`,
		ticket
	});
}

// TODO: ADD SET LIST MEMBERSHIP ADMIN HERE

// TODO: ADD DELETE LIST MEMBERSHIP ADMIN HERE

export async function getFinger(ticket: string, user = 'me'): Promise<Finger> {
	return await makeQuery({
		method: 'GET',
		path: `/users/${user}/finger`,
		ticket
	});
}

// TODO: ADD EDIT FINGER HERE
