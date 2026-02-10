# Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

### Installation

```
npm install
```

### Local Development

```
npm run start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
npm build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Generate Lenses JSON

```
npm run generate-lenses
```

This command scans all `lens-logic-*` folders in the parent directory and generates/updates `lenses.oficial.json` with lens metadata extracted from FHIR Library Resources. Run this whenever lens repositories are added or updated.

### Generate Preprocessors JSON

```
npm run generate-preprocessors
```

This command uses GitHub CLI to fetch all `preprocessing-service-*` repositories from the Gravitate-Health organization and generates/updates `preprocessors.oficial.json`. Requires `gh` CLI to be installed and authenticated. Run this whenever preprocessor repositories are added or updated.

### Deployment

Using SSH:

```
$ USE_SSH=true yarn deploy
```

Not using SSH:

```
$ GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.
