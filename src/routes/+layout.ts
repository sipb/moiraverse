// This should make it possible to deploy on scripts,
// by not requiring a backend

// The harming SEO probably doesn't matter, since everything
// requires login anyway. In fact it might be better that
// random lists don't end up on search results (but robots.txt
// would work for that purpose too)

// TODO: is this really necessary?

// https://kit.svelte.dev/docs/single-page-apps#prerendering-individual-pages
// TODO: This can also be more fine-grained

export const ssr = false;
