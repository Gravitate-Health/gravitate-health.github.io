---
sidebar_position: 54
title: Annotation Tool
tags: [tools, app-layer, annotation, semantic-tagging]
---

# Annotation Tool

The **Annotation Tool** is a proposed tool to allow experts to semantically annotate free text in [ePIs](./epi.md) with [standard terminology](./standard-terminologies.md) labels, serving as manual preprocessing or generating training data for [NLP models](./nlp-services.md).

## Purpose

Enables human experts to:
- Manually annotate [ePI](./epi.md) text
- Tag sections with [standard terminologies](./standard-terminologies.md)
- Generate training datasets for [NLP services](./nlp-services.md)
- Validate [Preprocessor](./preprocessor.md) output
- Create gold-standard annotations

## Features

### Text Selection
- Highlight text spans in [ePI](./epi.md) narrative
- Select existing HTML elements (`<p>`, `<h1>`, etc.)
- Create new semantic boundaries
- Nested annotation support

### Terminology Search
Find and apply codes from:
- **SNOMED-CT**: Clinical concepts
- **ICPC-2**: Primary care classification
- **LOINC**: Laboratory observations
- **ATC**: Medication classification

Features:
- Free-text search
- Hierarchy browser
- Recent/favorite codes
- Synonym matching

### Annotation Management

#### Create Annotations
1. Select text span
2. Search terminology
3. Choose concept code
4. Define elementClass name
5. Preview in context
6. Save annotation

#### Edit Annotations
- Modify concept code
- Adjust text boundaries
- Change elementClass
- Add notes/rationale

#### Validate Annotations
- Check for overlaps
- Verify code appropriateness
- Review completeness
- Export validation report

### Output Formats

Generate [p(ePI)](./p-epi.md) compatible output:
- HtmlElementLink extensions
- HTML with class attributes
- FHIR Bundle JSON
- Training dataset format

### Collaboration Features

Support multiple annotators:
- Assign sections to experts
- Track annotation progress
- Compare inter-annotator agreement
- Resolve conflicts
- Consensus building

### Training Data Export

For [NLP services](./nlp-services.md):
- Export as IOB/BIO format
- JSON-LD for entity recognition
- Custom ML framework formats
- Split train/test/validation sets

## User Roles

### Medical Expert
- Annotate clinical concepts
- Validate terminology selection
- Review automated annotations

### Content Curator
- Manage annotation projects
- Assign tasks
- Monitor progress

### ML Engineer
- Export training data
- Validate dataset quality
- Integrate with NLP pipelines

## Integration

Connects to:
- [FHIR Server](./fhir-server.md) for [ePI](./epi.md) retrieval
- Terminology services (SNOMED-CT, ICPC-2)
- [Preprocessor](./preprocessor.md) validation
- [NLP Services](./nlp-services.md) training pipelines
- [SM Tool](./sm-tool.md) for [Supporting Material](./supporting-material.md)
- [Keycloak](./keycloak.md) for access control

## Quality Assurance

Features:
- Inter-annotator agreement metrics (Cohen's Kappa)
- Annotation guidelines enforcement
- Consistency checks
- Expert review workflow

## Related Concepts

- [ePI](./epi.md) - Annotated content
- [p(ePI)](./p-epi.md) - Output format
- [Standard Terminologies](./standard-terminologies.md) - Applied codes
- [Preprocessor](./preprocessor.md) - Validated/trained
- [NLP Services](./nlp-services.md) - Training data consumer
- [SM Tool](./sm-tool.md) - Related tagging tool
