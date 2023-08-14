<script lang="ts">
	import { getContext } from 'svelte';
	import Loading from '$lib/Loading.svelte';
	import { getUserInfo } from '$lib/moira';
	import type { Readable } from 'svelte/store';
	import Error from '$lib/Error.svelte';

	const ticket = getContext<Readable<string>>('ticket');
</script>

<h1>My info</h1>

{#await getUserInfo($ticket)}
	<Loading />
{:then userInfo}
	<dl>
		<dt>Full name:</dt>
		<dd>{userInfo.full_name}</dd>
		<dt>Kerb:</dt>
		<dd>{userInfo.kerb}</dd>
		<dt>Class year:</dt>
		<dd>{userInfo.class_year}</dd>
		<dt>MIT ID:</dt>
		<dd>{userInfo.mit_id}</dd>
	</dl>
{:catch error}
	<Error {error} />
{/await}
