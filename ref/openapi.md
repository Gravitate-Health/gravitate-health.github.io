---
sidebar_position: 18
title: OpenAPI & Swagger
tags: [platform, api, documentation, openapi]
---

# OpenAPI Specification & Swagger UI

[FOSPS](./fosps.md) uses **OpenAPI Specification (OAS)** as the standard for API documentation, exposed through **Swagger UI** deployment.

## Purpose

OpenAPI specifications provide:
- Standardized API documentation
- Interactive API exploration
- Client code generation capabilities
- Contract-first development approach

## Swagger UI

The Swagger deployment allows developers to:
- Browse all service endpoints
- Understand request/response schemas
- Test API calls interactively
- View authentication requirements

## Required for All Services

All [FOSPS service layer](./architectural-layers.md) components must document their APIs using OpenAPI, including:
- [Preprocessors](./preprocessor.md): `/preprocess` endpoint
- [Connectors](./connectors.md): Resource retrieval endpoints
- [Focusing Manager](./focusing-manager.md): Focusing workflow APIs
- [Supporting Material Matchmaking](./sm-matchmaking.md): Matchmaking API

## Example Specifications

- **Preprocessor API**: [preprocessing-service-example/openapi.yaml](https://github.com/Gravitate-Health/preprocessing-service-example/blob/main/openapi.yaml)

## Integration

OpenAPI specs integrate with:
- [Istio](./istio.md) for routing and exposure
- [Kubernetes](./kubernetes-deployment.md) service definitions
- Documentation generation tools

## Related Concepts

- [FOSPS](./fosps.md) - Platform architecture
- [Architectural Layers](./architectural-layers.md) - Service layer
- [Preprocessor](./preprocessor.md) - Example service with OpenAPI
- [Connectors](./connectors.md) - Services requiring documentation
