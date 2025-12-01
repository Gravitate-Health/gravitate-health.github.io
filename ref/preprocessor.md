---
sidebar_position: 33
title: Preprocessor
tags: [focusing, preprocessing, semantic-annotation, service]
---

# Preprocessor

A **Preprocessor** is a pluggable service that semantically annotates raw [ePIs](./epi.md) using [standard terminologies](./standard-terminologies.md) (like SNOMED-CT or ICPC-2) to generate a [Preprocessed ePI (p(ePI))](./p-epi.md).

## Purpose

Preprocessors transform raw [ePI](./epi.md) into [p(ePI)](./p-epi.md) by:
- Reading ePI narrative text
- Identifying medically relevant sections
- Annotating with [standard terminology](./standard-terminologies.md) codes
- Embedding annotations as HTML class attributes

## Technical Implementation

### Required Endpoint
Must implement `/preprocess` REST endpoint:
- **Input**: ePI Bundle (FHIR JSON)
- **Output**: p(ePI) Bundle (FHIR JSON)
- **Specification**: [OpenAPI definition](https://github.com/Gravitate-Health/preprocessing-service-example/blob/main/openapi.yaml)

### Service Discovery
Must be deployed with Kubernetes label:
```yaml
eu.gravitate-health.fosps.preprocessing=true
```

This enables [Focusing Manager](./focusing-manager.md) auto-discovery.

### Containerization
- Packaged as Docker containers
- Deployed via [Kubernetes](./kubernetes-deployment.md)
- Language/framework agnostic

## Annotation Mechanism

### 1. Add HtmlElementLink Extensions
Preprocessors add [HtmlElementLink](https://build.fhir.org/ig/hl7-eu/gravitate-health/StructureDefinition-HtmlElementLink.html) extensions to the Composition:

```json
{
  "extension": [{
    "url": "elementClass",
    "valueString": "pregnancy-warning"
  }, {
    "url": "concept",
    "valueCodeableConcept": {
      "coding": [{
        "system": "http://snomed.info/sct",
        "code": "77386006"
      }]
    }
  }]
}
```

### 2. Modify HTML Narrative
Add class attributes to HTML tags in Composition.text.div:

```html
<p class="pregnancy-warning">
  Do not use during pregnancy.
</p>
```

## Stacking Support

Preprocessors must handle **stacking**:
- Input may already be [p(ePI)](./p-epi.md) from previous preprocessor
- Avoid duplicate annotations
- Append to existing class attributes (don't nest tags)
- Check for existing HtmlElementLink extensions

## HTML Modification Rules

**Allowed**:
- Adding HTML class attributes
- Wrapping text in `<span>` tags
- Adding classes to existing tags (`<p>`, `<h1>`, `<li>`, etc.)

**Prohibited**:
- Removing content
- Changing narrative text
- Deleting HTML elements
- Modifying approved wording

## Performance Considerations

Preprocessors should handle:
- **Heavy computation**: NLP models, semantic analysis
- **Slow operations**: External API calls, database lookups

This allows [Lenses](./lens.md) to remain lightweight and fast.

## Related Concepts

- [p(ePI)](./p-epi.md) - Output format
- [ePI](./epi.md) - Input content
- [Standard Terminologies](./standard-terminologies.md) - Annotation codes
- [Focusing Manager](./focusing-manager.md) - Orchestrator
- [Lens](./lens.md) - Consumes annotations
- [Focusing](./focusing.md) - Overall workflow
