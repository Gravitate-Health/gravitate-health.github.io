---
sidebar_position: 45
title: Keycloak
tags: [security, authentication, iam, oauth]
---

# Keycloak

**Keycloak** is the open-source Identity and Access Management (IAM) tool used by [FOSPS](./fosps.md) to handle Authorization and Authentication using OIDC/OAuth protocols.

## Purpose

Keycloak provides:
- **Authentication**: User identity verification
- **Authorization**: Access control and permissions
- **Single Sign-On (SSO)**: One login for multiple applications
- **Identity Federation**: Integration with external identity providers
- **Token Management**: JWT tokens for API access

## Protocols Supported

### OAuth 2.0
Authorization framework for:
- API access control
- Delegated authorization
- Client credentials flow
- Authorization code flow

### OpenID Connect (OIDC)
Authentication layer on OAuth 2.0:
- User identity tokens
- ID token verification
- UserInfo endpoint
- Session management

## Integration in FOSPS

### Protected Resources
Keycloak secures access to:
- [FHIR Server](./fhir-server.md) resources
- [Focusing Manager](./focusing-manager.md) APIs
- [Supporting Material](./supporting-material.md)
- Administrative interfaces

### User Types
Different authentication for:
- **Patients**: Accessing [f(ePI)](./f-epi.md) and [IPS](./ips.md)
- **Healthcare Professionals**: Clinical tools
- **Administrators**: Platform management
- **Developers**: API access, [Focusing Inspector](./focusing-inspector.md)

### Token Flow
1. User authenticates with Keycloak
2. Receives JWT access token
3. Includes token in API requests
4. [Istio](./istio.md) validates token
5. Request forwarded to service

## Realm Configuration

FOSPS uses Keycloak realms for:
- Multi-tenancy (different FOSPS instances)
- Role-based access control (RBAC)
- Client application registration
- Identity provider mapping

## Security Features

- **Multi-Factor Authentication (MFA)**
- **Brute force detection**
- **Session management**
- **Password policies**
- **Account lockout**

## Logging

Authentication events logged to [Audit Log](./audit-log.md):
- Login attempts (success/failure)
- Token issuance
- Permission grants
- Session expiration

## Related Concepts

- [FOSPS](./fosps.md) - Platform architecture
- [Istio](./istio.md) - JWT validation
- [Audit Log](./audit-log.md) - Security logging
- [FHIR Server](./fhir-server.md) - Protected resources
- [Focusing Manager](./focusing-manager.md) - Protected APIs
