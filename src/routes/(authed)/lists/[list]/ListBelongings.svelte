<script lang="ts">
    // TODO: this is copy-paste from MyBelongings
    // DRY out!

	import { getContext } from 'svelte';
	import Belongings from '$lib/Belongings.svelte';
	import { getListBelongings } from '$lib/moira';
	import type { Readable } from 'svelte/store';
	import type { Belonging, MoiraException } from '$lib/types';

	const ticket = getContext<Readable<string>>('ticket');

    export let listName: string;

	let loading: boolean = true;
    let hasError: boolean = false;
    let error: MoiraException;
	let belongings: Belonging[] = [];

	$: {
		loading = true;
		getListBelongings($ticket, listName).then((val) => {
			belongings = val;
			loading = false;
		}, (e) => {
            console.log('An error occurred', e);
            hasError = true;
			error = e;
            loading = false;
        });
	}

	// TODO: it might be better to pass the exception as a prop
	// instead of this whole list of things
</script>

<Belongings
	self={listName}
	headingLevel={2}
	{loading} {hasError} {error} {belongings}
/>