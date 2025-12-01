---
sidebar_position: 42
title: Provenance
tags: [trust, fhir, traceability, audit]
---

# Provenance Statements (FHIR Resource)

A **Provenance** statement is a FHIR record that describes Agents (actors), Entities (resources), and Activities (processes) involved in creating, transforming, or influencing a resource.

## Purpose

Provenance provides:
- **Traceability**: Complete supply chain record for content
- **Accountability**: Who performed what actions
- **Auditability**: When and why changes occurred
- **Trust basis**: Foundation for [CTF](./ctf.md) trust scores

## FHIR Provenance Structure

### Agents
**Who** was involved:
- Organizations (manufacturers, regulators)
- Individuals (authors, reviewers)
- Systems ([Preprocessors](./preprocessor.md), [Connectors](./connectors.md))

### Entities
**What** resources were involved:
- Source resources (input)
- Derived resources (output)
- Related resources (context)

### Activities
**What** happened:
- Creation
- Transformation ([Preprocessing](./preprocessor.md), [Focusing](./focusing.md))
- Retrieval ([Connectors](./connectors.md))
- Verification
- Signing

### Time
**When** it occurred:
- Timestamp
- Period (start/end)

### Reason
**Why** it happened:
- Purpose
- Policy
- Request

## Provenance Chains

Resources may have **multiple provenance records** forming a chain:

```
Raw ePI
  ↓ (retrieved by Connector)
[Provenance 1: Connector retrieval]
  ↓
Cached ePI
  ↓ (annotated by Preprocessor)
[Provenance 2: Preprocessing]
  ↓
p(ePI)
  ↓ (personalized by Lens)
[Provenance 3: Focusing]
  ↓
f(ePI)
```

## Generation in FOSPS

Provenance is automatically created by:
- **[Connectors](./connectors.md)**: On resource retrieval
- **[Preprocessors](./preprocessor.md)**: On annotation
- **[Focusing Manager](./focusing-manager.md)**: On focusing
- **[CTF](./ctf.md)**: On signing/verification

## Storage

Provenance records are stored in:
- [FHIR Server](./fhir-server.md) alongside resources
- [Audit Log](./audit-log.md) for immutable backup
- Blockchain ledger for hash verification

## Inspection

Provenance can be viewed using:
- [CTF Inspector](./ctf-inspector.md) tool
- FHIR API queries
- [Trust Functions](./trust-function.md) for analysis

## Related Concepts

- [CTF](./ctf.md) - Trust framework using provenance
- [Trust Function](./trust-function.md) - Analyzes provenance
- [Connectors](./connectors.md) - Generate provenance
- [Preprocessor](./preprocessor.md) - Generate provenance
- [Audit Log](./audit-log.md) - Records activities
- [FHIR Server](./fhir-server.md) - Stores provenance
