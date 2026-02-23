---
sidebar_position: 36
title: LEE (Lens Execution Environment)
tags: [focusing, lee, lens-execution]
---

# Lens Execution Environment (LEE)

:::note
   The **LEE** (Lens Execution Environment) is the component that executes [Lens](./lens.md) logic on [p(ePI)](./p-epi.md) using patient contextual data to produce the final [f(ePI)](./f-epi.md).
:::

The LEE provides the structure needed for lens development and execution. This structure includes the interface that lenses should follow, as well as the inputs they should expect. The LEE implements critical functions, like:

- preparing the inputs (epi, ips, and pv) for each lens, extracting the Patient Information Leaflet (PIL) from the p(ePI) and transforming it as a separate input `html` to the first lens.
- ensuring the lenses are executed sequentially the `html` output of each lens is the input for the next one, this allows lenses to build on top of each other and create complex adaptations.
- isolating the lens execution, when the different functions of the lens are invoked, they are executed in an isolated thread. This not only improves security and robustness of the lens execution process, it also allows the LEE to impose security constraints such as timeout, limiting execution to 1 second by default, or network access (currently planned, but not implemented). 
- configuration of the log handling, logs can be  deactivated (useful for production environments) or independent logging for each lens can be customized (useful for development environments).
- LEE converts the final `html` output of the lens execution back into a FHIR `Composition` resource, embedding it within the ePI resource, as well as adding metadata, to produce the final [f(ePI)](./f-epi.md). This means that lens developers can focus on the adaptation logic and return the adapted content as `html`, without needing to worry about the FHIR structure of the output, which is handled by the LEE.

Critically, LEE ensures that lenses can be developed agnostically to the [execution mode](./focusing.md#execution-modes), i.e. the exact same lens can operate for client-side and server-side focusing. 

The LEE is offered as a NPMJS package, so client agents may download and use it, being this package the same one the Focusing Manager is using for applying lenses means the agent will obtain the same results.


## Purpose

LEE provides a **sandboxed runtime environment** for executing [Lens](./lens.md) JavaScript code safely and efficiently.

## Execution Process

1. invoked through the function `applyLens(lensId, pEpi, ips, pv)`
2. Loads [Lens](./lens.md) code from FHIR Library resource
3. Decodes Base64 content, then interprets as UTF-8 JavaScript
4. Prepares inputs: [p(ePI)](./p-epi.md), [IPS](./ips.md), [PV](./persona-vector.md)
5. Executes lens in isolated context
6. Applies modifications to generate [f(ePI)](./f-epi.md)
7. Returns FHIR-compliant resource to caller


## Execution Modes

### Client-Side Focusing
- LEE runs in patient's browser/app, it is published as a JavaScript library that can be embedded in client applications for enhanced privacy and responsiveness.
- Uses local patient data ([IPS](./ips.md)/[PV](./persona-vector.md))
- Privacy-preserving (data never leaves device)
- Requires lightweight [Lenses](./lens.md)

### Server-Side Focusing
- LEE is imported and run by [Focusing Manager](./focusing-manager.md) on [FOSPS](./fosps.md) servers
- Receives patient data from secure sources
- Focusing Manager scales for concurrent users

## Security & Isolation

- **Sandboxed execution**: Lenses cannot access system resources
- **Time limits**: Prevent infinite loops
- **Memory limits**: Prevent resource exhaustion
- **API restrictions**: Only approved network access available


## Integration

- Called by [Focusing Manager](./focusing-manager.md)
- Decodes [Lenses](./lens.md) 
- Produces [f(ePI)](./f-epi.md) for end-users

## Related Concepts

- [Lens](./lens.md) - Executed code
- [p(ePI)](./p-epi.md) - Input content
- [f(ePI)](./f-epi.md) - Output result
- [Focusing Manager](./focusing-manager.md) - Orchestrator
- [Attention Modification](./attention-modification.md) - Primary operation
- [IPS](./ips.md) - Patient input
- [Persona Vector](./persona-vector.md) - Context input
