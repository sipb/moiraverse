<script lang="ts">
	import { getContext } from 'svelte';
	import Loading from '$lib/Loading.svelte';
	import Error from '$lib/Error.svelte';
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
	$: lists = belongings.filter((b) => b.type === 'list').map((b) => b.name).sort();

	let lockers: string[] = [];
	$: lockers = belongings.filter((b) => b.type === 'filesys').map((b) => b.name).sort();

	let machines: string[] = [];
	$: machines = belongings.filter((b) => b.type === 'machine').map((b) => b.name).sort();

	let otherBelongings: Belonging[] = [];
	$: otherBelongings = belongings.filter((b) => !['list', 'filesys', 'machine'].includes(b.type));
	// remove duplicates
	$: otherBelongings = [...new Set(otherBelongings)];
</script>

<!-- TODO:
use await block instead
and 
make functions that accept the input and transform it
(instead of $: things)
-->

{#if lists.length === belongings.length }
	<h1>Lists I can administer</h1>
{:else}
	<h1>What can I administer?</h1>
{/if}

{#if hasError}
	<Error {error} />
{/if}

{#if loading}
	<Loading />
{:else}
	<!-- TODO: there is no ul, which is currently better
		because it has less padding.
		ofc that wouldn't matter once we do our CSS, so add <ul> pls
	-->

	{#if machines.length > 0}
		<h3>Machines</h3>
		{#each machines as machine}
			<li>{machine}</li>
		{/each}
	{/if}

	{#if otherBelongings.length > 0}
		<h2>Other belongings</h2>
			{#each otherBelongings as item}
				<li>{item.name}</li>
			{/each}
	{/if}

	{#if lists.length !== belongings.length }
		<h3>Lists</h3>
	{/if}

	{#each lists as list}
		<li>
			<a href={`/lists/${list}`}>
				{list}
			</a>
		</li>
	{/each}

	{#if lockers.length > 0}
		<h3>Lockers</h3>
		{#each lockers as locker}
			<li>{locker}</li>
		{/each}
	{/if}
{/if}
