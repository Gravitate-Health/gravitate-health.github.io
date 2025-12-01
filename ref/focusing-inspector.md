---
sidebar_position: 51
title: Focusing Inspector
tags: [tools, app-layer, inspection, debugging]
---

# Focusing Inspector

The **Focusing Inspector** is a proposed tool for professional stakeholders (developers, researchers, etc.) providing a user interface to check the results of [preprocessed ePIs](./p-epi.md) and the application of [Lenses](./lens.md).

## Purpose

Enables inspection of:
- [Preprocessor](./preprocessor.md) annotation quality
- [Lens](./lens.md) execution results
- [Attention detail modifications](./attention-modification.md)
- [f(ePI)](./f-epi.md) output
- Comparison between [ePI](./epi.md) → [p(ePI)](./p-epi.md) → [f(ePI)](./f-epi.md)

## Views Supported

### Programmer View
**Technical inspection** for developers:
- Raw FHIR JSON comparison
- HtmlElementLink extensions
- CSS class attributes
- [Provenance](./provenance.md) chains
- [Standard terminology](./standard-terminologies.md) codes
- Lens execution logs

### End-User View
**Visual presentation** as patient sees it:
- Rendered HTML with styling
- Highlighted sections
- Collapsed sections
- Added supplementary content
- [Supporting Material](./supporting-material.md) links

## Features

### Diff Viewer
Compare versions:
- Original [ePI](./epi.md) vs. [p(ePI)](./p-epi.md)
- [p(ePI)](./p-epi.md) vs. [f(ePI)](./f-epi.md)
- Multiple lens applications
- Before/after preprocessing

### Annotation Explorer
Inspect [p(ePI)](./p-epi.md) annotations:
- View all HtmlElementLink extensions
- Filter by terminology system (SNOMED-CT, ICPC-2)
- Search by concept code
- Validate annotation completeness

### Lens Simulator
Test [Lenses](./lens.md) with different inputs:
- Select patient profiles ([IPS](./ips.md))
- Adjust [Persona Vector](./persona-vector.md)
- Compare lens variants
- Debug lens logic

### Performance Profiler
Analyze execution:
- [Preprocessor](./preprocessor.md) duration
- [Lens](./lens.md) execution time
- Memory usage
- API call traces

## Access Control

Restricted to authorized roles via [Keycloak](./keycloak.md):
- Developers
- Content creators
- Quality assurance teams
- Regulatory reviewers

## Integration

Connects to:
- [Focusing Manager](./focusing-manager.md) APIs
- [FHIR Server](./fhir-server.md) for resources
- [LEE](./lee.md) for lens execution
- [CTF](./ctf.md) for provenance inspection

## Deployment

Part of [FOSPS](./fosps.md) [App Layer](./architectural-layers.md):
- Web-based interface
- Deployed via [Kubernetes](./kubernetes-deployment.md)
- Exposed through [Istio](./istio.md) gateway

## Related Concepts

- [p(ePI)](./p-epi.md) - Inspected content
- [f(ePI)](./f-epi.md) - Inspected output
- [Lens](./lens.md) - Tested algorithms
- [Preprocessor](./preprocessor.md) - Evaluated services
- [Focusing](./focusing.md) - Inspected process
- [FOSPS](./fosps.md) - Platform architecture
