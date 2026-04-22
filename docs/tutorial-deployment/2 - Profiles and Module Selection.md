---
sidebar_position: 3
---

# Profiles and Module Selection

This page helps decide what to install and what happens if you skip specific modules.

## Profiles

### Core

Deploys infrastructure, IAM, FHIR servers, connector, focusing manager, baseline preprocessors, and baseline lens selectors.

Use when:

- You want a functional non-AI baseline
- You are validating core interoperability and focusing flow

### AI

Deploys core plus AI/chat modules and additional lens services.

Use when:

- You need conversational/UI flows and AI-generated lens outputs
- You can provide required model/service dependencies

### Observability

Deploys core plus monitoring and inspection components.

Use when:

- You need dashboards/log aggregation from day one
- You are preparing production-like operations

### All

Deploys all modules currently integrated into the orchestrator.

Use when:

- You want complete platform behavior for integrated testing

## Key architecture implications

### If Istio is not installed

Implications:

- Modules expecting Istio VirtualService/Gateway will not be externally routable by default
- RequestAuthentication/AuthorizationPolicy assumptions may no longer apply
- You must switch affected modules to ingress mode or internal-only exposure

### If Keycloak is not installed

Implications:

- Auth-dependent APIs and UI flows may be unavailable or must be relaxed
- OIDC/JWT integration in mesh-level auth config becomes invalid

### If FHIR servers are not installed

You may have your own FHIR endpoints, in that case you will need to configure the affected modules to use them, but if not, the platform will have no data source for IPS/ePI and related flows.

Implications:

- Connector, focusing manager, chatbot flows, and several lenses cannot function correctly
- Services may deploy but remain non-functional due to missing upstream endpoints

### If monitoring stack is not installed

Implications:

- Platform still works functionally
- You lose centralized dashboards, log aggregation, and blackbox endpoint checks

## Module enable/disable interface

Module switches are in profile files under `helm-charts/environments/profiles/` and can be overridden with:

```bash
helmfile -f helmfile.yaml -e full --state-values-set modules.chatbotInterface=false apply
```

Review complete module details in the next pages.
