# MoiraVerse

This is a Moira client written in Svelte. It is very much work-in-progress, and for instance, there is no CSS or design, and lists can't be created or modified yet.

## Backend

The backend is https://github.com/gabrc52/moira-rest-api.

There is currently a backend running on `uplink.mit.edu`, but it will move to `moiraverse.xvm.mit.edu`.

In order to run this project, create a file called `.env` with the following contents:

```
PUBLIC_MOIRA_API="https://moira-api.mit.edu"
```

Or use `http://localhost:5000` if you are running or developing the REST API locally.

(Yes, SvelteKit is capable of doing backends, but I wrote it before this project, and there are no Moira C bindings for JavaScript)

## Developing

Once you've cloned the repo and installed dependencies with `npm install`, start a development server:

```bash
npm run dev
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
