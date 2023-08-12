<script lang="ts">
	import { getContext } from 'svelte';
    import Loading from '$lib/Loading.svelte';
    import { getUserInfo } from '$lib/moira';
	import type { Readable } from 'svelte/store';

    const ticket = getContext<Readable<string>>('ticket');
</script>

<h1>My info</h1>

{#await getUserInfo($ticket)}
<Loading/>
{:then userInfo}
    <ul>
        <li><strong>Full name: </strong>{userInfo.full_name}</li>
        <li><strong>Kerb: </strong>{userInfo.kerb}</li>
        <li><strong>Class year: </strong>{userInfo.class_year}</li>
        <li><strong>MIT ID: </strong>{userInfo.mit_id}</li>
    </ul>
{:catch e}
    <h2>An error occured:</h2>
    <p>{JSON.stringify(e)}</p>
{/await}