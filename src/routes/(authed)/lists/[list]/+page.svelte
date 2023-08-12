<script lang="ts">
	import ListInfo from './ListInfo.svelte';
    import ListMembers from './ListMembers.svelte';
    import ListLists from './ListLists.svelte';
    
    export let data;
    $: listName = data.list;
</script>

<ListInfo {listName} />

<div class="row">
	<div class="column">
		<ListMembers {listName} />
	</div>
	<div class="column">
		<ListLists {listName} />
	</div>
    <div class="column">
		
	</div>
</div>


<!-- https://www.w3schools.com/howto/howto_css_two_columns.asp -->
<style>
	.row {
		display: flex;
	}

	.column {
		flex: 33%;
	}
</style>
