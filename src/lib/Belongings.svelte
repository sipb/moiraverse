<script lang="ts">
	import Loading from '$lib/Loading.svelte';
	import Error from '$lib/Error.svelte';
	import type { Belonging, MoiraException } from '$lib/types';
	import { base } from '$app/paths';

	export let headingLevel: number;
	export let self: string = 'I';
	export let loading: boolean = true;
	export let hasError: boolean = false;
	export let error: MoiraException;
	export let belongings: Belonging[] = [];

	$: console.log(belongings);

	let lists: string[] = [];
	$: lists = belongings
		.filter((b) => b.type === 'list')
		.map((b) => b.name)
		.sort();

	let lockers: string[] = [];
	$: lockers = belongings
		.filter((b) => b.type === 'filesys')
		.map((b) => b.name)
		.sort();

	let machines: string[] = [];
	$: machines = belongings
		.filter((b) => b.type === 'machine')
		.map((b) => b.name)
		.sort();

	let otherBelongings: Belonging[] = [];
	$: otherBelongings = belongings.filter((b) => !['list', 'filesys', 'machine'].includes(b.type));
	// remove duplicates
	$: otherBelongings = [...new Set(otherBelongings)];

	// Calculate relative headings
	$: h1 = `h${headingLevel}`;
	$: h2 = `h${headingLevel + 1}`;

	$: onlyOwnsLists = belongings.every((b) => b.type === 'list');
	$: console.log(onlyOwnsLists);
</script>

{#if onlyOwnsLists}
	<svelte:element this={h1}>Lists {self} can administer</svelte:element>
{:else}
	<svelte:element this={h1}>What can {self} administer?</svelte:element>
{/if}

{#if hasError}
	<Error {error} noResultsError={`${self} cannot administer anything.`} />
{/if}

{#if loading}
	<Loading />
{:else}
	<!-- TODO: there is no ul, which is currently better
		because it has less padding.
		ofc that wouldn't matter once we do our CSS, so add <ul> pls
	-->

	{#if machines.length > 0}
		<svelte:element this={h2}>Machines</svelte:element>
		<ul class="list-group">
			{#each machines as machine}
				<li class="list-group-item">{machine}</li>
			{/each}
		</ul>
	{/if}

	{#if otherBelongings.length > 0}
		<svelte:element this={h2}>Other belongings</svelte:element>
		<ul class="list-group">
			{#each otherBelongings as item}
				<li class="list-group-item">{item.name}</li>
			{/each}
		</ul>
	{/if}

	{#if lists.length > 0}
		{#if !onlyOwnsLists}
			<svelte:element this={h2}>Lists</svelte:element>
		{/if}
		<div class="list-group">
			{#each lists as list}
				<a href="{base}/lists/{list}" class="list-group-item list-group-item-action">
					{list}
				</a>
			{/each}
		</div>
	{/if}

	{#if lockers.length > 0}
		<svelte:element this={h2}>Lockers</svelte:element>
		<ul class="list-group">
			{#each lockers as locker}
				<li class="list-group-item">{locker}</li>
			{/each}
		</ul>
	{/if}
{/if}
