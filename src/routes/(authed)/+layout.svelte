<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { getContext } from 'svelte';
	import type { Readable, Writable } from 'svelte/store';
	import { isTicketExpired } from '$lib/moira';

	const webathena: Writable<any> = getContext('webathena');
	const ticket: Readable<string> = getContext('ticket');

	// Whether the reason we are not logged in is
	// because the ticket expired
	let ticketExpired: boolean = false;

	afterNavigate(async (navigation) => {
		if (await isTicketExpired($ticket)) {
			$webathena = null;
			ticketExpired = true;
		}
	});
</script>

{#if $webathena === null}
	<h1>You are not logged in</h1>
	{#if ticketExpired}
		<p>Sorry, your ticket expired. Please login again.</p>
	{/if}
{:else}
	<slot />
{/if}
