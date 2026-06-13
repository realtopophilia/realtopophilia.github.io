# Topophilia

A redesign of your personal site — personal writing, urban-policy memos, and your
vibecoded product portfolio — with a live three.js "topographic map" hero.

## Run it on your computer

Open a terminal in this folder and type:

```
npm install      (only the first time)
npm run dev
```

Then open **http://localhost:3000** in your browser. (If port 3000 is busy,
the terminal will tell you which address to use instead.)

## How to change the content

You only ever need to edit **one file**: `data/content.js`.

It holds four lists you can edit:

- `site` — your name, tagline, email, and GitHub link (top of the file).
- `writing` — your essays and policy memos.
- `work` — your projects (the cards in the "Work" section).
- `silly` — the fun/experimental things.

To **add a post**: copy an existing `{ ... }` block, paste it at the top of the
list, and change the words. Keep all the commas and curly braces where they are.
Save the file — the site updates by itself while `npm run dev` is running.

- For writing, `kind` must be either `"essay"` or `"memo"` (that controls the
  little colored label).
- `href` is the link the item points to. Use `"#"` if it isn't published yet.

## Putting it online (GitHub Pages)

This site is set up to publish to **https://realtopophilia.github.io** for free.
It builds into plain static files, so no server is needed.

**One-time setup:**

1. Create a new GitHub repo named **exactly** `realtopophilia.github.io`
   (the name matters — that's what makes it your root site).
2. Push this folder to that repo's `main` branch.
3. On GitHub, open the repo → **Settings** → **Pages** → under
   **"Build and deployment" → Source**, choose **"GitHub Actions"**.

That's it. A few minutes after each push, the site is live and updated.

**After that, to publish a change:** edit `data/content.js` (or anything else),
then commit and push to `main`. GitHub rebuilds and redeploys automatically —
you'll see progress in the repo's **Actions** tab.

> The auto-deploy recipe lives in `.github/workflows/deploy.yml`. You don't need
> to touch it.

## What's under the hood (for the curious)

- **Next.js + React** — the site framework (same as your other projects).
- **three.js / @react-three/fiber** — the animated topographic field behind the
  title. It's a custom shader in `components/Hero3D.jsx`.
- **motion** — the gentle fade-in animations as you scroll.
- All the colors, fonts, and spacing live in `app/globals.css`.
