<script lang="ts">
	import { getContext } from 'svelte';
	import Loading from '$lib/Loading.svelte';
	import { getLists, getListsNoRecurse } from '$lib/moira';
	import type { Readable } from 'svelte/store';
	import Error from '$lib/Error.svelte';
	import { base } from '$app/paths';

	const ticket = getContext<Readable<string>>('ticket');
</script>

<h1>Lists I Am On {#await getLists($ticket) then lists}({lists.length}){/await}</h1>

{#await Promise.all([getLists($ticket), getListsNoRecurse($ticket)])}
	<Loading />
{:then [lists, listNoRecurse]}
	<div class="list-group">
		{#each lists as list}
			<a
				href="{base}/lists/{list}"
				class="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
			>
				{list}
				{#if !listNoRecurse.includes(list)}
					<span class="badge bg-primary rounded-pill"><i class="bi bi-info" /></span>
				{/if}
			</a>
		{/each}
	</div>
{:catch error}
	<Error {error} />
{/await}
