---
sidebar_position: 22
title: ePI Bundle
tags: [data-model, epi, fhir, bundle]
---

# ePI Bundle (FHIR Resource)

An **ePI Bundle** is the FHIR container resource used to group the `Composition` and other related resources to reproduce the local label template in a semi-structured format.

## Structure

The ePI Bundle contains:
- **Composition**: Core resource with narrative text and metadata
- **Organization**: Manufacturer and regulatory authority information
- **MedicinalProductDefinition**: Product identification
- **AdministrableProductDefinition**: Dosage forms
- **Ingredient**: Active substances
- **ClinicalUseDefinition**: Indications, contraindications, warnings

## Composition Resource

The Composition is the central resource containing:
- **Narrative text**: HTML content with [PIL](./epi.md) sections
- **Sections**: Structured division of content
- **Extensions**: Including [HtmlElementLink](./p-epi.md) for annotations
- **Metadata**: Language, status, date

## FHIR Standard

Follows the [FHIR ePI Implementation Guide](https://build.fhir.org/ig/HL7/emedicinal-product-info/):
- Bundle type: `document`
- First entry: Composition resource
- Referenced resources included

## Usage in FOSPS

ePI Bundles are:
- Retrieved by [Connectors](./connectors.md)
- Stored in [FHIR Server](./fhir-server.md)
- Processed by [Preprocessors](./preprocessor.md)
- Consumed by [Lenses](./lens.md) via [LEE](./lee.md)

## Related Concepts

- [ePI](./epi.md) - Electronic Product Information
- [FHIR Server](./fhir-server.md) - Storage location
- [Connectors](./connectors.md) - Retrieval mechanism
- [Preprocessor](./preprocessor.md) - Annotation process
- [p(ePI)](./p-epi.md) - Annotated version
