<script lang="ts">
	import { getContext } from 'svelte';
	import Belongings from '$lib/Belongings.svelte';
	import { getUserBelongings } from '$lib/moira';
	import type { Readable } from 'svelte/store';
	import type { Belonging, MoiraException } from '$lib/types';

	const ticket = getContext<Readable<string>>('ticket');

	let loading: boolean = true;
    let hasError: boolean = false;
    let error: MoiraException;
	let belongings: Belonging[] = [];

	$: {
		loading = true;
		belongings = [];
		getUserBelongings($ticket).then((val) => {
			belongings = val;
			loading = false;
			hasError = false;
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
	self={"I"}
	headingLevel={1}
	{loading} {hasError} {error} {belongings}
/>