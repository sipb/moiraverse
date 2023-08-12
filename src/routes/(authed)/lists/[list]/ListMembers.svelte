<script lang="ts">
	import { getContext } from 'svelte';
    import Loading from '$lib/Loading.svelte';
    import { getListMembers } from '$lib/moira';
	import type { Readable } from 'svelte/store';
    
    export let listName: string;

    const ticket = getContext<Readable<string>>('ticket');
</script>

<h2>Members</h2>

{#await getListMembers($ticket, listName)}
    <Loading/>
{:then members}
<!-- TODO: update API so it can handle everything (like IDs) -->
    {#if members.users.length > 0}
        <h3>Usernames</h3>
        <ul>
            {#each members.users as user}
                <li>{user}</li>
            {/each}
        </ul>
    {/if}
    {#if members.kerberos.length > 0}
        <h3>Kerberos principals</h3>
        <ul>
            {#each members.kerberos as kerb}
                <li>{kerb}</li>
            {/each}
        </ul>
    {/if}
    {#if members.emails.length > 0}
        <h3>Emails</h3>
        <ul>
            {#each members.emails as email}
                <li>{email}</li>
            {/each}
        </ul>
    {/if}
    {#if members.lists.length > 0}
        <h3>Lists</h3>
        <ul>
            {#each members.lists as list}
                <li><a href="/lists/{list}">{list}</a></li>
            {/each}
        </ul>
    {/if}
{:catch e}
    <h3>An error occurred</h3>
    {JSON.stringify(e)}
{/await}
