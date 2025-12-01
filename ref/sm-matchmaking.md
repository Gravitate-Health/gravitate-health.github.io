---
sidebar_position: 55
title: SM Matchmaking
tags: [service-layer, api, matchmaking, supporting-material]
---

# Supporting Material Matchmaking

**Supporting Material Matchmaking** is the process enabled by an API that takes [ePI](./epi.md), [IPS](./ips.md), and [PV](./persona-vector.md) as input and returns composed [Supporting Material](./supporting-material.md) that matches the terms, conditions, and languages present in the input data.

## Purpose

Selects relevant [Supporting Material](./supporting-material.md) (aRMM/HEM) based on:
- Patient conditions from [IPS](./ips.md)
- Demographics and preferences from [PV](./persona-vector.md)
- Medication context from [ePI](./epi.md)
- Language and literacy level

## Matching Algorithm

### Step 1: Extract Context
From inputs:
- **[IPS](./ips.md)**: Conditions, allergies, medications
- **[PV](./persona-vector.md)**: Age, gender, pregnancy, language
- **[ePI](./epi.md)**: Drug name, therapeutic class

### Step 2: Query Candidates
Search [Supporting Material](./supporting-material.md) metadata:
- Filter by [standard terminology](./standard-terminologies.md) codes
- Match language preference
- Check content type (aRMM/HEM)
- Verify target demographics

### Step 3: Score Relevance
Calculate scores based on:
- **Exact matches**: High score (condition in IPS matches SM tag)
- **Related concepts**: Medium score (hierarchical relationships)
- **Demographics**: Age/gender appropriateness
- **Literacy level**: Content complexity
- **Language**: Preferred vs. available

### Step 4: Rank & Filter
- Sort by relevance score
- Apply threshold (minimum score)
- Limit results (top N)
- Deduplicate similar content

### Step 5: Compose Response
Return structured list:
- SM resource references
- Relevance scores
- Matching reasons
- Display recommendations

## API Specification

### Request
```json
{
  "epi": { "resourceType": "Bundle", ... },
  "ips": { "resourceType": "Bundle", ... },
  "pv": { "resourceType": "Bundle", ... },
  "options": {
    "maxResults": 10,
    "minScore": 0.6,
    "contentTypes": ["aRMM", "HEM"],
    "languages": ["en", "es"]
  }
}
```

### Response
```json
{
  "matches": [{
    "smReference": "DocumentReference/sm-123",
    "score": 0.95,
    "reasons": ["pregnancy", "language-match"],
    "displayPriority": "high"
  }]
}
```

## Integration Points

### Lenses
[Lenses](./lens.md) use matchmaking to:
- Add hyperlinks to relevant SM
- Embed supplementary content
- Suggest educational materials

### Applications
Frontend apps use matchmaking to:
- Display "Related Information" sections
- Recommend educational content
- Provide context-sensitive help

### SM Tool
[SM Tool](./sm-tool.md) uses matchmaking to:
- Preview relevance
- Test tagging effectiveness
- Identify content gaps

## Performance Optimization

- **Caching**: Pre-compute common matches
- **Indexing**: Fast terminology lookups
- **Batch processing**: Multiple requests
- **CDN**: Deliver SM content efficiently

## Quality Metrics

Track:
- Match precision/recall
- User engagement with matched SM
- Content gap analysis
- Language coverage

## Related Concepts

- [Supporting Material](./supporting-material.md) - Matched content
- [IPS](./ips.md) - Patient context input
- [Persona Vector](./persona-vector.md) - Preferences input
- [ePI](./epi.md) - Medication context
- [SM Tool](./sm-tool.md) - Content management
- [Standard Terminologies](./standard-terminologies.md) - Matching basis
- [Lens](./lens.md) - Primary consumer
