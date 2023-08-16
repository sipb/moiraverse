<script lang="ts">
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	const webathena: Writable<string> = getContext('webathena');
</script>

{#if $webathena === null}
	<h1>You are not logged in</h1>
{:else}
	<slot />
{/if}
