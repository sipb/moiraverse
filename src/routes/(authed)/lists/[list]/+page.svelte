<script lang="ts">
	import ListInfo from './ListInfo.svelte';
    import ListMembers from './ListMembers.svelte';
    import ListLists from './ListLists.svelte';
	import ListBelongings from './ListBelongings.svelte';
    
    export let data;
    $: listName = data.list;
</script>

<ListInfo {listName} />
<div class="row">
	<div class="col">
		<ListMembers {listName} />
	</div>
	<div class="col">
		<ListLists {listName} />
	</div>
	<div class="col">
		<ListBelongings {listName} />
	</div>
</div>
