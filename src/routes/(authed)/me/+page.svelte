<script>
	import { getContext } from 'svelte';
    import { encodeTicket, makeHeaders } from '$lib/webathena';
    import { PUBLIC_MOIRA_API } from '$env/static/public';
    import Loading from '$lib/Loading.svelte';
	import { derived } from 'svelte/store';

    const webathena = getContext('webathena');
    const headers = derived(webathena, makeHeaders);

    async function getUserInfo() {
        const response = await fetch(`${PUBLIC_MOIRA_API}/users/me/`, {
            headers: $headers,
        });
        const json = await response.json();
        if (response.status !== 200) {
            throw json;
        }
        return json;
    }

    const promise = getUserInfo();

</script>

<h1>My info</h1>


{#await promise}
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