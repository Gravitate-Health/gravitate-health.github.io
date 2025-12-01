---
sidebar_position: 15
title: Connectors
tags: [platform, service-layer, data-integration, connectors]
---

# Connectors

**Connectors** are modules responsible for modularizing access to external Trusted Sources of Information (TSI) and performing necessary format transformations into FHIR format.

## Types of Connectors

### FHIR Connector (Generic)
Base connector providing standard FHIR resource access patterns.

### ePI Connector
Specialized connector for retrieving [Electronic Product Information (ePI)](./epi.md) from various sources.

### IPS Connector
Specialized connector for accessing [International Patient Summary (IPS)](./ips.md) data.

## Responsibilities

1. **Data Retrieval**: Fetch resources from external Trusted Sources
2. **Format Transformation**: Convert data to FHIR standard format
3. **Provenance Generation**: Create [provenance statements](./provenance.md) for retrieved resources
4. **Caching**: Optimize queries through local caching mechanisms

## Service Discovery

Connectors are auto-discovered by [FOSPS](./fosps.md) through Kubernetes labels:

```yaml
eu.gravitate-health.fosps.connector=True
```

## Operation Modes

- **fhs-git**: Sync from Git repositories
- **HAPI FHIR sync**: Sync from other FHIR servers
- **FHIR proxy**: Act as proxy for FHIR resources

## Architecture

Connectors operate in the [Service Layer](./architectural-layers.md), bridging external data sources with the internal [FHIR Server](./fhir-server.md).

## Related Concepts

- [FOSPS](./fosps.md) - Platform architecture
- [FHIR Server](./fhir-server.md) - Target storage
- [ePI](./epi.md) - Product information
- [IPS](./ips.md) - Patient summaries
- [Provenance](./provenance.md) - Traceability records
