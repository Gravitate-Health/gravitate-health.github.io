---
sidebar_position: 0
title: Reference Concepts
tags: [reference, overview]
---

# FOSPS Reference Concepts List 

## I. Platform Architecture and Components

These concepts define the structure and foundational technology of the Federated Open-Source Platform and Services (FOSPS):

*   **[FOSPS](./fosps.md) (Federated Open-Source Platform and Services):** The overall software platform designed using a microservices-based, three-layer architecture.
*   **[G-lens Solution/System](./g-lens.md):** The pioneering solution supported by FOSPS that empowers patients to access trustworthy, personalized Electronic Product Information (ePI).
*   **[Architectural Layers](./architectural-layers.md) (App, Service, Data):** The fundamental three layers used to structure the FOSPS components.
*   **[FHIR Server](./fhir-server.md):** The internal component often implemented using the HAPI FHIR JPA Server Starter, responsible for managing FHIR resources like cached ePIs and Provenance records.
*   **[Connectors](./connectors.md) (FHIR/ePI/IPS Connector):** Modules responsible for modularizing access to external Trusted Sources of Information (TSI) and performing necessary format transformations into FHIR format.
*   **[Kubernetes (k8s) Deployment & Helm Charts](./kubernetes-deployment.md):** The underlying orchestration technology and packaging system used for deploying FOSPS components.
*   **[Istio](./istio.md) (Service Mesh):** The mechanism used for network management, providing traffic control, security, and acting as the Service Mesh and Gateway.
*   **[OpenAPI Specification (OAS) & Swagger UI](./openapi.md):** The standard used for API documentation, exposed through the Swagger deployment, allowing developers to understand service endpoints.

## II. Core Data Models and Inputs

These concepts represent the key information assets handled, retrieved, or created by the FOSPS.

*   **[Electronic Product Information (ePI)](./epi.md):** The digital document, standardized in a FHIR format (FHIR ePI IG), which contains regulated and scientifically validated medicinal product information, including the Patient Information Leaflet (PIL).
*   **[ePI Bundle](./epi-bundle.md) (FHIR Resource):** The container resource used to group the `Composition` and other related resources to reproduce the local label template in a semi-structured format.
*   **[International Patient Summary (IPS)](./ips.md):** An electronic health record extract containing essential healthcare information about a patient, used as context for personalization.
*   **[Persona Vector (PV)](./persona-vector.md):** A standardization element designed to codify and standardize the context and preferences of the user, supplementing the IPS for use in the focusing mechanism.
*   **[Supporting Material (SM)](./supporting-material.md):** A broad term encompassing both regulated Additional Risk Minimization Measures (**aRMM**) and non-regulated Health Education Material (**HEM**), intended to complement the ePI.
*   **Additional Support Material Profile:** The FHIR resource (based on `DocumentReference`) used to store the metadata for [Supporting Material](./supporting-material.md), including source, language, and associated terminology codes.
*   **[Standard Terminologies](./standard-terminologies.md) (SNOMED-CT, ICPC-2, etc.):** The common language used within FOSPS to semantically annotate content and ensure interoperability across services (e.g., used for preprocessing and matchmaking).

## III. Focusing Mechanism and Workflow

These concepts describe the core process of personalizing the ePI content for the end-user.

