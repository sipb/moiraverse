<script lang="ts">
	import { getContext } from 'svelte';
    import Loading from '$lib/Loading.svelte';
    import { getLists } from '$lib/moira';
	import type { Readable } from 'svelte/store';
	import Error from '$lib/Error.svelte';

    const ticket = getContext<Readable<string>>('ticket');
</script>

<h1>Lists I am on</h1>

{#await getLists($ticket)}
<Loading/>
{:then lists}
    <ul>
        {#each lists as list}
            <li>
                <a href={`/lists/${list}`}>
                    {list}
                </a>
            </li>
        {/each}
    </ul>
{:catch error}
    <Error {error}/>
{/await}