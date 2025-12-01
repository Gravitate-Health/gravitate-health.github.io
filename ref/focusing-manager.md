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
- Identifies available [Lenses](./lens.md) from [FHIR Server](./fhir-server.md)

### 2. Workflow Orchestration
1. Receives [Focusing flows](./focusing-flows.md) requests
2. Retrieves raw [ePI](./epi.md) if needed
3. Invokes [Preprocessors](./preprocessor.md) in sequence
4. Selects appropriate [Lenses](./lens.md)
5. Calls [LEE](./lee.md) with [p(ePI)](./p-epi.md), [IPS](./ips.md), [PV](./persona-vector.md)
6. Returns [f(ePI)](./f-epi.md) to requester

### 3. Data Management
- Queries [FHIR Server](./fhir-server.md) for resources
- Coordinates with [Connectors](./connectors.md) for external data
- Manages preprocessor stacking (sequential execution)

### 4. Lens Selection
- Determines which [Lenses](./lens.md) to apply
- Considers patient context ([IPS](./ips.md)/[PV](./persona-vector.md))
- Manages lens execution order

## Architecture Position

Located in the [Service Layer](./architectural-layers.md) of [FOSPS](./fosps.md).

## API Endpoints

Exposes [OpenAPI](./openapi.md) documented endpoints for:
- Initiating [Focusing flows](./focusing-flows.md)
- Status and health checks
- Configuration management

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
- [Focusing Flows](./focusing-flows.md) - Request patterns
- [FOSPS](./fosps.md) - Platform architecture
