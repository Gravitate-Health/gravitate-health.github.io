---
sidebar_position: 1
---

# Introduction

This document provides essential guidance for developers creating Preprocessor services within the Federated Open-Source Platform and Services (FOSPS) environment, particularly focusing on the annotation process for Electronic Product Information (ePI).

## What Are Preprocessors?

A preprocessor is a software service that annotates an ePI for further processing. Preprocessors are designed to be pluggable components that integrate seamlessly into the platform's focusing workflow. They operate dynamically and can be configured as modules that the Focusing Manager automatically identifies and invokes when an ePI requires preprocessing.

## Role in ePI Annotation

Preprocessors are tasked with performing semantic annotation on ePI content. This crucial process involves reading the ePI and automatically annotating parts of the narrative text. Specifically, preprocessors identify text sections containing information about any topic and semantically link them to clinical terminologies.
The goal of semantic annotation is to transform the unstructured narrative text of the ePI into a structured representation, making the information easier to analyze, search, and understand for subsequent processes. These annotations typically consist of codes from standard terminologies, such as SNOMED-CT or ICPC-2.

## Role in the Focusing Mechanism

Preprocessing is the first step in the multi-stage focusing process. The focusing mechanism itself is defined as adapting information to the context of the end user for effective and optimal understanding of the information.
The output of the preprocessing stage is the preprocessed ePI, or p(ePI). The p(ePI) retains the original text content of the raw ePI but is enriched with metadata embedded within the text, matching text sections to for example clinical terminologies. This annotated ePI is then ready to be consumed by the Lenses, which contain the logic for personalization based on user context (like their IPS or prefrecences).
Preprocessors must be built with the understanding that they may be stacked, i.e., executed sequentially, with other preprocessors to generate a complete annotation of the ePI. The Focusing Manager coordinates this orchestration.

## Understanding the use of standard terminologies (e.g., SNOMED-CT, ICPC-2) for annotation

Semantic annotation within the FOSPS relies on the principle of linking sections of the ePI narrative text to standard medical vocabularies, such as SNOMED-CT (Systematized Nomenclature of Medicine Clinical Terms) and ICPC-2 (International Classification of Primary Care version 2). The usage of these standard terminologies is essential to standardize clinical and medical nomenclature and definitions across the platform.

### Use of the HtmlElementLink Extension

The mechanism used to link these standard terminology concepts (codes) to specific parts of the ePI narrative text relies on the [HtmlElementLink FHIR extension](https://build.fhir.org/ig/hl7-eu/gravitate-health/StructureDefinition-HtmlElementLink.html).
The HtmlElementLink extension is complex and is utilized for adding information—which may be pictograms, images, video, or other flexible types of data—to ePIs in the FHIR format. It is typically applied to the Composition resource within the ePI Bundle.
This extension contains sub-extensions to define the linkage:

 1. **extension:concept**: This mandatory component specifies the data to be used, which is generally a reference to a resource, a CodeableConcept (such as a SNOMED-CT or ICPC-2 code), a URL, or a string. This is the standard terminology code representing the clinical concept being annotated.
 2. **extension:elementClass**: This component, required for linking, specifies the location in the HTML to which the concept applies. This value is a string intended to be used as an HTML class attribute.

By declaring the concept (code) and linking it to a specific elementClass using the HtmlElementLink extension, preprocessors enable the narrative text (which is contained within HTML) to feature class attributes that reference these defined concepts.

## Technical Requirements for Preprocessor HTML Modification
When generating annotations, preprocessors must adhere to strict constraints regarding HTML modifications to ensure regulatory compliance and proper functioning within the Focusing Mechanism:

 1. Modification Limits (**No Content Editing**): The content of the ePI is highly regulated and must be preserved exactly as approved. Preprocessors must not remove any content or change the narrative content of the original ePI. Edits are strictly limited to technical modifications of the HTML structure:
    * Adding HTML class attributes.
    * Adding new HTML tags for the purpose of supplementary information or delineation.
 2. Adding Classes to Existing Tags: Preprocessors should utilize HTML markup language to target text portions. Annotations are commonly applied by adding classes to existing HTML tags, such as header tags (`<H1>`) or list items (`<UL>`, `<IL>`).
 3. Generating Invisible Tags: To mark arbitrary text segments for annotation without affecting the display style, preprocessors may use non-style-changing tags. The preferred tag for selecting arbitrary text is the `<span>` tag.
 4. Stacking Awareness: Since preprocessors can be stacked, a preprocessor's input may be the output of one or more previous preprocessors, and viceversa. Developers should implement logic that checks for existing attributes and handles their concatenation to maintain a clean and effective structure. Some considerations include:
     1. Duplicate prevention: avoid adding duplicates like extension:concept, or extension:elementClass with the same values
     2. Avoiding HTML Nesting (Handling Existing Attributes): Developers must be aware that when applying annotations, they should avoid creating redundant or complex HTML structures. If a target HTML element already has a class attribute (potentially added by a preceding preprocessor), the new class attribute referencing the terminology concept should be added to the existing class attributes, rather than wrapping the element in a new, nested tag.