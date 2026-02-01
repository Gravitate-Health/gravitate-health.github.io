---
sidebar_position: 35
title: Lens
tags: [focusing, lens, adaptation-logic, fhir-library]
---

# Lens

A **Lens** is a conceptual piece of code packaged as a FHIR `Library` resource that encodes clinical or context-specific knowledge, applying transformation rules based on patient data.

## Purpose

Lenses determine how [ePI](./epi.md) content should be adapted for individual patients by:
- Highlighting relevant sections
- Collapsing irrelevant sections
- Adding supplementary content
- Enriching with interactive elements

## Packaging

### FHIR Library Resource
Lenses follow the [Lens Profile](https://build.fhir.org/ig/hl7-eu/gravitate-health/StructureDefinition-lens.html):
- JavaScript code encoded in Base64 (UTF-8)
- Stored as `Library.content.data`
- [LEE](./lee.md) decodes from Base64 → UTF-8 before execution
- Contains metadata (author, version, purpose)

### Creation Tool
Packaged using the [FHIR Lens bundler](https://github.com/Gravitate-Health/lens-tool-bundler) tool.

## Execution Inputs

Lenses receive three inputs from [LEE](./lee.md):

1. **[p(ePI)](./p-epi.md)**: Semantically annotated ePI
2. **[IPS](./ips.md)**: Patient clinical data
3. **[PV](./persona-vector.md)**: User context and preferences

## Lens Operations

### Attention Detail Modification
Using `modifyCSSClass()` LEE helper:

```javascript
// Highlight sections relevant to patient conditions
modifyCSSClass("pregnancy-warning", "highlight");

// Collapse irrelevant sections
modifyCSSClass("pediatric-dosing", "collapse");
```

See [Attention Detail Modification](./attention-modification.md) for details.

### Adding Supplementary Content
Using `addNewContent()` LEE helper:

```javascript
// Add hyperlink to Supporting Material
addNewContent(
  "pregnancy-section",
  '<a href="/sm/pregnancy-guide">More information</a>'
);

// Embed video
addNewContent(
  "administration-section",
  '<video src="/videos/injection-technique.mp4"></video>'
);
```

## Lens Logic Example

```javascript
// Check patient's IPS for pregnancy
if (ips.hasCondition("pregnancy")) {
  // Highlight pregnancy warnings
  modifyCSSClass("pregnancy-warning", "highlight");
  
  // Add relevant Supporting Material
  addNewContent("warnings", pregnancySupportMaterialLink);
  
  // Collapse non-relevant sections
  modifyCSSClass("breastfeeding-only", "collapse");
}
```

## Regulatory Constraints

**Critical Limitation**: Lenses **cannot**:
- Remove original [ePI](./epi.md) content
- Change approved text
- Delete HTML elements

They can only:
- Modify CSS classes for visual presentation
- Add supplementary HTML elements

## Performance Requirements

### Client-Side Execution
- Must run efficiently on patient phones
- Lightweight algorithms only
- No heavy computation

### Server-Side Execution
- Must scale for many concurrent users
- Fast response times required
- Ephemeral (not cached)

### Design Principle
**Rely on [Preprocessors](./preprocessor.md) for heavy computation** (NLP, semantic analysis). Lenses execute lightweight logic based on preprocessor annotations.

## Lens Types

- **Clinical Lenses**: Based on medical conditions
- **Demographic Lenses**: Age, gender-specific
- **Preference Lenses**: Language, literacy level
- **Summary Lenses**: Provide condensed views
- **Multimedia Lenses**: Add rich media content

## Related Concepts

- [LEE](./lee.md) - Execution environment
- [p(ePI)](./p-epi.md) - Input content
- [f(ePI)](./f-epi.md) - Output result
- [IPS](./ips.md) - Patient data input
- [Persona Vector](./persona-vector.md) - Context input
- [Attention Modification](./attention-modification.md) - Visual changes
- [Focusing](./focusing.md) - Overall process
