<script lang="ts">
	import { getContext } from 'svelte';
	import Loading from '$lib/Loading.svelte';
	import { getListInfo } from '$lib/moira';
	import type { Readable } from 'svelte/store';
	import { base } from '$app/paths';

	export let listName: string;

	const ticket = getContext<Readable<string>>('ticket');

	function humanBool(b: boolean) {
		return b ? 'yes' : 'no';
	}
</script>

<h1>List Info: {listName}</h1>

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
			<dt class="col-md-3"><i class="bi bi-card-text" /> Description</dt>
			<dd class="col-md-9">{info.description}</dd>
			<dt class="col-md-3"><i class="bi bi-pencil-square" /> Owner</dt>
			<dd class="col-md-9">
				{#if info.owner.type == 'list'}
					<a href="{base}/lists/{info.owner.name}">{info.owner.name}</a>
				{:else}
					{info.owner.name}
				{/if}
			</dd>
			<!-- the deeper you go the more it would make sense to have with blocks like Hugo -->
			{#if info.membership_administrator}
				<dt class="col-md-3"><i class="bi bi-person-gear" /> Membership administrator</dt>
				<dd class="col-md-9">
					{#if info.membership_administrator.type == 'list'}
						<a href="{base}/lists/{info.membership_administrator.name}"
							>{info.membership_administrator.name}</a
						>
					{:else}
						{info.membership_administrator.name}
					{/if}
				</dd>
			{/if}
			<dt class="col-md-3"><i class="bi bi-activity" /> Active</dt>
			<dd class="col-md-9">{humanBool(info.active)}</dd>
			<dt class="col-md-3"><i class="bi bi-envelope-at" /> Is mailing list</dt>
			<dd class="col-md-9">{humanBool(info.is_mailing_list)}</dd>
			<dt class="col-md-3"><i class="bi bi-person-add" /> Anyone can add themselves</dt>
			<dd class="col-md-9">{humanBool(info.public)}</dd>
			<dt class="col-md-3"><i class="bi bi-person-lock" /> Only admins can see members</dt>
			<dd class="col-md-9">{humanBool(info.hidden)}</dd>
			<dt class="col-md-3"><i class="bi bi-hdd-network" /> Sync membership to AFS</dt>
			<dd class="col-md-9">{humanBool(info.is_afs_group)}</dd>
			<dt class="col-md-3"><i class="bi bi-router" /> Sync membership to DNS records</dt>
			<dd class="col-md-9">{humanBool(info.is_nfs_group)}</dd>
			<dt class="col-md-3"><i class="bi bi-door-open" /> Controls tap access</dt>
			<dd class="col-md-9">{humanBool(info.is_physical_access)}</dd>
			<dt class="col-md-3"><i class="bi bi-clock-history" /> Last modified</dt>
			<dd class="col-md-9">
				by {info.last_modified.user} using {info.last_modified.tool} on {info.last_modified.time}
			</dd>
		</dl>
	{/if}
{/await}
