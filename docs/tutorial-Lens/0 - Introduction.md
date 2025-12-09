---
sidebar_position: 1
---

# Introduction

## What are lenses and how they contribute to the Focusing Mechanism?

:::info Focusing Mechanism
The Focusing Mechanism is defined as adapting information to the context of the end user for effective and optimal understanding of the information. This transformation (adaptation) is applied primarily to the Patient Information Leaflet (PIL) contained within the electronic Product Information (ePI).
:::

Lenses are the **executable core** of this adaptation process. A lens is an algorithm that encodes specific knowledge—such as medical facts, biochemical behavior, or cultural aspects—in the form of rules (e.g., if-then-else logic) required to automatically decide how best to adapt the content.

:::tip Lens Capabilities
Lenses contribute to the Focusing Mechanism by determining which sections of the ePI text should be **highlighted, collapsed, or left unchanged**. They can also **enrich the content** by adding supplementary features like icons, videos, or interactive elements. The end result of the process is the **focused ePI (*f(ePI)*)**, which is an enhanced and personalized version of the original ePI.
:::

### Lens Operation and Inputs

A lens is designed to execute within the **Lens Execution Environment (LEE)**. To perform personalization effectively, the lens uses three critical inputs:

:::note Critical Inputs

1. **Preprocessed ePI (*p(ePI)*)**: This version of the ePI has been semantically annotated by [Pre-processors](/docs/tutorial-Preprocessor/0%20-%20Introduction.md), linking sections of the medical text to standard terminologies.

2. **International Patient Summary (IPS)**: This contains clinical data relevant to the patient's health, such as existing conditions or allergies.

3. **Persona Vector (PV)**: This extends and complements the IPS by codifying and standardizing the patient's context and preferences that dont or shouldnt exist in the IPS.
:::

:::info Lens Packaging
Lenses are packaged as **HL7 FHIR objects** (specifically, using the [Lens Profile](/docs/tutorial-Lens/2%20-%20FHIR%20metadata.md)) and contain their code, in JavaScript, encoded in Base64. The Lens Execution Environment (LEE) decodes the content from Base64 and interprets it as UTF-8 before execution. The LEE must ensure that the lenses can operate successfully in both client-side and server-side focusing modes.
:::

## Understanding lens capabilities

Lenses modify the content display and structure by modifying the embedded HTML code within the FHIR resource. These modifications are categorized into two types: **attention detail modification** and **addition of supplementary information**. These changes are executed by calling LEE helper methods, such as `modifyCSSClass()` and `addNewContent()`.

### Adding CSS classes for highlighting/collapsing

This capability is used for **attention detail modification**. By adding specific CSS class attributes to existing or newly created HTML elements within the ePI text (e.g., `<span>` or existing tags), lenses instruct the rendering application on how to present that section to the user.

:::tip Three Levels of Attention
The goal is to establish three levels of attention:

1. **`"highlight"`**: This class indicates sections that are **extremely relevant** to the patient and their condition, suggesting they must be read and completely understood.

2. **`"collapse"`**: This class indicates content that is **not relevant** to the specific patient's context. The resulting display suggests the user can safely skim or skip these sections (suppress/hide them).

3. **Standard Level**: Text without either class maintains the original, standard level of attention intended by regulators.
:::

:::warning Stacking Lenses
When multiple lenses are stacked, developers must ensure that if an element already possesses a class attribute (i.e., from a previously executed lens), the new class attribute is handled appropriately, prioritizing the larger attention detail (e.g., if the current lens states a section needs to be `"collapse"`, but the class is already `"highlight"`, then `"highlight"` should prevail).
:::

#### Other classes used

Beyond the core `highlight` and `collapse` classes, the focusing ecosystem supports additional CSS classes for richer content presentation:

| Class | Aliases | Description |
|-------|---------|-------------|
| `info` | `information` | Blue-bordered info blocks for general informational content (ℹ️ prefix) |
| `warning` | `caution` | Orange-bordered notices for potential issues or cautions (⚠️ prefix) |
| `danger` | `critical`, `alert` | Red-bordered serious warnings requiring immediate attention (🚨 prefix) |
| `special` | `cta`, `action` | Green-bordered call-to-action blocks for important actions |
| `tip` | `hint` | Purple-bordered helpful suggestions and hints (💡 prefix) |
| `success` | — | Green-bordered positive confirmations (✅ prefix) |

:::note
These classes provide visual cues through colors, icons, and borders to help patients quickly identify the nature and importance of different sections.
:::

### Adding HTML tags for hyperlinks/media

Lenses utilize this capability to add supplementary information. This involves injecting new HTML tags into the document structure to enrich the content.

:::tip Examples of Supplementary Information
Lenses can add:

- Adding hyperlinks to relevant Supporting Material (SM), documents, or services
- Embedding images, videos, or icons (such as pictograms)
- Creating interactive elements, such as hover boxes or glossary functions, to provide clarifications on specific terms
:::

## Limitations

:::danger Regulatory Constraints
Lenses operate under stringent limitations imposed by regulatory, legal, and performance requirements.
:::

### Remove original content

:::warning Critical Limitation
The most important limitation is that Lenses **cannot remove content**. They also **cannot change the content** of the ePI compared to the original, regulated text.
:::

This constraint is based on the recognition that ePI information is highly regulated text and must be preserved exactly as approved (considered legal text). Even advanced lenses carry the risk of not capturing all extreme cases, meaning the original ePI information must always be available to patients. Lenses are limited to modifying the *format* in which the content is displayed, primarily by allowing content to be suppressed or collapsed (hidden but accessible).

### High power computation

:::warning Performance Requirements
Lenses must be designed to be computationally light for optimal operation in diverse environments:
:::

#### Client-Side Performance

Lenses should be designed to run efficiently on **patients' phones**. If clients opt for client-side focusing (for privacy or other reasons), the lens must execute locally with locally stored patient information.

#### Server-Side Scalability

When **server-side focusing** is employed, the focusing operation must **scale for many users**. Computational demands must be minimized to ensure the system maintains an acceptable response speed and uninterrupted performance.

#### Ephemeral Execution

Fully Focused ePIs (*f(ePI)*) are **NOT cached** because the results change based on different contexts. Therefore, lens execution is considered ephemeral, further necessitating lightweight operation since the process may be run frequently.

:::tip Best Practice
When designing Lenses, developers should always aim to **rely on [Pre-processors](/docs/tutorial-Preprocessor/0%20-%20Introduction.md)** to perform highly demanding computational tasks, such as complex NLP model execution or semantic analysis, leaving the Lenses to execute the logic based on the Preprocessors' annotations.
:::
