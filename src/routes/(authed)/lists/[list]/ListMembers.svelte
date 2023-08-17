<script lang="ts">
	import { getContext } from 'svelte';
	import Loading from '$lib/Loading.svelte';
	import {
		getListMembers,
		getUserInfo,
		delUserFromList,
		getListInfo,
		getAllListMembers
	} from '$lib/moira';
	import type { Readable } from 'svelte/store';
	import Error from '$lib/Error.svelte';
	import { base } from '$app/paths';

	export let listName: string;

	const ticket = getContext<Readable<string>>('ticket');
	const userKerb = getContext<Readable<string>>('username');

	async function canEditMembership() {
		let listInfo = await getListInfo($ticket, listName);
		let [ownerInfo, adminInfo] = [listInfo.owner, listInfo.membership_administrator];

		let isUserAdmin = false;

		if (ownerInfo.type == 'list') {
			let adminMembers = await getAllListMembers($ticket, ownerInfo.name);
			isUserAdmin = adminMembers.users.includes($userKerb);
		} else {
			isUserAdmin = ownerInfo.name == $userKerb;
		}

		if (!isUserAdmin && adminInfo) {
			if (adminInfo.type == 'list') {
				let adminMembers = await getAllListMembers($ticket, adminInfo.name);
				isUserAdmin = adminMembers.users.includes($userKerb);
			} else {
				isUserAdmin = adminInfo.name == $userKerb;
			}
		}

		return isUserAdmin;
	}

	let refresh = false;
</script>

<h2>Members</h2>

{#key refresh}
	{#await Promise.all([getListMembers($ticket, listName), canEditMembership()])}
		<Loading />
	{:then [members, isUserAdmin]}
		{#if Object.values(members).filter((array) => array.length > 0).length > 0}
			<!-- TODO: update API so it can handle everything (like IDs) -->
			{#if members.users.length > 0}
				<h3>Usernames</h3>
				<ul class="list-group">
					{#each members.users as user}
						<li class="list-group-item d-flex justify-content-between align-items-center">
							<!-- {#await getUserInfo($ticket, user)}
						{user}
					{:then userInfo}
						{userInfo.full_name} ({user})
					{:catch}
						{user}
					{/await} -->
							{user}
							{#if user == $userKerb || isUserAdmin}
								<button
									type="button"
									class="btn btn-danger"
									on:click={() => {
										delUserFromList($ticket, listName, user).finally(() => {
											refresh = !refresh;
										});
									}}><i class="bi bi-x-lg" /></button
								>
							{/if}
						</li>
					{/each}
				</ul>
			{/if}
			{#if members.kerberos.length > 0}
				<h3>Kerberos principals</h3>
				<ul class="list-group">
					{#each members.kerberos as kerb}
						<li class="list-group-item">{kerb}</li>
					{/each}
				</ul>
			{/if}
			{#if members.emails.length > 0}
				<h3>Emails</h3>
				<ul class="list-group">
					{#each members.emails as email}
						<li class="list-group-item">{email}</li>
					{/each}
				</ul>
			{/if}
			{#if members.lists.length > 0}
				<h3>Lists</h3>
				<div class="list-group">
					{#each members.lists as list}
						<a href="{base}/lists/{list}" class="list-group-item list-group-item-action">{list}</a>
					{/each}
				</div>
			{/if}
		{:else}
			<p>{listName} has no members.</p>
		{/if}
	{:catch error}
		<Error {error} />
	{/await}
{/key}
