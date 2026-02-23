---
sidebar_position: 32
title: Focusing Manager
tags: [focusing, service-layer, orchestration, manager]
---

# Focusing Manager

The **Focusing Manager** is the central orchestration component of the [Focusing](./focusing.md) module that coordinates all steps of the personalization workflow.

## Responsibilities

### 1. Service Discovery
- Discovers [Preprocessors](./preprocessor.md) via Kubernetes labels:
  ```yaml
  eu.gravitate-health.fosps.preprocessing=true
  ```
- Identifies available Lens selectors (which retrieve and list available [Lenses](./lens.md)) via Kubernetes labels:
  ```yaml
  eu.gravitate-health.fosps.focusing=true
  ```

### 2. Workflow Orchestration
1. Receives requests to initiate focusing with necessary data (ePI, IPS, PV) in various methods/formats (IDs, JSON, XML, turtle)
2. Retrieves referenced resources if needed
3. Invokes [Preprocessors](./preprocessor.md) in sequence
4. Selects/discovers [Lenses](./lens.md)
5. Calls [LEE](./lee.md) with [p(ePI)](./p-epi.md), [IPS](./ips.md), [PV](./persona-vector.md) if provided
6. Returns [f(ePI)](./f-epi.md) to requester in the desired format

### 3. Data Management
- Queries [FHIR Server](./fhir-server.md) for resources if referenced by ID
- Manages preprocessor stacking (sequential execution)
- Caches preprocessed data if needed for performance (different layers of caching can be implemented: in memory, Redis, etc.)
- Handles LEE execution context and data passing
- Transforms and formats data as needed for different steps (e.g., converting between JSON and XML when needed)


The Focusing Manager supports different input, output formats and invocation methods, allowing for flexible integration into various user interfaces and workflows. The core requirement is that the necessary data (ePI, IPS, optionally PV) is provided in a format that the focusing process can consume:

|                                                          |     ePI                                                                                                                                                          |     IPS                                                                                                                       |     PV (optional)                                                                                                            |
|----------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------|
|     Implicit (referenced)  in http post parameter        |     `epiId`  (retrieved from   FHIR_EPI_URL endpoint) |     `patientIdentifier` (retrieved from   FHIR_IPS_URL endpoint) |     `personaVectorID`  (retrieved from   PERSONA_VECTOR_URL endpoint)                              |
|     Implicit (referenced)  as URL parameter              |     `/focusing/focus/{epiId}` (retrieved from   FHIR_EPI_URL endpoint) |  |                               |
|     Explicit Serialized in the post body. by setting `Content-Type` http header select the format     |     `epi`  (if ips and pv are referenced) |     `ips` (if epi and pv are referenced)                        |     `pv` (if epi and ips are referenced)                        |
|     Explicit Serialized in multipart post body, by setting `Content-Type` http header for each part/file select the format                                 |     `epi` |     `ips`     |     `pv`     |

Additionally an Explicit legacy JSON can be provided in the post body. This is A JSON object with `epi`, `ips`, and (optionally) `pv` attributes, each with their respective JSON representation.

```
{
  "epi": { ... },
  "ips": { ... },
  "pv": { ... }
}
```

By setting the `Accept` header in the request, the client can specify the desired output format (e.g., JSON, XML, Turtle) for the focused ePI response.

Acceptable content types for input and output include:
  - JSON: `application/fhir+json`, `application/json`,
  - XML: `application/fhir+xml`, `application/xml`,
  - RDF/turtle: `application/fhir+turtle`, `text/turtle`, `text/n3`,


## Architecture Position

Located in the [Service Layer](./architectural-layers.md) of [FOSPS](./fosps.md).

## API Endpoints

Exposes [OpenAPI](./openapi.md) documented endpoints for:
- focusing 
- retrieving available preprocessors and lenses
- retrieve [p(ePI)](./p-epi.md) by executing preprocessors (if not cached already) without focusing 
- Status and health checks

## Integration Points

- **[Preprocessors](./preprocessor.md)**: Discovers and invokes via REST
- **[LEE](./lee.md)**: Calls for lens execution
- **[FHIR Server](./fhir-server.md)**: Retrieves/stores resources
- **[Connectors](./connectors.md)**: Fetches external data
- **[Istio](./istio.md)**: Exposed via VirtualService

## Stacking Logic

Manages [Preprocessor](./preprocessor.md) stacking:
- Executes preprocessors sequentially
- Each preprocessor receives output of previous
- Builds complete [p(ePI)](./p-epi.md) with all annotations

## Related Concepts

- [Focusing](./focusing.md) - Overall process
- [Preprocessor](./preprocessor.md) - Discovered services
- [Lens](./lens.md) - Selected algorithms
- [LEE](./lee.md) - Execution component
- [FOSPS](./fosps.md) - Platform architecture
