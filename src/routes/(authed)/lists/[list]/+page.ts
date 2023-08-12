export const load = ({ params }) => {
    // We don't have access to the webathena
    // token on the server, so this is all we can do
    return {
        list: params.list,
    };
}