<script lang="ts">
	import { getContext } from 'svelte';
    import Loading from '$lib/Loading.svelte';
    import { getListLists } from '$lib/moira';
	import type { Readable } from 'svelte/store';
	import Error from '$lib/Error.svelte';

    export let listName: string;

    const ticket = getContext<Readable<string>>('ticket');
</script>

<h2>Lists {listName} is on</h2>

{#await getListLists($ticket, listName)}
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
    <Error {error} noResultsError={`${listName} is not on any lists.`}/>
{/await}