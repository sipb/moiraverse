<script>
	import { makeHeaders } from '$lib/webathena';
	import { getContext } from 'svelte';
	import { derived } from 'svelte/store';
	import MyLists from './MyLists.svelte';

	const webathena = getContext('webathena');
	const headers = derived(webathena, makeHeaders);
</script>

<div class="row">
	<div class="column">
		<MyLists/>
	</div>
	<div class="column">
		<h1>Lists I can administer</h1>
	</div>
</div>

<!-- https://www.w3schools.com/howto/howto_css_two_columns.asp -->
<style>
	.row {
		display: flex;
	}

	.column {
		flex: 50%;
	}
</style>
