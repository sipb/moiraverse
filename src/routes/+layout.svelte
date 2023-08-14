<script lang="ts">
	import { page } from "$app/stores";
    import { loginWebathena } from '$lib/webathena';
	import { setContext, onDestroy } from 'svelte';
    import { writable, derived } from 'svelte/store';
    import { encodeTicket } from '$lib/webathena';
    import { persisted } from 'svelte-local-storage-store';

    const routes = [
        // {path: '/', name: 'Home'},
        {path: '/lists', name: 'My lists'},
        {path: '/me', name: 'About me'},
    ]

    // TODO: sensible behavior when ticket expires

    const webathena = persisted<any>('webathena', null);
    setContext('webathena', webathena);

    const ticket = derived(webathena, encodeTicket);
    setContext('ticket', ticket);

    $: console.log($webathena);

    async function login() {
        $webathena = await loginWebathena();
    }

    const theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-bs-theme', 'dark')
    } else {
      document.documentElement.setAttribute('data-bs-theme', theme)
    }
</script>

<header>
    <nav class="navbar navbar-expand-lg sticky-top bg-primary">
        <div class="container">
            <a class="navbar-brand" href="/">MoiraVerse</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#moiraNav" aria-controls="moiraNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="moiraNav">
                <ul class="navbar-nav me-auto">
                {#each routes as route}
                    <li class="nav-item">
                        <a href={route.path} aria-current={route.path === $page.url.pathname} class={"nav-link" + ((route.path === $page.url.pathname) ? ' active' : '')}>{route.name}</a>
                    </li>
                {/each}
                </ul>
                <div class="input-group me-2 w-auto" role="search">
                    <input class="form-control" type="search" placeholder="Find a List" aria-label="Find a List" aria-describedby="button-searchlist" id="searchlist" on:keydown={(e) => (e.key == "Enter") ? document.getElementById("button-searchlist").click() : null} />
                    <button class="btn btn-secondary" type="button" id="button-searchlist" on:click={() => window.location = `/lists/${document.getElementById("searchlist").value}`}>Go</button>
                </div>
                {#if $webathena === null}
                    <button type="button" class="btn btn-success" id="login" on:click={login}>Login</button>
                {:else}
                    <button type="button" class="btn btn-danger" id="logout" on:click={() => $webathena = null}>Logout</button>
                {/if}
            </div>
        </div>
    </nav>
</header>

<main>
    <div class="container">
        <slot/>
    </div>
</main>

<footer class="text-center">
    <small>
        Brought to you by SIPB.
     </small>
</footer>