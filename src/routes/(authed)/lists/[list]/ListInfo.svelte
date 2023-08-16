<script lang="ts">
	import { getContext } from 'svelte';
	import Loading from '$lib/Loading.svelte';
	import { getListInfo } from '$lib/moira';
	import type { Readable } from 'svelte/store';
	import { base } from '$app/paths';

	export let listName: string;

	const ticket = getContext<Readable<string>>('ticket');

	function humanBool(b: boolean) {
		return b ? `<i class="bi bi-check-lg" />` : `<i class="bi bi-x-lg" />`;
	}
</script>

<h1>List Info: {listName}</h1>

{#await getListInfo($ticket, listName)}
	<Loading />
{:then info}
	{#if info.is_mailman_list}
		<dl class="row">
			<dt class="col-md-3"><i class="bi bi-envelope-paper" /> Mailman List</dt>
			<dd class="col-md-9">
				{@html humanBool(info.is_mailman_list)}
			</dd>
			<dt class="col-md-3"><i class="bi bi-info-circle" /> List Information</dt>
			<dd class="col-md-9">
				<a
					class="icon-link icon-link-hover"
					href="https://mailman.mit.edu/mailman/listinfo/{listName}"
					target="_blank"
				>
					mailman.mit.edu/mailman/listinfo/{listName}
					<i class="bi bi-arrow-right" />
				</a>
			</dd>
			<dt class="col-md-3"><i class="bi bi-gear" /> Admin Dashboard (Certs Required)</dt>
			<dd class="col-md-9">
				<a
					class="icon-link icon-link-hover"
					href="https://mailman.mit.edu:444/mailman/admin/{listName}"
					target="_blank"
				>
					mailman.mit.edu:444/mailman/admin/{listName}
					<i class="bi bi-arrow-right" />
				</a>
			</dd>
		</dl>
	{:else}
		<dl class="row">
			<!-- TODO make this nice-looking, descriptive and user-friendly. use icons! -->
			<dt class="col-md-3"><i class="bi bi-card-text" /> Description</dt>
			<dd class="col-md-9">{info.description}</dd>
			<dt class="col-md-3"><i class="bi bi-pencil-square" /> Owner</dt>
			<dd class="col-md-9">
				{#if info.owner.type == 'list'}
					<a class="icon-link icon-link-hover" href="{base}/lists/{info.owner.name}">
						{info.owner.name}
						<i class="bi bi-arrow-right" />
					</a>
				{:else}
					{info.owner.name}
				{/if}
			</dd>
			<!-- the deeper you go the more it would make sense to have with blocks like Hugo -->
			{#if info.membership_administrator}
				<dt class="col-md-3"><i class="bi bi-person-gear" /> Membership administrator</dt>
				<dd class="col-md-9">
					{#if info.membership_administrator.type == 'list'}
						<a
							class="icon-link icon-link-hover"
							href="{base}/lists/{info.membership_administrator.name}"
						>
							{info.membership_administrator.name}
							<i class="bi bi-arrow-right" />
						</a>
					{:else}
						{info.membership_administrator.name}
					{/if}
				</dd>
			{/if}
			<dt class="col-md-3"><i class="bi bi-activity" /> Active</dt>
			<dd class="col-md-9">{@html humanBool(info.active)}</dd>
			<dt class="col-md-3"><i class="bi bi-envelope-at" /> Is mailing list</dt>
			<dd class="col-md-9">{@html humanBool(info.is_mailing_list)}</dd>
			<dt class="col-md-3"><i class="bi bi-person-add" /> Anyone can add themselves</dt>
			<dd class="col-md-9">{@html humanBool(info.public)}</dd>
			<dt class="col-md-3"><i class="bi bi-person-lock" /> Only admins can see members</dt>
			<dd class="col-md-9">{@html humanBool(info.hidden)}</dd>
			<dt class="col-md-3"><i class="bi bi-hdd-network" /> Sync membership to AFS</dt>
			<dd class="col-md-9">{@html humanBool(info.is_afs_group)}</dd>
			<dt class="col-md-3"><i class="bi bi-router" /> Sync membership to DNS records</dt>
			<dd class="col-md-9">{@html humanBool(info.is_nfs_group)}</dd>
			<dt class="col-md-3"><i class="bi bi-door-open" /> Controls tap access</dt>
			<dd class="col-md-9">{@html humanBool(info.is_physical_access)}</dd>
			<dt class="col-md-3"><i class="bi bi-clock-history" /> Last modified</dt>
			<dd class="col-md-9">
				by {info.last_modified.user} using {info.last_modified.tool} on {new Date(
					info.last_modified.time
				).toLocaleString()}
			</dd>
		</dl>
	{/if}
{/await}
