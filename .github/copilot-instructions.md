# Gravitate-Health FOSPS Documentation Site

This is a **Docusaurus 3.7.0** documentation site for the Federated Open-Source Platform and Services (FOSPS) of the Gravitate-Health project. The site provides developer tutorials for building FOSPS components: Lenses, Preprocessors, and Connectors.

## Documentation Structure

The documentation is organized around three core component types:

- **`docs/tutorial-Lens/`**: Guides for creating Lenses (JavaScript algorithms that adapt ePI content)
- **`docs/tutorial-Preprocessor/`**: Guides for building semantic annotation services
- **`docs/tutorial-connector/`**: Guides for developing data source connectors
- **`docs/intro.md`**: Main introduction to FOSPS architecture and concepts

Each tutorial folder contains numbered markdown files (`0 - Introduction.md`, `1 - ...`, etc.) with an `_category_.json` for sidebar configuration.

## Development Workflow

### Local Development
```bash
npm install          # Install dependencies (Node.js >=18.0 required)
npm run start        # Start dev server at http://localhost:3000
npm run build        # Build static site to /build directory
npm run serve        # Preview production build locally
```

### Deployment
The site deploys to GitHub Pages (`gh-pages` branch) via:
```bash
# With SSH
USE_SSH=true npm run deploy

# With Git credentials
GIT_USER=<username> npm run deploy
```

## Content Guidelines for FOSPS Documentation

### 1. Terminology Consistency

**Critical regulated terms** (use exactly as shown):
- **ePI** (Electronic Product Information) - not "ePIL" or "e-PI"
- **IPS** (International Patient Summary) - patient health records
- **Focusing Mechanism** - the adaptation process that creates f(ePI)
- **p(ePI)** - preprocessed ePI (semantically annotated)
- **f(ePI)** - focused ePI (personalized output)

**Key components** (maintain capitalization):
- **Lens Execution Environment (LEE)** - executes lens logic
- **Focusing Manager** - orchestrates preprocessing and lens execution
- **Content Trust Framework (CTF)** - ensures integrity/provenance

### 2. Architecture Context (The "Why" Behind Design Decisions)

**Regulatory Constraint**: All FOSPS components operate under the fundamental rule that **regulated ePI content cannot be removed or altered**. This is why:
- Lenses use CSS classes (`highlight`/`collapse`) instead of deleting content
- Preprocessors cannot modify narrative text, only add HTML class attributes
- The f(ePI) is ephemeral (not cached) because it's a personalized view, not a new document

**Performance Requirements**: 
- Lenses must run on patient phones (client-side) OR scale for many concurrent users (server-side)
- Preprocessors should handle heavy computation (NLP, semantic analysis) so Lenses remain lightweight
- This is why preprocessors and lenses are separate: different computational profiles

**Service Discovery Pattern**: The platform uses Kubernetes labels for auto-discovery:
```yaml
eu.gravitate-health.fosps.preprocessing=true  # For preprocessors
eu.gravitate-health.fosps.connector=true      # For connectors
```

### 3. Documentation Patterns

**Admonitions** (Docusaurus callouts) are used extensively - match the existing style:
```markdown
:::info Purpose
Connectors provide access to Trusted Sources of Information (TSI).
:::

:::warning Critical Limitation
Lenses **cannot remove content** from the regulated ePI.
:::

:::tip Best Practice
Rely on Preprocessors for heavy computation, not Lenses.
:::
```

**Code Examples**: When showing FHIR resources, use the Implementation Guide examples:
- Preprocessed ePI examples: `https://build.fhir.org/ig/hl7-eu/gravitate-health/artifacts.html#processed-epi`
- Reference actual FHIR profiles: `https://build.fhir.org/ig/hl7-eu/gravitate-health/`

### 4. Component-Specific Technical Details

**Preprocessors**:
- Must implement `/preprocess` REST endpoint (see [openapi.yaml](https://github.com/Gravitate-Health/preprocessing-service-example/blob/main/openapi.yaml))
- Add `HtmlElementLink` FHIR extensions with `elementClass` + `concept` (SNOMED-CT/ICPC-2 codes)
- Modify HTML by adding class attributes to `<span>`, `<p>`, `<h1>`, etc.
- Must handle stacking (input may already be preprocessed by another service)

**Lenses**:
- JavaScript code packaged as FHIR Library resources (Base64 encoded as UTF-8)
- LEE decodes from Base64 and interprets as UTF-8 before execution
- Use LEE helper methods: `modifyCSSClass()` and `addNewContent()`
- Operate on three inputs: p(ePI), IPS, and Persona Vector (PV)
- CSS classes define attention levels: `"highlight"` (high), `"collapse"` (low), or standard (no class)
- Packaged using the [FHIR Lens bundler](https://github.com/Gravitate-Health/fhir-lens-bundler)

**Connectors**:
- Provide access to FHIR resources (ePI, IPS, Persona Dimension Collection, Support Material)
- Based on HL7 FHIR standards (ePI IG, IPS IG)
- Can extend the multi-purpose connector or build custom ones
- Invoked via standardized REST API

### 5. Site Configuration

**Key files**:
- `docusaurus.config.js`: Site metadata, navbar, footer, GitHub links
  - Organization: `gravitate-health`
  - Deployment branch: `gh-pages`
  - Edit links point to: `https://github.com/gravitate-health/gravitate-health.github.io/tree/main/`
- `sidebars.js`: Auto-generates sidebar from `docs/` folder structure using `{type: 'autogenerated', dirName: '.'}`
- `package.json`: Scripts and dependencies (React 19, Docusaurus 3.7.0)

**Custom components**:
- `src/pages/index.js`: Homepage with hero banner and CTA to `/docs/intro`
- `src/components/HomepageFeatures/`: Custom React components for landing page

### 6. Writing New Tutorials

When adding new component tutorials:
1. Create numbered files in the appropriate `tutorial-X/` folder
2. Start with `0 - Introduction.md` explaining the component's role in the focusing workflow
3. Include subsections on: implementation, deployment (with K8s label), testing, and examples
4. Link to actual GitHub repos (e.g., `https://github.com/Gravitate-Health/preprocessing-service-example`)
5. Add OpenAPI specs where applicable
6. Update `_category_.json` if changing folder display name or position



