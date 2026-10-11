# Afamefune portfolio

Plain HTML, CSS and JavaScript. No build step, no backend.

## Deploy on Render
1. Push this folder to a GitHub repository.
2. In Render choose New > Static Site and select the repository.
3. Build command: leave empty (or `echo "No build step"`). Publish directory: `.`
   (Or use New > Blueprint, which reads `render.yaml`.)
4. Under Settings > Custom Domains add `afamefune.com` and follow Render's DNS instructions.

## Updating
- Copy: `index.html`. Colours and fonts: the tokens at the top of `css/styles.css`.
- Real project screenshots: save JPGs into `assets/screens/` using the names in the README there.
  They automatically replace the drawn previews.
- If your Render address is not `afamefune.onrender.com`, the canonical, sitemap and robots
  files already point at `afamefune.com`, so no change is needed until the domain is live.
