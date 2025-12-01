---
sidebar_position: 13
title: Architectural Layers
tags: [platform, architecture, layers]
---

# Architectural Layers

[FOSPS](./fosps.md) is structured using a three-layer architecture that separates concerns and enables modularity.

## The Three Layers

### 1. App Layer

The front-end layer containing:
- Patient-facing applications
- Healthcare professional (HCP) interfaces
- Administrator web interfaces
- Developer tools and dashboards

**Examples:**
- [Focusing Inspector](./focusing-inspector.md)
- [Supporting Material Tool](./sm-tool.md)
- [CTF Inspector](./ctf-inspector.md)

### 2. Service Layer

The core operations layer housing:
- Processing and analysis components
- AI services and [NLP services](./nlp-services.md)
- [Connectors](./connectors.md) to data sources
- Orchestration services

**Key Components:**
- [Focusing Manager](./focusing-manager.md)
- [Preprocessors](./preprocessor.md)
- [Lens Execution Environment (LEE)](./lee.md)
- [Content Trust Framework (CTF)](./ctf.md)

### 3. Data Layer

The storage layer containing:
- [FHIR Servers](./fhir-server.md) for standardized resources
- Sensitive data (e.g., patient [IPS](./ips.md))
- Non-sensitive data (e.g., public [ePI](./epi.md))
- [Lenses](./lens.md) and [Supporting Material](./supporting-material.md)

## Benefits of This Architecture

- **Separation of Concerns**: Each layer has distinct responsibilities
- **Scalability**: Layers can scale independently
- **Modularity**: Components can be developed and deployed separately
- **Flexibility**: Easy to swap implementations within layers

## Deployment

Each layer is deployed using:
- [Kubernetes](./kubernetes-deployment.md) for orchestration
- [Istio](./istio.md) for service mesh
- [Helm Charts](./kubernetes-deployment.md) for packaging

## Related Concepts

- [FOSPS](./fosps.md) - Overall platform architecture
- [Focusing Manager](./focusing-manager.md) - Service layer orchestration
- [FHIR Server](./fhir-server.md) - Data layer storage