*   **[Focusing](./focusing.md):** The process defined as "Adapting information to the context of the end user for effective and optimal understanding of the information" without modifying the regulated content itself.
*   **[Focusing Manager](./focusing-manager.md):** The central orchestration component of the focusing module that coordinates Preprocessors, Lens Selectors, the Lens Execution Environment (LEE), and data retrieval to generate the focused ePI.
*   **[Preprocessor](./preprocessor.md):** A pluggable service that semantically annotates raw ePIs using standard terminologies (like SNOMED-CT or ICPC-2) to generate a Preprocessed ePI (p(ePI)).
*   **[Preprocessed ePI (p(ePI))](./p-epi.md):** The intermediate state of the ePI after semantic annotations have been embedded, preparing it for lens execution.
*   **[Lens](./lens.md):** A conceptual piece of code (packaged as a FHIR `Library` resource) that encodes clinical or context-specific knowledge, applying transformation rules (highlighting, collapsing, supplementing) based on the IPS and PV.
*   **[Lens Execution Environment (LEE)](./lee.md):** The service that executes the lens logic on the p(ePI) using the patient's contextual data (IPS/PV) to produce the final outcome.
*   **[Focused ePI (f(ePI))](./f-epi.md):** The final personalized output of the focusing process, adapted for a specific patient's context.
*   **[Attention Detail Modification](./attention-modification.md):** The specific non-content changes applied by lenses, categorized by **"highlight"** (increased attention) and **"collapse"** (decreased attention) CSS classes.

## IV. Trust, Security, and Quality Components

These modules enforce security, traceability, and monitoring within the platform.

*   **[Content Trust Framework (CTF)](./ctf.md):** The module responsible for digitally certifying and signing content (FHIR resources) to maintain trustworthiness, integrity, and traceability across the production chain.
*   **[Provenance Statements](./provenance.md) (FHIR Resource):** A FHIR record that describes Agents (actors), Entities (resources), and Activities (processes) involved in creating, transforming, or influencing a resource, used as the basis for the CTF.
*   **[Audit Log](./audit-log.md):** A trust component that provides granular auditability for system logs with immutable proofs, enhancing security and log authenticity throughout the platform's lifecycle.
*   **[Trust Function (TF)](./trust-function.md):** A serverless function that consumes the provenance tree of a resource and translates the accumulated metadata into a quantifiable trust level for the user or system.
*   **[Keycloak](./keycloak.md):** The open-source identity and access management (IAM) tool used by FOSPS to handle Authorization and Authentication (OIDC/OAuth protocols).
*   **[Metric Management System](./metrics.md) (Grafana/Prometheus/Loki Stack):** The subsystem used for collecting, storing, processing, and monitoring technical Key Performance Indicators (KPIs) and logs in real-time to ensure system health.
*   **Metric Management System (Grafana/Prometheus/Loki Stack):** The subsystem used for collecting, storing, processing, and monitoring technical Key Performance Indicators (KPIs) and logs in real-time to ensure system health.
## V. Tools and Specialized Services

These are the user-facing interfaces or specialized services built on top of the core FOSPS platform.

*   **[Focusing Inspector](./focusing-inspector.md):** A proposed tool for professional stakeholders (developers, etc.) providing a user interface to check the results of pre-processed ePIs and the application of lenses, supporting both programmer and end-user views.
*   **[Supporting Material Tool (SM Tool)](./sm-tool.md):** A proposed tool designed to facilitate the management, curation, and matchmaking of Supporting Material (SM/aRMM/HEM) to patient profiles/IPS.
*   **[Content Trust Framework Inspector (CTF Inspector)](./ctf-inspector.md):** A proposed tool allowing users to inspect, verify, and create provenance statements and analyze the validity of resources, especially for Trust Function developers.
*   **[Annotation Tool](./annotation-tool.md):** A proposed tool to allow experts to semantically annotate free text in ePIs with standard terminology labels, serving as manual pre-processing or generating data for training NLP models.
*   **[Supporting Material Matchmaking](./sm-matchmaking.md):** The process enabled by an API that takes ePI, IPS, and PV as input and returns composed material that matches the terms, conditions, and languages present in the input data.
*   **[Natural Language Processing (NLP) Services](./nlp-services.md):** Proposed Artificial Intelligence services, potentially including automatic ePI preprocessors, SM topic extractors, and Summary Lenses, using models like Name Entity Recognition (NER).
*   **Natural Language Processing (NLP) Services:** Proposed Artificial Intelligence services, potentially including automatic ePI preprocessors, SM topic extractors, and Summary Lenses, using models like Name Entity Recognition (NER).