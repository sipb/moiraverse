<script lang="ts">
	import { getContext } from 'svelte';
    import Loading from '$lib/Loading.svelte';
    import { getListInfo } from '$lib/moira';
	import type { Readable } from 'svelte/store';
    
    export let listName: string;

    const ticket = getContext<Readable<string>>('ticket');

    function humanBool(b: boolean) {
        return b ? 'yes' : 'no';
    }
</script>

<h1>List info for {listName}</h1>

{#await getListInfo($ticket, listName)}
    <Loading/>
{:then info}
    {#if info.is_mailman_list}
        <p>This is a mailman list! Manage it at <a href="https://mailman.mit.edu/mailman/listinfo/{listName}">mailman.mit.edu/mailman/listinfo/{listName}</a></p>
    {:else}
    <ul>
        <!-- TODO make this nice-looking, descriptive and user-friendly. use icons! -->
        <li><strong>Description: </strong>{info.description}</li>
        <li>
            <strong>Owner: </strong>
            {#if info.owner.type == 'list'}
                <a href="/lists/{info.owner.name}">{info.owner.name}</a>
            {:else}
                {info.owner.name}
            {/if}
        </li>
        <!-- the deeper you go the more it would make sense to have with blocks like Hugo -->
        {#if info.membership_administrator}
            {#if info.membership_administrator.type == 'list'}
                <a href="/lists/{info.membership_administrator.name}">{info.owner.name}</a>
            {:else}
                {info.owner.name}
            {/if}
        {/if}
        <li><strong>Active: </strong>{humanBool(info.active)}</li>
        <li><strong>Is mailing list: </strong>{humanBool(info.is_mailing_list)}</li>
        <li><strong>Anyone can add themselves: </strong>{humanBool(info.public)}</li>
        <li><strong>Only admins can see members: </strong>{humanBool(!info.hidden)}</li>
        <li><strong>Sync membership to AFS: </strong>{humanBool(info.is_afs_group)}</li>
        <li><strong>Sync membership to DNS records: </strong>{humanBool(info.is_nfs_group)}</li>
        <li><strong>Controls tap access: </strong>{humanBool(info.is_physical_access)}</li>
    </ul>
    {/if}
{/await}