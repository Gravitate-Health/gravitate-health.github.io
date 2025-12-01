---
sidebar_position: 17
title: Istio Service Mesh
tags: [platform, deployment, service-mesh, networking]
---

# Istio (Service Mesh)

**Istio** is the service mesh used by [FOSPS](./fosps.md) for network management, providing traffic control, security, and acting as the Service Mesh and Gateway.

## Key Functions

### Traffic Management
- Load balancing
- Request routing
- Fault injection
- Circuit breaking
- Timeouts and retries

### Security
- Mutual TLS (mTLS) between services
- Authentication policies
- Authorization policies
- Certificate management

### Gateway
- External traffic ingress
- API exposure
- Virtual service routing
- TLS termination

## Integration with FOSPS

### Service-to-Service Communication
Istio manages communication between [FOSPS architectural layers](./architectural-layers.md):
- App Layer ↔ Service Layer
- Service Layer ↔ Data Layer
- Between microservices within the Service Layer

### VirtualServices
New components require Istio `VirtualService` definitions for external access, including:
- [Focusing Manager](./focusing-manager.md) APIs
- [FHIR Server](./fhir-server.md) endpoints
- Custom tools like [Focusing Inspector](./focusing-inspector.md)

## Deployment

Works in conjunction with:
- [Kubernetes](./kubernetes-deployment.md) for orchestration
- [Helm Charts](./kubernetes-deployment.md) for configuration
- [OpenAPI specifications](./openapi.md) for API definitions

## Related Concepts

- [FOSPS](./fosps.md) - Overall platform
- [Kubernetes Deployment](./kubernetes-deployment.md) - Orchestration layer
- [Architectural Layers](./architectural-layers.md) - Component structure
- [Keycloak](./keycloak.md) - Authentication integration
