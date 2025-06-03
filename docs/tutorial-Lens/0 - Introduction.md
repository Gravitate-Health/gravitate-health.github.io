---
sidebar_position: 1
---

# Introduction


What are lenses and how they contribute to the Focusing Mechanism?


## Understanding lens capabilities 

### adding CSS classes for highlighting/collapsing

### adding HTML tags for hyperlinks/media

### limitations 

Lenses can do many things, but not everything is possible.

#### remove original content

The most important limitation is that Lenses cannot remove content (they may only collapse it). Why? think that eventhough you may develop the most advanced Lens, there is always a risk that it does not capture all extreme cases; original ePI information must be always avilable, as intended, to patients. This is also a legal requirement, as the original text is the only .

#### High power computation

Lenses should be designed to run in the phones of patients. Also known as client-side focusing, there may be clients who, for privacy or other reasons, don't send the patient's information to the server for focusing; instead they request the lens executables to run locally with the locally stored patient information.

Consider also the case where server-side focusing is employed, meaning the server receives (or aready has) all the patient's information and processes the focusing operation. This operation needs to scale for many users, thus, again it is important for Lenses to not have high coputational resources. Because Lense execution results may change according to different context, Fully Focused ePIs are NOT cached, nor they should be. Lens execution is considered ephimeral.

When dealing with this limitation, try always to rely on [Pre-processors](../../ref/preprocessor.md) to perform the Highly demanding computational tasks. 