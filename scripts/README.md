# Scripts

This directory contains utility scripts for the Gravitate-Health documentation site.

## generate-lenses-json.js

Generates/updates the `lenses.oficial.json` file with information about all official FOSPS lenses.

### What it does

The script:
1. Scans the parent directory for all `lens-logic-*` folders
2. For each lens folder, reads the FHIR Library Resource JSON file
3. Extracts the lens metadata: `name`, `description`, and `title`
4. Gets the Git repository URL and converts it to HTTPS format
5. Generates a JSON file with all lens information at the root of the workspace

### Usage

```bash
# Run directly with Node.js
node scripts/generate-lenses-json.js

# Or use the npm script
npm run generate-lenses

Output location: `lenses.oficial.json` (at workspace root)

### Requirements

- Node.js >= 18.0
- Git repositories for each lens must have a remote named `origin`
- Each lens folder must contain a FHIR Library Resource JSON file

### Output Format

The generated `lenses.oficial.json` contains an array of lens objects:

```json
[
  {
    "name": "Allergies and Intollerances Lens",
    "description": "A lens that highlight any information related to allergies or intollerances",
    "title": "Allergies and Intollerance Lens",
    "status": "draft",
    "repoUrl": "https://github.com/Gravitate-Health/lens-logic-allergy-and-intollerance.git"
  },
  ...
]
```

### Using in Documentation

The generated JSON file can be imported and used in MDX files through the `LensTable` component:

```mdx
import LensTable from '@site/src/components/LensTable';

<LensTable />
```

This component automatically renders the lens data as a formatted table with name, description, status badge, and repository link.

### When to run

Run this script whenever:
- A new official lens is added to the parent directory
- Lens metadata (name, description, title) is updated in a FHIR Library Resource
- Repository URLs change

### Troubleshooting

**"No FHIR Library JSON file found"**: The script looks for `.json` files (excluding `package.json` and `package-lock.json`) in each lens folder. Make sure your lens has a properly named JSON file.

**"Failed to extract lens info"**: Verify that the JSON file is a valid FHIR Library Resource with `resourceType: "Library"`.

**Git remote warnings**: If a lens folder doesn't have a Git remote, the script will continue but set `repoUrl` to `null` for that lens.
