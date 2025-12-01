---
sidebar_position: 52
title: SM Tool (Supporting Material)
tags: [tools, app-layer, content-management]
---

# Supporting Material Tool (SM Tool)

The **Supporting Material Tool** is a proposed tool designed to facilitate the management, curation, and matchmaking of [Supporting Material](./supporting-material.md) (SM/aRMM/HEM) to patient profiles and [IPS](./ips.md).

## Purpose

Enables content managers to:
- Upload and manage [Supporting Material](./supporting-material.md)
- Tag content with [standard terminologies](./standard-terminologies.md)
- Define target audiences
- Preview matchmaking results
- Maintain content lifecycle

## Features

### Content Management

#### Upload
- Documents (PDF, HTML)
- Videos (MP4, WebM)
- Images (PNG, JPEG, SVG)
- Interactive content (web apps)

#### Metadata Definition
- Title and description
- Language and locale
- Target conditions (SNOMED-CT codes)
- Target demographics (age, gender, pregnancy)
- Content type (aRMM vs. HEM)
- Authority source

### Semantic Tagging

Link content to:
- [Standard terminologies](./standard-terminologies.md) (SNOMED-CT, ICPC-2)
- [ePI](./epi.md) sections
- Medical concepts
- Medication types

Uses [Annotation Tool](./annotation-tool.md) integration for semi-automated tagging.

### Matchmaking Preview

Test [Supporting Material Matchmaking](./sm-matchmaking.md):
- Select test [IPS](./ips.md)
- Define [Persona Vector](./persona-vector.md)
- Preview matched content
- Adjust relevance scoring

### Content Lifecycle

- **Draft**: Work in progress
- **Review**: Pending approval
- **Published**: Active and discoverable
- **Archived**: Retained but not matched
- **Deprecated**: Replaced by newer version

### Version Control

- Track content versions
- Compare revisions
- Rollback if needed
- Maintain [Provenance](./provenance.md)

## FHIR Integration

Creates [Additional Support Material Profile](https://build.fhir.org/ig/hl7-eu/gravitate-health/StructureDefinition-AdditionalSupportMaterial.html) resources:
- DocumentReference with metadata
- Attachments or URLs
- CodeableConcept links
- [Provenance](./provenance.md) records

## User Roles

### Content Curator
- Upload and tag content
- Define metadata
- Submit for review

### Approver
- Review submissions
- Validate tagging accuracy
- Publish or reject

### Administrator
- Manage user permissions
- Configure matchmaking rules
- Monitor usage analytics

## Integration

Connects to:
- [FHIR Server](./fhir-server.md) for storage
- [Supporting Material Matchmaking](./sm-matchmaking.md) API
- [Annotation Tool](./annotation-tool.md) for tagging
- [CTF](./ctf.md) for signing
- [Keycloak](./keycloak.md) for access control

## Analytics

Provides insights on:
- Content usage frequency
- Matchmaking success rates
- User engagement metrics
- Content gaps (unmatched conditions)

## Related Concepts

- [Supporting Material](./supporting-material.md) - Managed content
- [SM Matchmaking](./sm-matchmaking.md) - Selection algorithm
- [Annotation Tool](./annotation-tool.md) - Tagging assistant
- [Standard Terminologies](./standard-terminologies.md) - Semantic codes
- [IPS](./ips.md) - Patient context
- [Persona Vector](./persona-vector.md) - User preferences
