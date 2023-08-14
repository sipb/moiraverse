<script lang="ts">
	import { getContext } from 'svelte';
	import Loading from '$lib/Loading.svelte';
	import { getListInfo } from '$lib/moira';
	import type { Readable } from 'svelte/store';

	export let listName: string;

	const ticket = getContext<Readable<string>>('ticket');

	function humanBool(b: boolean) {
		return b ? 'yes' : 'no';
	}
</script>

<h1>List info for {listName}</h1>

{#await getListInfo($ticket, listName)}
	<Loading />
{:then info}
	{#if info.is_mailman_list}
		<p>
			This is a mailman list! Manage it at <a
				href="https://mailman.mit.edu/mailman/listinfo/{listName}"
				>mailman.mit.edu/mailman/listinfo/{listName}</a
			>
		</p>
	{:else}
		<dl class="row">
			<!-- TODO make this nice-looking, descriptive and user-friendly. use icons! -->
			<dt class="col-sm-3">Description</dt>
			<dd class="col-sm-9">{info.description}</dd>
			<dt class="col-sm-3">Owner:</dt>
			<dd class="col-sm-9">
				{#if info.owner.type == 'list'}
					<a href="/lists/{info.owner.name}">{info.owner.name}</a>
				{:else}
					{info.owner.name}
				{/if}
			</dd>
			<!-- the deeper you go the more it would make sense to have with blocks like Hugo -->
			{#if info.membership_administrator}
				<dt class="col-sm-3">Membership administrator:</dt>
				<dd class="col-sm-9">
					{#if info.membership_administrator.type == 'list'}
						<a href="/lists/{info.membership_administrator.name}"
							>{info.membership_administrator.name}</a
						>
					{:else}
						{info.membership_administrator.name}
					{/if}
				</dd>
			{/if}
			<dt class="col-sm-3">Active:</dt>
			<dd class="col-sm-9">{humanBool(info.active)}</dd>
			<dt class="col-sm-3">Is mailing list:</dt>
			<dd class="col-sm-9">{humanBool(info.is_mailing_list)}</dd>
			<dt class="col-sm-3">Anyone can add themselves:</dt>
			<dd class="col-sm-9">{humanBool(info.public)}</dd>
			<dt class="col-sm-3">Only admins can see members:</dt>
			<dd class="col-sm-9">{humanBool(info.hidden)}</dd>
			<dt class="col-sm-3">Sync membership to AFS:</dt>
			<dd class="col-sm-9">{humanBool(info.is_afs_group)}</dd>
			<dt class="col-sm-3">Sync membership to DNS records:</dt>
			<dd class="col-sm-9">{humanBool(info.is_nfs_group)}</dd>
			<dt class="col-sm-3">Controls tap access:</dt>
			<dd class="col-sm-9">{humanBool(info.is_physical_access)}</dd>
			<dt class="col-sm-3">Last modified:</dt>
			<dd class="col-sm-9">
				by {info.last_modified.user} using {info.last_modified.tool} on {info.last_modified.time}
			</dd>
		</dl>
	{/if}
{/await}
