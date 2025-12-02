---
sidebar_position: 36
title: LEE (Lens Execution Environment)
tags: [focusing, lee, lens-execution, service-layer]
---

# Lens Execution Environment (LEE)

The **LEE** (Lens Execution Environment) is the service that executes [Lens](./lens.md) logic on [p(ePI)](./p-epi.md) using patient contextual data to produce the final [f(ePI)](./f-epi.md).

## Purpose

LEE provides a **sandboxed runtime environment** for executing [Lens](./lens.md) JavaScript code safely and efficiently.

## Execution Process

1. Receives request from [Focusing Manager](./focusing-manager.md)
2. Loads [Lens](./lens.md) code from FHIR Library resource
3. Decodes Base64 content, then interprets as UTF-8 JavaScript
4. Prepares inputs: [p(ePI)](./p-epi.md), [IPS](./ips.md), [PV](./persona-vector.md)
5. Executes lens in isolated context
6. Applies modifications to generate [f(ePI)](./f-epi.md)
7. Returns result to [Focusing Manager](./focusing-manager.md)

## Helper Methods

LEE provides APIs for [Lenses](./lens.md) to use:

### modifyCSSClass()
Applies [attention detail modifications](./attention-modification.md):

```javascript
// Function signature
modifyCSSClass(elementClass, action)

// Examples
modifyCSSClass("pregnancy-warning", "highlight");
modifyCSSClass("pediatric-info", "collapse");
modifyCSSClass("general-info", "standard");
```

### addNewContent()
Inserts supplementary HTML:

```javascript
// Function signature
addNewContent(targetLocation, htmlContent)

// Examples
addNewContent("section-4", '<a href="/sm/guide">Read more</a>');
addNewContent("warnings", '<img src="/icons/warning.png" />');
addNewContent("dosing", '<video src="/videos/howto.mp4"></video>');
```

## Execution Modes

### Client-Side Focusing
- LEE runs in patient's browser/app
- Uses local patient data ([IPS](./ips.md)/[PV](./persona-vector.md))
- Privacy-preserving (data never leaves device)
- Requires lightweight [Lenses](./lens.md)

### Server-Side Focusing
- LEE runs on [FOSPS](./fosps.md) servers
- Receives patient data from secure sources
- Must scale for concurrent users
- Enables more complex lenses

## Security & Isolation

- **Sandboxed execution**: Lenses cannot access system resources
- **Time limits**: Prevent infinite loops
- **Memory limits**: Prevent resource exhaustion
- **API restrictions**: Only approved helper methods available

## Architecture Position

Located in the [Service Layer](./architectural-layers.md) of [FOSPS](./fosps.md).

## Integration

- Called by [Focusing Manager](./focusing-manager.md)
- Retrieves [Lenses](./lens.md) from [FHIR Server](./fhir-server.md)
- Produces [f(ePI)](./f-epi.md) for end-users
- Exposed via [Istio](./istio.md) VirtualService

## Related Concepts

- [Lens](./lens.md) - Executed code
- [p(ePI)](./p-epi.md) - Input content
- [f(ePI)](./f-epi.md) - Output result
- [Focusing Manager](./focusing-manager.md) - Orchestrator
- [Attention Modification](./attention-modification.md) - Primary operation
- [IPS](./ips.md) - Patient input
- [Persona Vector](./persona-vector.md) - Context input
