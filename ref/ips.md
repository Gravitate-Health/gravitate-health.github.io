---
sidebar_position: 23
title: IPS (International Patient Summary)
tags: [data-model, ips, fhir, patient-data]
---

# International Patient Summary (IPS)

The **IPS** (International Patient Summary) is an electronic health record extract containing essential healthcare information about a patient, used as context for personalization in [FOSPS](./fosps.md).

## Purpose

IPS provides patient-specific clinical data for:
- [Focusing mechanism](./focusing.md) personalization
- [Lens](./lens.md) decision-making logic
- Matching with [ePI](./epi.md) conditions and warnings
- [Supporting Material matchmaking](./sm-matchmaking.md)

## Content

The IPS includes:
- **Allergies and intolerances**
- **Current medications**
- **Medical problems and conditions**
- **Immunizations**
- **Medical devices**
- **Diagnostic results**
- **Procedures**
- **Functional status**

## FHIR Standard

Follows the [HL7 FHIR IPS Implementation Guide](https://build.fhir.org/ig/HL7/fhir-ips/):
- Bundle type: `document`
- Composition with required sections
- Referenced clinical resources

## Supplementation

The [Persona Vector (PV)](./persona-vector.md) extends IPS by codifying:
- Age and gender
- Pregnancy status
- Cultural context
- Language preferences
- Health literacy level

## Privacy Considerations

IPS contains **sensitive patient data**:
- Stored securely in [FHIR Server](./fhir-server.md)
- Retrieved by [IPS Connectors](./connectors.md)
- Protected by [Keycloak](./keycloak.md) authentication
- Tracked by [Audit Log](./audit-log.md)

## Usage in Focusing

The [Lens Execution Environment (LEE)](./lee.md) uses IPS to:
1. Match patient conditions with [ePI](./epi.md) warnings
2. Determine [attention detail modification](./attention-modification.md)
3. Generate personalized [f(ePI)](./f-epi.md)

## Related Concepts

- [Focusing](./focusing.md) - Personalization process
- [Lens](./lens.md) - Uses IPS for decisions
- [Persona Vector](./persona-vector.md) - IPS extension
- [LEE](./lee.md) - IPS consumer
- [ePI](./epi.md) - Content being personalized
