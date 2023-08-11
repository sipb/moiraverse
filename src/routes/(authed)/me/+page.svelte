<script lang="ts">
	import { getContext } from 'svelte';
    import Loading from '$lib/Loading.svelte';
    import { makeQuery } from '$lib/moira';
	import type { Readable } from 'svelte/store';

    const ticket = getContext<Readable<string>>('ticket');

    type UserInfo = {
        "full_name": string,
        "names": {
            "first": string,
            "middle": string,
            "last": string,
        }
        "kerb": string,
        "mit_id": number,
        "class_year": string,
    };
    
    async function getUserInfo(): Promise<UserInfo> {
        return await makeQuery({
            method: 'GET',
            path: '/users/me/',
            ticket: $ticket,
        });
    }

</script>

<h1>My info</h1>


{#await getUserInfo()}
<Loading/>
{:then userInfo}
    <ul>
        <li><strong>Full name: </strong>{userInfo.full_name}</li>
        <li><strong>Kerb: </strong>{userInfo.kerb}</li>
        <li><strong>Class year: </strong>{userInfo.class_year}</li>
        <li><strong>MIT ID: </strong>{userInfo.mit_id}</li>
    </ul>
{:catch e}
    <h2>An error occured:</h2>
    <p>{JSON.stringify(e)}</p>
{/await}