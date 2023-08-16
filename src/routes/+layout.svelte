<script lang="ts">
	import { page } from '$app/stores';
	import { loginWebathena } from '$lib/webathena';
	import { setContext, onDestroy } from 'svelte';
	import { writable, derived } from 'svelte/store';
	import { encodeTicket } from '$lib/webathena';
	import { persisted } from 'svelte-local-storage-store';
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';

	import '../scss/styles.scss';
	import 'bootstrap/dist/js/bootstrap.bundle.min.js';
	import 'bootstrap-icons/font/bootstrap-icons.css';

	const routes = [
		// {path: '/', name: 'Home'},
		{ path: `${base}/lists`, name: 'My lists' },
		{ path: `${base}/me`, name: 'About me' }
	];

	// TODO: sensible behavior when ticket expires

	const webathena = persisted<any>('webathena', null);
	setContext('webathena', webathena);

	const ticket = derived(webathena, encodeTicket);
	setContext('ticket', ticket);

	$: console.log($webathena);

	async function login() {
		$webathena = await loginWebathena();
	}

	const theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
	if (theme === 'dark') {
		document.documentElement.setAttribute('data-bs-theme', 'dark');
	} else {
		document.documentElement.setAttribute('data-bs-theme', 'light');
	}

	let searchQuery: string = '';
</script>

<header class="sticky-top">
	<nav class="navbar navbar-expand-md bg-body-tertiary">
		<div class="container">
			<a class="navbar-brand" href={`${base}/`}>MoiraVerse</a>
			<button
				class="navbar-toggler"
				type="button"
				data-bs-toggle="collapse"
				data-bs-target="#moiraNav"
				aria-controls="moiraNav"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span class="navbar-toggler-icon" />
			</button>
			<div class="collapse navbar-collapse" id="moiraNav">
				<ul class="navbar-nav me-auto">
					{#each routes as route}
						<li class="nav-item">
							<a
								href={route.path}
								aria-current={route.path === $page.url.pathname}
								class:active={route.path === $page.url.pathname}
								class:disabled={$webathena === null}
								aria-disabled={$webathena === null}
								class="nav-link">{route.name}</a
							>
						</li>
					{/each}
				</ul>
				<div class="input-group me-2 w-auto" role="search">
					<input
						class="form-control"
						type="search"
						placeholder="Find a List"
						aria-label="Find a List"
						aria-describedby="button-searchlist"
						id="input-searchlist"
						disabled={$webathena === null}
						bind:value={searchQuery}
						on:keydown={(e) =>
							e.key == 'Enter' ? document.getElementById('button-searchlist')?.click() : null}
					/>

					<button
						class="btn btn-secondary"
						type="button"
						id="button-searchlist"
						disabled={searchQuery.trim().length == 0 || $webathena === null}
						on:click={() => {
							if (searchQuery.trim().length > 0) {
								goto(`${base}/lists/${searchQuery.trim()}`);
							}
						}}>Go</button
					>
				</div>

				<button
					type="button"
					class="btn btn-primary me-2"
					data-bs-toggle="modal"
					data-bs-target="#createListModal"
					disabled={$webathena === null}
				>
					Create a New List
				</button>

				<button
					type="button"
					class="btn btn-info me-2"
					data-bs-toggle="modal"
					data-bs-target="#helpModal"
				>
					Help
				</button>

				{#if $webathena === null}
					<button type="button" class="btn btn-success" id="button-login" on:click={login}
						>Login</button
					>
				{:else}
					<button
						type="button"
						class="btn btn-danger"
						id="logout"
						on:click={() => ($webathena = null)}>Logout</button
					>
				{/if}
			</div>
		</div>
	</nav>
</header>

<div
	class="modal fade"
	id="createListModal"
	tabindex="-1"
	aria-labelledby="createListModalLabel"
	aria-hidden="true"
>
	<div class="modal-dialog modal-fullscreen">
		<div class="modal-content">
			<div class="modal-header">
				<h1 class="modal-title fs-5" id="createListModalLabel">Create a New List</h1>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" />
			</div>
			<div class="modal-body overflow-hidden">
				<iframe
					title="List Creator"
					class="w-100 h-100 p-0 m-0"
					src="https://listmaker.mit.edu/lc"
				/>
			</div>
		</div>
	</div>
</div>

<div
	class="modal fade"
	id="helpModal"
	tabindex="-1"
	aria-labelledby="helpModalLabel"
	aria-hidden="true"
>
	<div class="modal-dialog modal-dialog-scrollable">
		<div class="modal-content">
			<div class="modal-header">
				<h1 class="modal-title fs-5" id="helpModalLabel">MoiraVerse Help</h1>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" />
			</div>
			<div class="modal-body">This is a work in progress, check back later! :D</div>
		</div>
	</div>
</div>

<main class="container my-3">
	<slot />
</main>

<footer class="mt-auto text-center bg-body-tertiary py-1">
	<em
		>Brought to you by <a class="icon-link" href="https://sipb.mit.edu/"
			>SIPB<i class="bi-arrow-right" /></a
		></em
	>
</footer>
