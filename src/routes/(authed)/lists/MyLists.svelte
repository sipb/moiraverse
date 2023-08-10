<!-- Copied from +layout.svelte -->
<!-- because I am lazy but TODO do something better -->
<!-- DRY tm -->

<script>
	import { getContext } from 'svelte';
    import { makeHeaders } from '$lib/webathena';
    import { PUBLIC_MOIRA_API } from '$env/static/public';
    import Loading from '$lib/Loading.svelte';
	import { derived } from 'svelte/store';

    const webathena = getContext('webathena');
    const headers = derived(webathena, makeHeaders);

    async function getLists() {
        const response = await fetch(`${PUBLIC_MOIRA_API}/users/me/lists`, {
            headers: $headers,
        });
        const json = await response.json();
        if (response.status !== 200) {
            throw json;
        }
        // sort :)
        json.sort();
        return json;
    }

    const promise = getLists();

</script>

<h1>Lists I am on</h1>

{#await promise}
<Loading/>
{:then lists}
    <ul>
        {#each lists as list}
            <li>
                <a href={`/lists/${list.name}`}>
                    {list}
                </a>
            </li>
        {/each}
    </ul>
{:catch e}
    <h2>An error occured:</h2>
    <p>{JSON.stringify(e)}</p>
{/await}