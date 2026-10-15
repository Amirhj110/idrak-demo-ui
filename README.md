# Idrak Demo

A standalone React and Vite demo of the Idrak enterprise AI workspace. The interface uses sample data and illustrative responses; it does not connect to Idrak production services.

## Run locally

Requires Node.js 22 or newer.

```sh
npm ci --legacy-peer-deps
npm run dev
```

Vite runs at `http://localhost:3002`.

## GitHub Pages deployment

The `Deploy to GitHub Pages` workflow builds and publishes this demo whenever a change is pushed to `main`. It also supports manual runs from the repository's Actions tab.

The workflow uses the repository name as the Pages base path. To use a different repository name, update `VITE_BASE_PATH` in `.github/workflows/deploy.yml`.
