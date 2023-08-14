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
    <div class="list-group">
        {#each lists as list}
                <a href={`/lists/${list}`} class="list-group-item list-group-item-action">
                    {list}
                </a>
        {/each}
    </div>
{:catch error}
    <Error {error} noResultsError={`${listName} is not on any lists.`}/>
{/await}