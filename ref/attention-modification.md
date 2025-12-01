---
sidebar_position: 38
title: Attention Detail Modification
tags: [focusing, lens, css-classes, highlighting]
---

# Attention Detail Modification

**Attention Detail Modification** is the specific non-content changes applied by [Lenses](./lens.md) through CSS class manipulation to guide user attention without altering regulated [ePI](./epi.md) text.

## Purpose

Directs patient attention to relevant information by modifying **visual presentation**, not content.

## Three Levels of Attention

### 1. Highlight (`"highlight"`)
**Increased attention** - extremely relevant to patient

**Use cases**:
- Patient has condition mentioned in warning
- Drug interaction with patient's medications
- Contraindication matches patient's [IPS](./ips.md)
- Age/pregnancy-specific critical information

**Visual presentation** (application-defined):
- Bold or colored text
- Warning icons
- Expanded sections
- "Must read" indicators

### 2. Collapse (`"collapse"`)
**Decreased attention** - not relevant to patient context

**Use cases**:
- Pediatric dosing for adult patient
- Breastfeeding info for male patient
- Conditions patient doesn't have
- Non-applicable warnings

**Visual presentation** (application-defined):
- Collapsed/hidden sections
- Gray or dimmed text
- "Less relevant" markers
- Can be expanded if user wants

### 3. Standard (no class)
**Normal attention** - default regulatory level

**Use cases**:
- General information
- Standard instructions
- Information without specific patient relevance
- Default state

**Visual presentation**:
- Original ePI formatting
- Regular text weight and color
- Standard readability

## Implementation

### In Lenses
[Lenses](./lens.md) use the [LEE](./lee.md) helper method:

```javascript
// Highlight relevant sections
if (patient.hasCondition("diabetes")) {
  modifyCSSClass("diabetes-warning", "highlight");
}

// Collapse irrelevant sections
if (patient.age > 18) {
  modifyCSSClass("pediatric-dosing", "collapse");
}

// Remove modification (return to standard)
modifyCSSClass("general-info", "standard");
```

### In p(ePI)
[Preprocessors](./preprocessor.md) create annotated elements:

```html
<!-- Before lens execution -->
<p class="diabetes-warning">Use with caution in diabetic patients.</p>

<!-- After lens execution (for diabetic patient) -->
<p class="diabetes-warning highlight">Use with caution in diabetic patients.</p>
```

## Stacking Lenses

When multiple [Lenses](./lens.md) are executed:

**Priority rule**: Higher attention level prevails
- If Lens A says `"collapse"` but Lens B says `"highlight"`
- Result: `"highlight"` (more attention wins)

**Implementation**:
```javascript
// Lens logic must check existing classes
if (!element.hasClass("highlight")) {
  modifyCSSClass("section", "collapse");
}
```

## Regulatory Compliance

Attention modification is **compliant** because:
- Original [ePI](./epi.md) text unchanged
- Content always accessible (even if collapsed)
- Visual hints, not content removal
- Patient can override (expand collapsed sections)

## Application Rendering

Frontend applications decide how to render classes:
- Mobile apps may use different styles than web
- Accessibility considerations (screen readers)
- User preferences (high contrast, large text)
- Cultural design patterns

## Related Concepts

- [Lens](./lens.md) - Applies modifications
- [LEE](./lee.md) - Provides modifyCSSClass() helper
- [p(ePI)](./p-epi.md) - Annotated input
- [f(ePI)](./f-epi.md) - Modified output
- [Focusing](./focusing.md) - Overall process
- [IPS](./ips.md) - Patient data for decisions
- [Persona Vector](./persona-vector.md) - Context for decisions
