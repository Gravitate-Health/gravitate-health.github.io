# FHIR Metadata

:::info Lens Profile
The **[Lens Profile](https://build.fhir.org/ig/hl7-eu/gravitate-health/StructureDefinition-lens.html)** is the FHIR resource archetype used to package Lenses, which encode the specific logic (algorithm) required to automatically adapt ePI content for personalization. This profile is derived from the standard [FHIR Library resource](https://build.fhir.org/library.html).
:::

Lenses are treated as fully fledged FHIR resources and must contain both the operational code and descriptive metadata. The specification requires several key fields, many of which can include translations via the FHIR `extension:translation` [mechanism](https://build.fhir.org/ig/HL7/fhir-extensions/StructureDefinition-translation.html).

---

## Key Fields for Lens Resource Creation (Lens Profile)

### 1. Lens Code and Data (`content` Element)

:::warning Security
This element contains the executable algorithm of the lens. The lens code handles sensitive information and requires close monitoring, making the integrity of this field essential.
:::

| FHIR Path | Description | Constraints & Usage |
| :--- | :--- | :--- |
| **`content.data`** | The code of the lens - base64. This field stores the executable piece of code. | This is a **required** Must-Support (S) element. The value must be the data inline, Base64 encoded (`base64Binary`). The LEE will decode this from Base64 and interpret it as UTF-8. The recommended language for lens code is JavaScript. |
| **`content.contentType`** | Mime type of the content. | This field specifies the data type, usually matching the coding language (e.g., `application/javascript` for JavaScript code). |

### 2. Name, Title, and Identification

These fields provide technical and human-readable labels for the lens.

| FHIR Path | Description | Constraints & Usage |
| :--- | :--- | :--- |
| **`name`** | Name for this library (computer friendly). | **Required** (C1..1) and Must-Support (SΣ). This name should be usable as an identifier by machine processing applications. |
| **`title`** | Name for this library (human friendly). | This field is a standard FHIR string element. |
| **`identifier`** | Additional identifier for the library. | This is a required Must-Support (SΣ) element. |
| **`version`** | Business version of the library. | **Required** describes the version of this lens. |

### 3. Descriptive Metadata

:::note Purpose
These fields communicate the functional and scientific context of the lens to both developers and end-users.
:::

| FHIR Path | Description | Constraints & Usage |
| :--- | :--- | :--- |
| **`publisher`** | Name of the publisher/steward (organization or individual). | This field indicates who is responsible for the lens development. |
| **`description`** | Documentation. This should detail what the lens "does". | **Required** (1..1) Must-Support (SΣ) field using Markdown format. |
| **`purpose`** | Intent. This describes why the lens should be used and the scientific basis or kind of conditions it is looking for. | **Required** (1..1) Must-Support (S) field using Markdown format. |
| **`type`** | The type of knowledge asset this library contains. | This is a required field fixed to the value of `logical-library`. |
| **`subject[x]`** | Type of individual the library content is focused on. | Must-Support element. |
| **`jurisdiction`** | Countries and regions within which this artifact is targeted for use. | This is an important Must-Support field because Trust Functions (TF) can be customized for different regions (jurisdictional based TF). |
| **`extension:lee-version`** | LEE version - string. | This is a **mandatory extension** required to indicate compatibility with the Lens Execution Environment (LEE). |

:::tip Regional Customization
The `jurisdiction` field is particularly important as Trust Functions can be customized for different regions, enabling jurisdictional-based Trust Functions.
:::

---

## FHIR Lens Example (Conceptual Snippet)

The Lens Profile is structured as a FHIR `Library` resource. A developer would populate these fields using JSON (or XML) formatting:

```json
{
  "resourceType": "Library",
  "meta": {
    // Reference to the Lens Profile
    "profile": [ "http://hl7.eu/fhir/ig/gravitate-health/StructureDefinition/lens" ]
  },
  "extension": [
    // 1. Mandatory LEE Version Extension
    {
      "url": "http://hl7.eu/fhir/ig/gravitate-health/StructureDefinition/lee-version",
      "valueString": "dev" 
    }
  ],
  "identifier": [ 
    // Identifier must follow the specified system pattern
    {
      "system": "http://gravitate-health.lst.tfo.upm.es",
      "value": "my-lens-v1" 
    }
  ],
  "version": "1.0.0", 
  "name": "MyLens", // Computer friendly name
  "title": "My Warning Lens", // Human friendly name
  "status": "active", // Required status
  "type": { // Fixed value defining resource type as logical-library
    "coding": [
      {
        "code": "logical-library" 
      }
    ]
  },
  "publisher": "Gravitate Health Team", // Organization responsible
  "description": "This lens highlights sections related to my specific risk/safety, based on a patient's gender and age.", // Documentation (Markdown)
  "purpose": "To improve patient safety and understanding of medicinal risks by emphasizing relevant text.", // Intent (Markdown)
  "jurisdiction": [
    {
      "coding": [
        {
          "display": "European Union" 
        }
      ]
    }
  ],
  "content": [
    {
      "contentType": "application/javascript",
      "data": "ZnVuY3Rpb24gZW5oYW5jZSgpIHsgLy8gQmFzZTY0IGVuY29kZWQgbGVucyBjb2RlLi4uIH0=" 
      // Base64-encoded UTF-8 JavaScript code for the lens (LEE decodes Base64 → UTF-8)
    }
  ]
}
```