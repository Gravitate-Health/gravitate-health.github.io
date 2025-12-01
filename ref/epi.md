---
sidebar_position: 21
title: ePI (Electronic Product Information)
tags: [data-model, epi, fhir, regulated-content]
---

# Electronic Product Information (ePI)

**ePI** (Electronic Product Information) is a digital document standardized in FHIR format (FHIR ePI IG) that contains regulated and scientifically validated medicinal product information.

## Content

The ePI includes the **Patient Information Leaflet (PIL)**, providing:
- Medicinal product description
- Indications and contraindications
- Dosage and administration instructions
- Side effects and warnings
- Storage and handling information

## Standardization

ePI follows the [HL7 FHIR ePI Implementation Guide](https://build.fhir.org/ig/HL7/emedicinal-product-info/):
- Structured as [ePI Bundles](./epi-bundle.md)
- Uses Composition resource for narrative content
- Contains embedded HTML for rendering

## Regulatory Nature

ePI content is:
- **Highly regulated**: Approved by authorities
- **Legally binding**: Considered legal text
- **Immutable**: Cannot be removed or altered by [Focusing](./focusing.md)

## Processing States

### Raw ePI
Original ePI as retrieved from Trusted Sources via [Connectors](./connectors.md).

### Preprocessed ePI ([p(ePI)](./p-epi.md))
ePI after semantic annotation by [Preprocessors](./preprocessor.md), with [standard terminologies](./standard-terminologies.md) embedded.

### Focused ePI ([f(ePI)](./f-epi.md))
Final personalized output after [Lens](./lens.md) execution, adapted for specific patient context.

## Access

ePIs are:
- Retrieved by [ePI Connectors](./connectors.md)
- Stored in [FHIR Servers](./fhir-server.md)
- Processed by [Focusing Manager](./focusing-manager.md)
- Adapted through [Focusing mechanism](./focusing.md)

## Related Concepts

- [ePI Bundle](./epi-bundle.md) - FHIR container structure
- [Focusing](./focusing.md) - Personalization process
- [Preprocessor](./preprocessor.md) - Semantic annotation
- [Lens](./lens.md) - Adaptation rules
- [p(ePI)](./p-epi.md) - Preprocessed state
- [f(ePI)](./f-epi.md) - Focused output
