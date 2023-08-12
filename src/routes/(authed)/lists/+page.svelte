<script lang="ts">
	import MyBelongings from './MyBelongings.svelte';
import MyLists from './MyLists.svelte';
</script>

<div class="row">
	<div class="column">
		<MyLists/>
	</div>
	<div class="column">
		<MyBelongings/>
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
