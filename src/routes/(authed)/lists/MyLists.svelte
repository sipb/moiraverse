<script lang="ts">
	import { getContext } from 'svelte';
	import Loading from '$lib/Loading.svelte';
	import { getLists } from '$lib/moira';
	import type { Readable } from 'svelte/store';
	import Error from '$lib/Error.svelte';
	import { base } from '$app/paths';

	const ticket = getContext<Readable<string>>('ticket');
</script>

<h1>Lists I am on</h1>

{#await getLists($ticket)}
	<Loading />
{:then lists}
	<div class="list-group">
		{#each lists as list}
			<a href="{base}/lists/{list}" class="list-group-item list-group-item-action">
				{list}
			</a>
		{/each}
	</div>
{:catch error}
	<Error {error} />
{/await}
