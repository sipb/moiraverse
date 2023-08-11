<script lang="ts">
    import { loginWebathena } from '$lib/webathena';
	import { setContext } from 'svelte';
    import { writable, derived } from 'svelte/store';
    import { encodeTicket } from '$lib/webathena';

    // TODO: local storage?
    const webathena = writable<any>(undefined);
    setContext('webathena', webathena);

    const ticket = derived(webathena, encodeTicket);
    setContext('ticket', ticket);

    $: console.log($webathena);

    async function login() {
        $webathena = await loginWebathena();
    }
</script>

{#if $webathena === undefined}
    <h1>You are not logged in</h1>
    <button id="login" on:click={login}>Login with Webathena</button>
{:else}
    <button id="logout" on:click={() => $webathena = undefined}>Logout</button>
    <br/>
    <slot/>
{/if}