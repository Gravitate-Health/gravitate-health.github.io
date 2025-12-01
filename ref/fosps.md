---
sidebar_position: 11
title: FOSPS
tags: [platform, architecture, microservices]
---

# FOSPS (Federated Open-Source Platform and Services)

**FOSPS** is the overall software platform designed using a microservices-based, three-layer architecture to support the [G-lens solution](./g-lens.md).

## Architecture

FOSPS implements a federated architecture organized into [three architectural layers](./architectural-layers.md):

- **App Layer**: Front-end applications for end-users
- **Service Layer**: Core processing components and services
- **Data Layer**: Standardized data sources and storage

## Key Characteristics

### Microservices-Based
Each component is independently deployable and loosely coupled, ensuring agility, scalability, and autonomy.

### Federated Design
FOSPS can be deployed across multiple centers managed by different entities (e.g., national health services) while maintaining interoperable connections between instances.

### Standards-Based
Built on [HL7 FHIR](https://hl7.org/fhir/) standards for maximum interoperability with existing and future healthcare systems.

## Deployment

FOSPS components are deployed using:
- [Kubernetes and Helm Charts](./kubernetes-deployment.md) for orchestration
- [Istio Service Mesh](./istio.md) for network management and security
- [OpenAPI specifications](./openapi.md) for API documentation

## Related Concepts

- [G-lens Solution](./g-lens.md) - The patient-facing solution built on FOSPS
- [Architectural Layers](./architectural-layers.md) - The three-layer structure
- [FHIR Server](./fhir-server.md) - Core data management component
- [Focusing Manager](./focusing-manager.md) - Central orchestration component
