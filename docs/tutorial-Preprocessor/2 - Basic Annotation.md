# Basic ePI Annotation

Semantic annotations in ePIs are embedded syntactically within the FHIR resource using markup language, specifically leveraging the HTML already present in the ePI's narrative content. The core component for achieving this is the [`HtmlElementLink` Extension](https://build.fhir.org/ig/hl7-eu/gravitate-health/StructureDefinition-HtmlElementLink.html).

The `HtmlElementLink` is a complex Extension designed for adding information to ePIs in the FHIR format, offering flexibility to include pictograms, images, video, or other types of information. This extension is used on the FHIR `Composition` resource, which is the core resource for holding the narrative text of the ePI, also known as the Patient Information Leaflet (PIL).

## `HtmlElementLink` Structure
This extension is composed of several nested elements, providing a structure to define the annotation and link it to terminology:

1. `extension:elementClass` (The Annotation Name)
    *   **Purpose:** This component dictates the location in the HTML where the annotation applies.
    *   **Role in Annotation:** It defines the name of the annotation.
    *   **Data Type:** Its value is a `stringValue`.
2. `extension:concept` (The Terminology Code)
    *   **Purpose:** This component holds the data to be used for the annotation.
    *   **Role in Annotation:** It typically represents a code from a standard terminology (e.g., SNOMED-CT) associated with the annotated text.
    *   **Data Type Flexibility:** The concept value (`value[x]`) is highly flexible and can be a:
        *   `base64Binary`.
        *   `stringValue`.
        *   `url`.
        *   `CodeableReference`.

3. `extension:type` (The Data Type)
    *   **Purpose:** This component specifies the type of data being linked, such as image, video, or text.
    *   **Data Type:** Its value is a `CodeableConcept`.

Preprocessors may need to add `HtmlElementLink` extensions so that the composition of the ePI contains all concepts the preprocessor is about to add to the narrative text.

## Linking the Annotation to the Narrative Text

The crucial step for Preprocessors is understanding how the metadata defined in the `HtmlElementLink` extension in the FHIR Composition resource links to the actual human-readable narrative text within that Composition.

1.  **The Linkage Mechanism:** The linkage is established by using the `elementClass` value (the annotation name) and applying it as an HTML `class` attribute within the Composition's narrative content.
2.  **HTML Location:** Preprocessors modify the embedded HTML code in the FHIR resource by adding this class attribute to the appropriate HTML tags that encompass the target text segment.
3.  **Target Elements:** Annotation is performed by selecting portions of text for reference. This typically involves utilizing existing HTML tags like headers (`<H1>`), lists (`<UL>`, `<IL>`), parragraphs (`<P>`), or by wrapping arbitrary text sections using `<span>` tags.

## Example Illustration (Conceptual)

Imagine a Preprocessor identifies a section of text discussing "Drug X and Pregnancy" that relates to the SNOMED code for 'Pregnancy Status'.

1.  **Preprocessor creates the `HtmlElementLink` extension metadata:**
    *   `extension:elementClass` might be set to: `"pregnancy-category-D"`
    *   `extension:concept` might link to the SNOMED-CT code for Pregnancy.

2.  **Preprocessor modifies the ePI narrative HTML:**
    The Preprocessor finds the relevant paragraph in the Composition's narrative (which contains the raw text) and modifies its HTML to include the defined `elementClass` as a `class` attribute:

    ```html
    <p class="pregnancy-category-D">Studies in women have demonstrated a risk to the fetus that outweighs the benefit.</p>
    ```

The existence of the `HtmlElementLink` entry in the Composition metadata, coupled with the matching HTML `class` attribute in the narrative text, constitutes the complete semantic annotation, resulting in the preprocessed ePI (p(ePI)). This semantic tag allows subsequent focusing Lenses to apply logic (such as highlighting or collapsing) based on the patient's context (e.g., if the patient's IPS/PV indicates pregnancy status).

### Practical Example in FHIR+JSON

The Implementation Guide of Graviate-Health, already provides [functional examples of Preprocessed ePIs](https://build.fhir.org/ig/hl7-eu/gravitate-health/artifacts.html#processed-epi). 

Let's look into [one of these examples](https://build.fhir.org/ig/hl7-eu/gravitate-health/Bundle-processedbundlekarveabik.json.html) in detail to highligh how the annotation is performed.
1. In the composition extensions we find:
```
{
  "resourceType" : "Bundle",
  
  ...

  "entry" : [{
    "resource" : {
      "resourceType" : "Composition",
      
      ... 
      
      "extension" : [,
      {
        "extension" : [{
          "url" : "elementClass",
          "valueString" : "pregnancyCategory"
        },
        {
          "url" : "concept",
          "valueCodeableReference" : {
            "concept" : {
              "coding" : [{
                "system" : "https://icpc2.icd.com/",
                "code" : "W78",
                "display" : "Pregnancy"
              }]
            }
          }
        }],
        "url" : "http://hl7.eu/fhir/ig/gravitate-health/StructureDefinition/HtmlElementLink"
      },
      
      ...

      ]
    }
  }
  ]
}
```
2. later in the text we find references to this `elementClass` applying the concept to a `<DIV>` tag, the following snippet can be found in path `entry[0].resource.text.div`, and `entry[0].resource.section[0].section[3].text.div`:
```
<div class=\"pregnancyCategory\">
   <p><strong>Pregnancy and breast-feeding</strong></p>
   <ul>
      <li>If you are pregnant or breast-feeding, think you may be pregnant or are planning to have a baby, ask your doctor or pharmacist for advice before taking this medicine.</li>
      <li>Tell your doctor immediately if you become pregnant and ask about the potential benefits and risks of your antiretroviral therapy to you and your child.</li>
   </ul>
   <p>If you have taken Biktarvy during your pregnancy, your doctor may request regular blood tests and other diagnostic tests to monitor the development of your child. In children whose mothers took nucleoside reverse transcriptase inhibitors (NRTIs) during pregnancy, the benefit from the protection against HIV outweighed the risk of side effects.</p>
   <div class=\"breastfeedingCategory\">
      <p><strong>Do not breast-feed during treatment with Biktarvy.</strong> This is because some of the active substances in this medicine pass into human breast milk. Breast-feeding is not recommended in women living with HIV because HIV infection can be passed on to the baby in breast milk. If you are breast-feeding, or thinking about breast-feeding, you should discuss it with your doctor as soon as possible.</p>
   </div>
</div>
```