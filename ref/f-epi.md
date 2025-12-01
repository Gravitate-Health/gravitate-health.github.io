---
sidebar_position: 37
title: f(ePI) - Focused ePI
tags: [focusing, epi, personalized-output, focused-content]
---

# Focused ePI (f(ePI))

**f(ePI)** (Focused ePI) is the final personalized output of the [Focusing](./focusing.md) process, adapted for a specific patient's context through [Lens](./lens.md) execution.

## Creation Process

[p(ePI)](./p-epi.md) + [IPS](./ips.md) + [PV](./persona-vector.md) → [LEE](./lee.md) with [Lens](./lens.md) → **f(ePI)**

## Characteristics

### Personalized
Adapted for individual patient based on:
- Clinical conditions from [IPS](./ips.md)
- Demographics and preferences from [PV](./persona-vector.md)
- Medical history and medications

### Visually Enhanced
Contains [attention detail modifications](./attention-modification.md):
- `"highlight"` classes on relevant sections
- `"collapse"` classes on irrelevant sections
- Standard presentation for general content

### Supplemented
May include added content:
- Hyperlinks to [Supporting Material](./supporting-material.md)
- Embedded images, videos, pictograms
- Interactive glossary elements
- Tooltips and explanatory content

### Regulatory-Compliant
- Original [ePI](./epi.md) text **unchanged**
- No content removed or altered
- Only visual presentation modified
- All information remains accessible

## Structure

f(ePI) maintains the [ePI Bundle](./epi-bundle.md) structure with modifications:

```html
<!-- Original p(ePI) section -->
<p class="pregnancy-warning">Do not use during pregnancy.</p>

<!-- f(ePI) for pregnant patient -->
<p class="pregnancy-warning highlight">
  Do not use during pregnancy.
  <a href="/sm/pregnancy-alternatives">Alternative medications</a>
</p>

<!-- f(ePI) for male patient -->
<p class="pregnancy-warning collapse">Do not use during pregnancy.</p>
```

## Ephemeral Nature

f(ePI) is **NOT cached** because:
- Specific to one patient context
- Patient data may change
- Different for each request
- Privacy considerations

**Implication**: [Focusing](./focusing.md) process runs every time, requiring [Lenses](./lens.md) to be computationally efficient.

## Delivery

f(ePI) is returned to:
- Patient-facing applications
- Mobile apps
- Web interfaces
- Healthcare provider systems

## Rendering

Applications render f(ePI) based on:
- CSS class interpretations
- Platform capabilities (web, mobile)
- User preferences (font size, contrast)
- Accessibility requirements

## Quality Assurance

f(ePI) can be inspected using:
- [Focusing Inspector](./focusing-inspector.md) tool
- Validation against original [ePI](./epi.md)
- [Provenance](./provenance.md) tracking
- [Audit Log](./audit-log.md) records

## Related Concepts

- [Focusing](./focusing.md) - Creation process
- [Lens](./lens.md) - Transformation logic
- [LEE](./lee.md) - Execution environment
- [p(ePI)](./p-epi.md) - Preprocessed input
- [ePI](./epi.md) - Original content
- [IPS](./ips.md) - Patient data input
- [Persona Vector](./persona-vector.md) - Context input
- [Attention Modification](./attention-modification.md) - Visual changes
