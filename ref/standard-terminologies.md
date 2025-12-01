---
sidebar_position: 26
title: Standard Terminologies
tags: [data-model, terminologies, snomed-ct, icpc-2, semantic-annotation]
---

# Standard Terminologies

**Standard Terminologies** are the common language used within [FOSPS](./fosps.md) to semantically annotate content and ensure interoperability across services.

## Primary Terminologies

### SNOMED-CT (Systematized Nomenclature of Medicine Clinical Terms)
- **Purpose**: Clinical concepts and procedures
- **Usage**: Medical conditions, symptoms, procedures
- **Example**: Pregnancy (code: 77386006)

### ICPC-2 (International Classification of Primary Care version 2)
- **Purpose**: Primary care classification
- **Usage**: Symptoms, diagnoses, interventions
- **Example**: Pregnancy (code: W78)

## Additional Terminologies

- **LOINC**: Laboratory and clinical observations
- **ATC**: Anatomical Therapeutic Chemical classification
- **ICD**: International Classification of Diseases
- **RxNorm**: Medication nomenclature

## Usage in FOSPS

### Preprocessing
[Preprocessors](./preprocessor.md) use terminologies to:
- Annotate [ePI](./epi.md) narrative text
- Create semantic links via [HtmlElementLink](./p-epi.md)
- Generate [p(ePI)](./p-epi.md) with embedded codes

### Focusing
[Lenses](./lens.md) use terminology codes to:
- Match [IPS](./ips.md) conditions with [ePI](./epi.md) sections
- Determine [attention detail modifications](./attention-modification.md)
- Apply highlighting or collapsing logic

### Matchmaking
[Supporting Material Matchmaking](./sm-matchmaking.md) uses terminologies to:
- Link SM to relevant conditions
- Match patient [IPS](./ips.md)/[PV](./persona-vector.md) with content
- Filter by medical concepts

## HtmlElementLink Extension

Terminologies are embedded in FHIR using the [HtmlElementLink extension](https://build.fhir.org/ig/hl7-eu/gravitate-health/StructureDefinition-HtmlElementLink.html):

```json
{
  "extension": [{
    "url": "elementClass",
    "valueString": "pregnancy-category"
  }, {
    "url": "concept",
    "valueCodeableConcept": {
      "coding": [{
        "system": "http://snomed.info/sct",
        "code": "77386006",
        "display": "Pregnancy"
      }]
    }
  }]
}
```

## Benefits

- **Interoperability**: Common language across systems
- **Semantic precision**: Unambiguous concept identification
- **Automatic processing**: Machine-readable annotations
- **Multilinguality**: Concept codes transcend language barriers

## Related Concepts

- [Preprocessor](./preprocessor.md) - Applies terminologies
- [p(ePI)](./p-epi.md) - Contains terminology annotations
- [Lens](./lens.md) - Interprets terminology codes
- [Supporting Material](./supporting-material.md) - Tagged with terminologies
- [ePI](./epi.md) - Annotated content
