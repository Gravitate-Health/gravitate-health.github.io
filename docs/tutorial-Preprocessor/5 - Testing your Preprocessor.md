# Documentation: Testing Preprocessor Services

The primary objective when testing a preprocessor service is to ensure that it successfully **adds semantic annotations** to the Electronic Product Information (ePI) content, transforming a raw ePI into a preprocessed ePI (p(ePI)), while strictly adhering to compliance rules regarding content modification,.

## 1. Preprocessor Development Constraints (Integrity Check)

Preprocessors are integral to the focusing process, which adapts medicinal product information without compromising regulatory requirements,.

| Constraint | Detail |
| :--- | :--- | 
| **Non-Modification of Content** | Preprocessors **must not remove any original content** from the ePI,. |
| **Scope of Editing** | Changes are restricted to adding content and/or embedding annotations. Specifically, preprocessors should only add semantic annotations to the package leaflet sections of the ePI; **no other field in the ePI can be edited**. |
| **Annotation Goal**| The goal is to semantically annotate the ePI using standard terminologies (e.g., SNOMED-CT or ICPC-2) to create a structured representation of the information, which is necessary for later execution of lenses,,. |

## 2. Testing Environment: Focusing Inspector Tool

Developers can test and validate preprocessor functionality using the **Focusing Inspector** tool,. This tool is designed primarily for developers and professional stakeholders to inspect the results of pre-processed ePIs and the subsequent application of lenses,.

The Focusing Inspector serves as a user interface that accesses the core functionalities of the platform, interfacing directly with the **Focusing Manager** for pre-processing requests.

Developers can locate the focusing inspector tool as part of the toolset of the [focusing-SDK](https://github.com/Gravitate-Health/focusing-SDK).

## 3. Verification Steps for Preprocessor Testing

To confirm that the preprocessor has accurately annotated the ePI and maintained data integrity, follow these steps within the Focusing Inspector:

### Step 1: Execute Pre-processing

1.  Select the desired raw ePI within the Focusing Inspector interface,,.
2.  Select the specific preprocessor (or subset of preprocessors) to invoke.
3.  Trigger the pre-processing operation.

### Step 2: Analyze Content Changes (Crucial Step)

Because the annotations (such as the addition of classes to HTML tags) added by the preprocessor may be **invisible in the standard HTML rendered view**, verification must be performed using a detailed code comparison feature.

1.  Ensure the display mode is **code**.
2.  Use the functionality provided by the tool to inspect the differences between the original ePI state and the state **after pre-processing**.
3.  Verify that changes consist exclusively of the addition of semantic annotations (e.g., insertion of HTML tags like `<span>` with corresponding classes or extensions),.
4.  Confirm that absolutely **no original text content has been altered or removed** between the "before focusing" state and the "after pre-processing" state,,.

The interface should help the user distinguish between the document states using a "diff-like tool" metaphor to clarify the changes introduced during the pre-processor stage. This process confirms that the resulting p(ePI) is compliant and ready for the subsequent focusing steps.