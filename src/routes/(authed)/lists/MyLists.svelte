<!-- Copied from +layout.svelte -->
<!-- because I am lazy but TODO do something better -->
<!-- DRY tm -->

<script lang="ts">
	import { getContext } from 'svelte';
    import Loading from '$lib/Loading.svelte';
    import { makeQuery } from '$lib/moira';
	import type { Readable } from 'svelte/store';

    const ticket = getContext<Readable<string>>('ticket');

    async function getLists(): Promise<string[]> {
        const lists: string[] = await makeQuery({
            method: 'GET',
            path: '/users/me/lists',
            ticket: $ticket,
        });
        lists.sort();
        return lists;
    }
</script>

<h1>Lists I am on</h1>

{#await getLists()}
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
{:catch e}
    <h2>An error occured:</h2>
    <p>{JSON.stringify(e)}</p>
{/await}