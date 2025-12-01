---
sidebar_position: 31
title: Focusing
tags: [focusing, personalization, workflow, core-process]
---

# Focusing

**Focusing** is the process defined as "Adapting information to the context of the end user for effective and optimal understanding of the information" without modifying the regulated content itself.

## Core Principle

The fundamental constraint of Focusing is that **regulated [ePI](./epi.md) content cannot be removed or altered**. Focusing only changes:
- Visual representation (highlighting, collapsing)
- Supplementary content (adding hyperlinks, icons, videos)
- Organization and presentation

## The Focusing Workflow

1. **Input**: Raw [ePI](./epi.md) from [Connectors](./connectors.md)
2. **Preprocessing**: [Preprocessors](./preprocessor.md) create [p(ePI)](./p-epi.md) with semantic annotations
3. **Lens Selection**: [Focusing Manager](./focusing-manager.md) selects appropriate [Lenses](./lens.md)
4. **Execution**: [LEE](./lee.md) runs lens logic with [IPS](./ips.md)/[PV](./persona-vector.md)
5. **Output**: [Focused ePI (f(ePI))](./f-epi.md) personalized for patient

## Personalization Inputs

Focusing uses three critical inputs:
- **[p(ePI)](./p-epi.md)**: Semantically annotated ePI
- **[IPS](./ips.md)**: Patient clinical data
- **[PV](./persona-vector.md)**: User context and preferences

## Adaptation Techniques

### Attention Detail Modification
- **Highlight**: Mark highly relevant sections (CSS class `"highlight"`)
- **Collapse**: Minimize irrelevant sections (CSS class `"collapse"`)
- **Standard**: Leave default presentation

See [Attention Detail Modification](./attention-modification.md) for details.

### Supplementary Content
- Add hyperlinks to [Supporting Material](./supporting-material.md)
- Embed images, videos, pictograms
- Create interactive elements (glossary, hover boxes)

## Focusing Flows

[FOSPS](./fosps.md) supports [four focusing flows](./focusing-flows.md) based on input format:
1. ePI ID + IPS ID
2. ePI JSON + IPS JSON
3. ePI ID + IPS JSON
4. ePI JSON + IPS ID

## Orchestration

The [Focusing Manager](./focusing-manager.md) coordinates:
- [Preprocessor](./preprocessor.md) discovery and invocation
- [Lens](./lens.md) selection
- [LEE](./lee.md) execution
- Data retrieval from [FHIR Server](./fhir-server.md)

## Result Characteristics

The [f(ePI)](./f-epi.md) is:
- **Ephemeral**: Not cached (always regenerated)
- **Personalized**: Specific to one patient context
- **Regulatory-compliant**: Original content preserved
- **Enhanced**: With visual and supplementary adaptations

## Related Concepts

- [Focusing Manager](./focusing-manager.md) - Orchestration component
- [Preprocessor](./preprocessor.md) - Semantic annotation
- [Lens](./lens.md) - Adaptation logic
- [LEE](./lee.md) - Execution environment
- [p(ePI)](./p-epi.md) - Preprocessed input
- [f(ePI)](./f-epi.md) - Focused output
- [G-lens](./g-lens.md) - Overall solution
