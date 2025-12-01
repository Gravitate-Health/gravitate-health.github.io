---
sidebar_position: 34
title: p(ePI) - Preprocessed ePI
tags: [focusing, epi, preprocessing, annotated-content]
---

# Preprocessed ePI (p(ePI))

**p(ePI)** (Preprocessed ePI) is the intermediate state of an [ePI](./epi.md) after semantic annotations have been embedded by [Preprocessors](./preprocessor.md), preparing it for [Lens](./lens.md) execution.

## Creation Process

Raw [ePI](./epi.md) → [Preprocessor(s)](./preprocessor.md) → **p(ePI)**

[Preprocessors](./preprocessor.md) transform ePI by:
1. Analyzing narrative text
2. Identifying medically relevant sections
3. Linking to [standard terminologies](./standard-terminologies.md)
4. Embedding annotations in FHIR structure

## Structure

p(ePI) retains the [ePI Bundle](./epi-bundle.md) structure but adds:

### HtmlElementLink Extensions
In the Composition resource:

```json
{
  "extension": [{
    "url": "http://hl7.eu/fhir/ig/gravitate-health/StructureDefinition/HtmlElementLink",
    "extension": [{
      "url": "elementClass",
      "valueString": "diabetes-warning"
    }, {
      "url": "concept",
      "valueCodeableConcept": {
        "coding": [{
          "system": "http://snomed.info/sct",
          "code": "73211009",
          "display": "Diabetes mellitus"
        }]
      }
    }]
  }]
}
```

### HTML Class Attributes
In the Composition narrative (text.div):

```html
<p class="diabetes-warning">
  Use with caution in patients with diabetes.
</p>
```

## Stacking

p(ePI) may result from **multiple [Preprocessors](./preprocessor.md)**:
- First preprocessor: ePI → p(ePI)₁
- Second preprocessor: p(ePI)₁ → p(ePI)₂
- Final p(ePI) contains all annotations

## Usage

p(ePI) is consumed by:
- [Lens Execution Environment (LEE)](./lee.md) during [Focusing](./focusing.md)
- [Lenses](./lens.md) for decision logic
- [Focusing Inspector](./focusing-inspector.md) for visualization

## Key Characteristics

- **Original content preserved**: Text unchanged from [ePI](./epi.md)
- **Semantically enriched**: Linked to medical concepts
- **Machine-readable**: Annotations enable automated processing
- **Lens-ready**: Prepared for [attention modification](./attention-modification.md)

## Examples

See [Gravitate-Health IG processed ePI examples](https://build.fhir.org/ig/hl7-eu/gravitate-health/artifacts.html#processed-epi).

## Related Concepts

- [ePI](./epi.md) - Original content
- [Preprocessor](./preprocessor.md) - Creates p(ePI)
- [Lens](./lens.md) - Consumes p(ePI)
- [LEE](./lee.md) - Processes p(ePI)
- [Standard Terminologies](./standard-terminologies.md) - Annotation codes
- [f(ePI)](./f-epi.md) - Next stage output
- [Focusing](./focusing.md) - Overall workflow
