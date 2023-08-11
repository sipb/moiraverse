<script lang="ts">
    import { loginWebathena } from '$lib/webathena';
	import { setContext } from 'svelte';
    import { writable } from 'svelte/store';

    // TODO: local storage?
    const webathena = writable<any>(undefined);
    setContext('webathena', webathena);

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