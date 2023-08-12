<script lang="ts">
    import { loginWebathena } from '$lib/webathena';
	import { setContext } from 'svelte';
    import { writable, derived } from 'svelte/store';
    import { encodeTicket } from '$lib/webathena';
    import { persisted } from 'svelte-local-storage-store';

    // TODO: sensible behavior when ticket expires

    // TODO: remove this if statement
    if (window.localStorage) {
        if (window.localStorage.getItem('webathena') === 'undefined') {
            window.localStorage.setItem('webathena', 'null');
        }
    }

    const webathena = persisted<any>('webathena', null);
    setContext('webathena', webathena);

    const ticket = derived(webathena, encodeTicket);
    setContext('ticket', ticket);

    $: console.log($webathena);

    async function login() {
        $webathena = await loginWebathena();
    }
</script>

{#if $webathena === null}
    <h1>You are not logged in</h1>
    <button id="login" on:click={login}>Login with Webathena</button>
{:else}
    <button id="logout" on:click={() => $webathena = null}>Logout</button>
    <br/>
    <slot/>
{/if}