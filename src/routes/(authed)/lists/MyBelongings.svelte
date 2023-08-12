<script lang="ts">
	import { getContext } from 'svelte';
	import Loading from '$lib/Loading.svelte';
	import { getBelongings } from '$lib/moira';
	import type { Readable } from 'svelte/store';
	import type { Belonging, MoiraException } from '$lib/types';

	const ticket = getContext<Readable<string>>('ticket');

	let loading = true;
    let hasError = false;
    let error: MoiraException;
	let belongings: Belonging[] = [];

	$: {
		loading = true;
		getBelongings($ticket).then((val) => {
			belongings = val;
			// TODO: handle error
			loading = false;
		}, (e) => {
            console.log('An error occurred', e);
            hasError = true;
			error = e;
            loading = false;
        });
	}

	let lists: string[] = [];
	$: lists = belongings.filter((b) => b.type === 'list').map((b) => b.name);

	let otherBelongings: Belonging[] = [];
	$: otherBelongings = belongings.filter((b) => b.type !== 'list');
</script>

<!-- TODO:
use await block instead
and 
make functions that accept the input and transform it
(instead of $: things)
-->

<h1>Lists I can administer</h1>
{#if hasError}
	<h2>An error occurred</h2>
    <p>{JSON.stringify(error)}</p>
{/if}
{#if loading}
	<Loading />
{:else}
	{#each lists as list}
		<li>
			<a href={`/lists/${list}`}>
				{list}
			</a>
		</li>
	{/each}

	{#if otherBelongings.length > 0}
		<h2>Other belongings</h2>
		{#each otherBelongings as item}
			<li>{item.name}</li>
		{/each}
	{/if}
{/if}
