<script lang="ts">
	import { loginWebathena } from '$lib/webathena';
	import { setContext } from 'svelte';
	import { writable, derived } from 'svelte/store';
	import { encodeTicket } from '$lib/webathena';
	import { persisted } from 'svelte-local-storage-store';

	// TODO: sensible behavior when ticket expires

	const webathena = persisted<any>('webathena', null);
	setContext('webathena', webathena);

	const ticket = derived(webathena, encodeTicket);
	setContext('ticket', ticket);

	$: console.log($webathena);

	async function login() {
		$webathena = await loginWebathena();
	}
</script>

{#if $webathena === null}
	<h1>You are not logged in</h1>
{:else}
	<slot />
{/if}
