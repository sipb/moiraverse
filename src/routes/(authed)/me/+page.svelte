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
	<dl class="row">
		<dt class="col-md-3"><i class="bi bi-person-vcard" /> Full name</dt>
		<dd class="col-md-9">{userInfo.full_name}</dd>
		<dt class="col-md-3"><i class="bi bi-at" /> Kerb</dt>
		<dd class="col-md-9">{userInfo.kerb}</dd>
		<dt class="col-md-3"><i class="bi bi-mortarboard" /> Class year</dt>
		<dd class="col-md-9">{userInfo.class_year}</dd>
		<dt class="col-md-3"><i class="bi bi-123" /> MIT ID</dt>
		<dd class="col-md-9">{userInfo.mit_id}</dd>
	</dl>
{:catch error}
	<Error {error} />
{/await}
