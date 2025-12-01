---
sidebar_position: 24
title: Persona Vector
tags: [data-model, persona-vector, patient-context, preferences]
---

# Persona Vector (PV)

The **Persona Vector** is a standardization element designed to codify and standardize the context and preferences of the user, supplementing the [IPS](./ips.md) for use in the [Focusing mechanism](./focusing.md).

## Purpose

The Persona Vector extends [IPS](./ips.md) by capturing:
- Demographics (age, gender)
- Physiological states (pregnancy, breastfeeding)
- Cultural context
- Language preferences
- Health literacy level
- Accessibility needs

## Structure

Implemented as a FHIR resource based on the [Persona Dimension Collection profile](https://build.fhir.org/ig/hl7-eu/gravitate-health/StructureDefinition-persona-collection.html).

## Usage in Focusing

The [Lens Execution Environment (LEE)](./lee.md) uses PV to:
- Determine relevance of [ePI](./epi.md) sections
- Apply [attention detail modifications](./attention-modification.md)
- Select appropriate [Supporting Material](./supporting-material.md)
- Adapt content presentation style

## Example Use Cases

### Pregnancy Status
- Highlight pregnancy warnings in [ePI](./epi.md)
- Filter contraindications
- Show relevant precautions

### Age-Based
- Adapt pediatric vs. adult dosing information
- Highlight age-specific warnings
- Adjust language complexity

### Language & Literacy
- Match [Supporting Material](./supporting-material.md) language
- Adjust technical terminology level
- Provide pictograms or videos

## Data Sources

PV data may come from:
- User-provided preferences
- [IPS](./ips.md) clinical data
- Application settings
- [Connectors](./connectors.md) to external systems

## Related Concepts

- [IPS](./ips.md) - Clinical health summary
- [Focusing](./focusing.md) - Personalization mechanism
- [Lens](./lens.md) - Uses PV for decisions
- [LEE](./lee.md) - PV consumer
- [Supporting Material Matchmaking](./sm-matchmaking.md) - Uses PV
