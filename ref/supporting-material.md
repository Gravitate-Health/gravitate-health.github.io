---
sidebar_position: 25
title: Supporting Material
tags: [data-model, supporting-material, aRMM, HEM]
---

# Supporting Material (SM)

**Supporting Material** is a broad term encompassing both regulated **Additional Risk Minimization Measures (aRMM)** and non-regulated **Health Education Material (HEM)**, intended to complement the [ePI](./epi.md).

## Types of Supporting Material

### Additional Risk Minimization Measures (aRMM)
- **Regulated content** from authorities
- Mandatory for certain high-risk medications
- Additional safety information beyond [ePI](./epi.md)
- Examples: Patient alert cards, prescriber checklists

### Health Education Material (HEM)
- **Non-regulated content** from trusted sources
- General health education
- Disease management guides
- Medication adherence tools
- Examples: Videos, infographics, interactive content

## FHIR Representation

Supporting Material metadata is stored using the [Additional Support Material Profile](https://build.fhir.org/ig/hl7-eu/gravitate-health/StructureDefinition-AdditionalSupportMaterial.html):
- Based on `DocumentReference` resource
- Contains source information
- Includes language metadata
- Links to [standard terminologies](./standard-terminologies.md)

## Matchmaking

The [Supporting Material Matchmaking](./sm-matchmaking.md) process:
1. Takes [ePI](./epi.md), [IPS](./ips.md), and [PV](./persona-vector.md) as input
2. Returns relevant SM matching:
   - Patient conditions
   - Medication terms
   - Language preferences
   - Health literacy level

## Management

Managed through:
- [Supporting Material Tool (SM Tool)](./sm-tool.md) for curation
- [Annotation Tool](./annotation-tool.md) for semantic tagging
- [FHIR Server](./fhir-server.md) for storage
- [Connectors](./connectors.md) for retrieval

## Integration with Focusing

[Lenses](./lens.md) can:
- Add hyperlinks to relevant SM
- Embed SM content (images, videos)
- Suggest SM based on patient context

## Related Concepts

- [ePI](./epi.md) - Primary medicinal information
- [Supporting Material Matchmaking](./sm-matchmaking.md) - Selection process
- [SM Tool](./sm-tool.md) - Management interface
- [IPS](./ips.md) - Patient context
- [Persona Vector](./persona-vector.md) - User preferences
- [Standard Terminologies](./standard-terminologies.md) - Semantic linking
