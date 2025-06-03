---
sidebar_position: 1
---

# Introduction

The primary purpose of connectors is to provide access to **Trusted Sources of Information (TSI)**. These sources can include regulated data like electronic Product Information (ePI) or patient-specific data like the International Patient Summary (IPS).

Connectors are modules responsible for providing access to sources of information, translating information to the standards used in the platform, and respecting all the rules of organization and access for each source. The platform's customizability in terms of information sources is achieved by adding the appropriate connector for a specific type, source, and format of information.

FOSPS is designed and implemented based on standards, specifically the acquisition, processing, and displaying of **HL7-FHIR resources**. Connectors are central to this, handling the translation of information into the FHIR standard if necessary.


## Types of resources

The types of resources connectors can provide access to are:

*   **[ePI](https://build.fhir.org/ig/HL7/emedicinal-product-info/):** Developed for collecting ePI, which is formalized in a FHIR standard (FHIR ePI IG) and serves as the source of regulated and scientifically validated information. Different ePI connectors can be activated in each FOSPS instance, allowing access to ePIs from all active sources. 
*   **[IPS:](https://build.fhir.org/ig/HL7/fhir-ips/)** Similar to ePI connectors, but designed to access IPS data .
*   **[Pesona Dimention Collection:](https://build.fhir.org/ig/hl7-eu/gravitate-health/StructureDefinition-persona-collection.html)** Complementary information about the patient which may be relevant to FOSPS functions, but not collected in the IPS.
*   **[Additional Support Material Profile:](https://build.fhir.org/ig/hl7-eu/gravitate-health/StructureDefinition-AdditionalSupportMaterial.html)** reference to documents that complement the ePI for better patient understanding and adherence.
*   **[Lens Profile:](https://build.fhir.org/ig/hl7-eu/gravitate-health/StructureDefinition-lens.html)** Access Lenses for personalization of content for the patient. 


## Development Approach

When developing a connector, you have two main options:

1.  **Extend the current multi-purpose connector:** The connector developed for Gravitate-Health aims to unify possible functionalities in a single development that can be configured upon deployment.
2.  **Develop a new one from scratch:** You can also build a new connector tailored to your specific needs as long as it follows the integration schemas.


 Connectors are containers that are invoked using a standardised REST-API by the FOSPS when it needs to retrieve resources it does not have cached. 

