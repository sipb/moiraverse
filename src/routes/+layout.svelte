<script lang="ts">
	import { page } from "$app/stores";

    const routes = [
        {path: '/', name: 'Home'},
        {path: '/lists', name: 'My lists'},
        {path: '/me', name: 'About me'},
    ]
</script>

<nav>
    <ul>
    {#each routes as route}
        <li>
            <a href={route.path} aria-current={route.path === $page.route.id}>{route.name}</a>
        </li>
    {/each}
    </ul>
</nav>

<slot/>

<footer>
    <small>Brought to you by SIPB.</small>
</footer>

<!-- https://codepen.io/tysongach/pen/wJpZWy -->
<style>
    [aria-current]:not([aria-current="false"]) {
        font-weight: bold;
    }
</style>