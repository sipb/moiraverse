<script lang="ts">
	import { getContext } from 'svelte';
	import Loading from '$lib/Loading.svelte';
	import Error from '$lib/Error.svelte';
	import Belongings from '$lib/Belongings.svelte';
	import { getBelongings } from '$lib/moira';
	import type { Readable } from 'svelte/store';
	import type { Belonging, MoiraException } from '$lib/types';

	const ticket = getContext<Readable<string>>('ticket');

	let loading: boolean = true;
    let hasError: boolean = false;
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
</script>

<Belongings
	self={"I"}
	headingLevel={1}
	{loading} {hasError} {error} {belongings}
/>