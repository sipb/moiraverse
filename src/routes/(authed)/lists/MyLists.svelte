<script lang="ts">
	import { getContext } from 'svelte';
	import Loading from '$lib/Loading.svelte';
	import { getLists, getListsNoRecurse } from '$lib/moira';
	import type { Readable } from 'svelte/store';
	import Error from '$lib/Error.svelte';
	import { base } from '$app/paths';

	const ticket = getContext<Readable<string>>('ticket');

	let showRecursiveLists: boolean = true;

	// these are promises
	const allListsPromise = getLists($ticket);
	const nonRecursiveListsPromise = getListsNoRecurse($ticket);

	async function countLists(showRecursiveLists: boolean) {
		if (showRecursiveLists) {
			return (await allListsPromise).length;
		} else {
			return (await nonRecursiveListsPromise).length;
		}
	}
</script>

<h1>Lists I Am On {#await countLists(showRecursiveLists) then count}({count}){/await}</h1>

<label>
	<input type="checkbox" bind:checked={showRecursiveLists} />
	Show lists I am in through another list
</label>
<br/>

{#await Promise.all([allListsPromise, nonRecursiveListsPromise])}
	<Loading />
{:then [lists, listNoRecurse]}
	<div class="list-group">
		{#each lists as list}
			{#if showRecursiveLists || listNoRecurse.includes(list)}
				<a
					href="{base}/lists/{list}"
					class="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
				>
					{list}
					{#if !listNoRecurse.includes(list)}
						<span class="badge bg-primary rounded-pill"><i class="bi bi-diagram-2-fill" /></span>
					{/if}
				</a>
			{/if}
		{/each}
	</div>
{:catch error}
	<Error {error} />
{/await}
