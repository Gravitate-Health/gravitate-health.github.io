---
sidebar_position: 16
title: Kubernetes & Helm
tags: [platform, deployment, kubernetes, helm]
---

# Kubernetes Deployment & Helm Charts

[FOSPS](./fosps.md) uses **Kubernetes (k8s)** as the underlying orchestration technology and **Helm Charts** as the packaging system for deploying components.

## Kubernetes (k8s)

**Kubernetes** provides:
- Container orchestration
- Service discovery
- Load balancing
- Self-healing capabilities
- Horizontal scaling

## Helm Charts

**Helm Charts** are used to:
- Package FOSPS components
- Define deployment configurations
- Manage dependencies
- Version control deployments

## Service Discovery Labels

FOSPS uses Kubernetes labels for auto-discovery of components:

### Preprocessor Discovery
```yaml
eu.gravitate-health.fosps.preprocessing=true
```
Used by [Focusing Manager](./focusing-manager.md) to discover [Preprocessors](./preprocessor.md).

### Connector Discovery
```yaml
eu.gravitate-health.fosps.connector=true
```
Used to identify [Connectors](./connectors.md) for data retrieval.

## Deployment Architecture

All [architectural layers](./architectural-layers.md) are deployed via Kubernetes:
- **App Layer**: Frontend deployments with ingress rules
- **Service Layer**: Microservices with service mesh integration
- **Data Layer**: Stateful sets for [FHIR Servers](./fhir-server.md)

## Network Management

Kubernetes networking is enhanced by [Istio Service Mesh](./istio.md) for:
- Traffic control
- Security policies
- Service-to-service communication

## Related Concepts

- [FOSPS](./fosps.md) - Overall platform
- [Istio](./istio.md) - Service mesh layer
- [Architectural Layers](./architectural-layers.md) - Component structure
- [Preprocessor](./preprocessor.md) - Discoverable services
- [Connectors](./connectors.md) - Discoverable modules
