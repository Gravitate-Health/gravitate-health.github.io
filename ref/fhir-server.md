---
sidebar_position: 14
title: FHIR Server
tags: [platform, data-layer, fhir, storage]
---

# FHIR Server

The **FHIR Server** is an internal component of [FOSPS](./fosps.md), often implemented using the HAPI FHIR JPA Server Starter, responsible for managing FHIR resources.

## Purpose

Stores and manages standardized healthcare data in the [Data Layer](./architectural-layers.md), including:
- Cached [ePIs](./epi.md)
- [International Patient Summaries (IPS)](./ips.md)
- [Provenance records](./provenance.md)
- [Lenses](./lens.md)
- [Supporting Material](./supporting-material.md) metadata

## Implementation

Typically based on **HAPI FHIR JPA Server Starter**, which provides:
- Full FHIR R5 compliance
- REST API for CRUD operations
- Search capabilities
- Transaction support
- Validation

## Access Patterns

Resources are accessed through:
- [Connectors](./connectors.md) for external data retrieval
- [Focusing Manager](./focusing-manager.md) during focusing workflows
- Direct REST API calls from applications

## Data Types Stored

- **[ePI Bundles](./epi-bundle.md)**: Medicinal product information
- **IPS Bundles**: Patient health summaries
- **Library Resources**: [Lens](./lens.md) code packages
- **DocumentReference**: [Supporting Material](./supporting-material.md) metadata
- **Provenance**: [CTF](./ctf.md) tracking records

## Related Concepts

- [FOSPS](./fosps.md) - Overall platform
- [Architectural Layers](./architectural-layers.md) - Three-layer structure
- [Connectors](./connectors.md) - Data retrieval modules
- [ePI](./epi.md) - Medicinal product information
