---
sidebar_position: 43
title: Audit Log
tags: [trust, security, logging, blockchain]
---

# Audit Log

The **Audit Log** is a trust component that provides granular auditability for system logs with immutable proofs, enhancing security and log authenticity throughout the [FOSPS](./fosps.md) lifecycle.

## Purpose

Audit Log ensures:
- **Immutability**: Logs cannot be altered after creation
- **Non-repudiation**: Actions cannot be denied
- **Compliance**: Regulatory audit requirements met
- **Security**: Tamper detection and alerting

## Technology

### Blockchain Backend
- Guardtime KSI (Keyless Signature Infrastructure)
- Hash registration in blockchain ledger
- Timestamping service

### Log Management
- Rsyslog integration
- Structured logging format
- Secure transmission

## Logged Activities

All platform activities including:
- User authentication ([Keycloak](./keycloak.md))
- Resource access ([FHIR Server](./fhir-server.md))
- [Focusing](./focusing.md) executions
- [Preprocessor](./preprocessor.md) invocations
- [Connector](./connectors.md) data retrievals
- Administrative actions
- Configuration changes

## Log Structure

Each log entry contains:
- **Timestamp**: Precise time
- **Actor**: User or system component
- **Action**: What was performed
- **Resource**: Target of action
- **Result**: Success or failure
- **Context**: Additional metadata
- **Hash**: Blockchain-registered proof

## Immutability Mechanism

1. Log entry created
2. Hash calculated
3. Hash registered in blockchain
4. Entry sealed (cannot be modified)
5. Verification always possible

## Access Control

Audit logs are:
- Read-only after creation
- Accessible to administrators
- Exportable for compliance
- Queryable via secure APIs

## Integration

Used by:
- Security monitoring systems
- [Metrics Manager](./metrics.md) dashboards
- Compliance reporting tools
- [CTF](./ctf.md) verification

## Related Concepts

- [CTF](./ctf.md) - Trust framework
- [Provenance](./provenance.md) - Resource traceability
- [Keycloak](./keycloak.md) - Authentication logging
- [FOSPS](./fosps.md) - Platform architecture
- [Metrics](./metrics.md) - Monitoring system
