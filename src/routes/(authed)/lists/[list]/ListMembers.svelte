<script lang="ts">
	import { getContext } from 'svelte';
    import Loading from '$lib/Loading.svelte';
    import { getListMembers } from '$lib/moira';
	import type { Readable } from 'svelte/store';
	import Error from '$lib/Error.svelte';
    
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
        <ul class="list-group">
            {#each members.users as user}
                <li class="list-group-item">{user}</li>
            {/each}
        </ul>
    {/if}
    {#if members.kerberos.length > 0}
        <h3>Kerberos principals</h3>
        <ul class="list-group">
            {#each members.kerberos as kerb}
                <li class="list-group-item">{kerb}</li>
            {/each}
        </ul>
    {/if}
    {#if members.emails.length > 0}
        <h3>Emails</h3>
        <ul class="list-group">
            {#each members.emails as email}
                <li class="list-group-item">{email}</li>
            {/each}
        </ul>
    {/if}
    {#if members.lists.length > 0}
        <h3>Lists</h3>
        <div class="list-group">
            {#each members.lists as list}
                <a href="/lists/{list}" class="list-group-item list-group-item-action">{list}</a>
            {/each}
        </div>
    {/if}
{:catch error}
    <Error {error}/>
{/await}
