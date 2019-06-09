# BariBuilder UI

Based on the Ghost Gatsby Starter template, this is the entry point for BariBuilder resources (blog, shop, etc.).

# Configuration that deviates from Ghost Gatsby Starter

`.ghost.json`

`/static/_redirects`

Netlify setup, including webhook integration with Ghost.

&nbsp;

# Running

Start the development server. You now have a Gatsby site pulling content from headless Ghost.

```bash
gatsby develop
```

```bash
# Run a production build, locally
gatsby build

# Serve a production build, locally
gatsby serve
```

Gatsby `develop` uses the `development` config in `.ghost.json` - while Gatsby `build` uses the `production` config.

&nbsp;

# Deploying with Netlify

Hooks are set up so that any changes in the [BariBuilder Blog Ghost CMS](builder-blog.ghost.io/ghost/) will trigger a deploy, as will any commits to `master`.

&nbsp;
