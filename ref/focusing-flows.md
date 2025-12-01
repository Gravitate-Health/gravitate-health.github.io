---
sidebar_position: 39
title: Focusing Flows
tags: [focusing, api, workflow-patterns]
---

# Focusing Flows

**Focusing Flows** are the four defined methods for invoking the [Focusing](./focusing.md) process in [FOSPS](./fosps.md), based on how [ePI](./epi.md) and [IPS](./ips.md)/[PV](./persona-vector.md) data are provided.

## The Four Flows

### Flow 1: ePI ID + IPS ID
**Request contains**: Resource identifiers

```json
{
  "epiId": "bundle-epi-123",
  "ipsId": "bundle-ips-456"
}
```

**Process**:
1. [Focusing Manager](./focusing-manager.md) retrieves ePI from [FHIR Server](./fhir-server.md)
2. Retrieves IPS from FHIR Server
3. Retrieves PV from FHIR Server (if available)
4. Invokes [Preprocessors](./preprocessor.md) for [p(ePI)](./p-epi.md)
5. Calls [LEE](./lee.md) for [f(ePI)](./f-epi.md)

**Use case**: Both resources already cached in platform

---

### Flow 2: ePI JSON + IPS JSON
**Request contains**: Full FHIR resources

```json
{
  "epi": { "resourceType": "Bundle", ... },
  "ips": { "resourceType": "Bundle", ... },
  "pv": { "resourceType": "Bundle", ... }
}
```

**Process**:
1. [Focusing Manager](./focusing-manager.md) receives complete resources
2. Invokes [Preprocessors](./preprocessor.md) for [p(ePI)](./p-epi.md)
3. Calls [LEE](./lee.md) for [f(ePI)](./f-epi.md)

**Use case**: Client-side focusing, external data sources, privacy-preserving workflows

---

### Flow 3: ePI ID + IPS JSON
**Request contains**: Mixed identifiers and resources

```json
{
  "epiId": "bundle-epi-123",
  "ips": { "resourceType": "Bundle", ... }
}
```

**Process**:
1. [Focusing Manager](./focusing-manager.md) retrieves ePI from [FHIR Server](./fhir-server.md)
2. Uses provided IPS JSON
3. Invokes [Preprocessors](./preprocessor.md) for [p(ePI)](./p-epi.md)
4. Calls [LEE](./lee.md) for [f(ePI)](./f-epi.md)

**Use case**: ePI cached, IPS from external system

---

### Flow 4: ePI JSON + IPS ID
**Request contains**: Mixed resources and identifiers

```json
{
  "epi": { "resourceType": "Bundle", ... },
  "ipsId": "bundle-ips-456"
}
```

**Process**:
1. [Focusing Manager](./focusing-manager.md) uses provided ePI JSON
2. Retrieves IPS from [FHIR Server](./fhir-server.md)
3. Invokes [Preprocessors](./preprocessor.md) for [p(ePI)](./p-epi.md)
4. Calls [LEE](./lee.md) for [f(ePI)](./f-epi.md)

**Use case**: ePI from external source, IPS cached in platform

---

## Common Elements

All flows:
- Support optional [Persona Vector](./persona-vector.md) input
- Return [f(ePI)](./f-epi.md) as output
- Execute via [Focusing Manager](./focusing-manager.md) API
- Follow same preprocessing and lens execution steps

## API Design

Flows exposed via [OpenAPI](./openapi.md) documented endpoints:

```
POST /focusing/flow1
POST /focusing/flow2
POST /focusing/flow3
POST /focusing/flow4
```

Or unified endpoint with request body discrimination:

```
POST /focusing
```

## Selection Criteria

Choose flow based on:
- **Data location**: Cached vs. external
- **Privacy requirements**: Keep IPS client-side
- **Performance**: Avoid unnecessary transfers
- **Integration**: Match external system capabilities

## Related Concepts

- [Focusing](./focusing.md) - Overall process
- [Focusing Manager](./focusing-manager.md) - Orchestrator
- [ePI](./epi.md) - Product information
- [IPS](./ips.md) - Patient data
- [Persona Vector](./persona-vector.md) - User context
- [f(ePI)](./f-epi.md) - Output
- [FHIR Server](./fhir-server.md) - Resource storage
