---
sidebar_position: 1
---

# Introducing FOSPS: Your Gateway to Innovative Digital Health Solutions

Welcome, innovators and developers! This document introduces you to the **Federated Open-Source Platform and Services (FOSPS)**, a core component of the Gravitate-Health project. FOSPS is designed to empower patients with digital tools for active personal health management and adherence to treatment by providing access to actionable, understandable, and reliable health information.

If you're looking to integrate new components, develop specialized services, or build applications that leverage trustworthy health data, FOSPS provides a robust and flexible framework.

## What is FOSPS?

FOSPS is a **Federated Open-Source Platform and Services** that serves as the IT infrastructure and services for the Gravitate-Health project's G-lens system. It adopts a **microservice architecture**, which means it's built from independently deployable and loosely coupled components, ensuring agility, scalability, and autonomy.

The platform is structured in three layers:
*   **App Layer**: This includes front-end applications for end-users like patients and healthcare professionals (HCPs), as well as web interfaces for administrators and developers.
*   **Service Layer**: This is where the core operations occur, housing processing and analysis components, AI services, and connectors to data sources.
*   **Data Layer**: This layer contains the platform's data sources in a standardized form, including both sensitive (e.g., patient data) and non-sensitive (e.g., public health information) data.

A key characteristic of FOSPS is its **federated** nature, allowing for deployment across multiple centers, often managed by different entities (like national health services), while still enabling cooperation and interoperable connections between instances.

## Key Concepts for Developers

To effectively interact with FOSPS, it's helpful to understand some core concepts:

*   **G-lens**: This is the overarching solution and trademarked name for the Gravitate-Health system. It creates a focused, personalized view of electronic product information (ePI) for citizens.
*   **ePI (Electronic Product Information)**: A digital document that provides regulated and scientifically validated information about a medicinal product, similar to a patient information leaflet (PIL). FOSPS focuses on making ePIs more understandable and actionable.
*   **IPS (International Patient Summary)**: A standardized electronic health record extract containing essential healthcare information about a patient. This is sensitive data and crucial for personalizing information.
*   **Supporting Material (SM) / Risk Minimization Measures (RMM) / Health Education Material (HEM)**: These terms refer to complementary digital content that supports ePIs or general health education. RMMs are regulated materials, while HEMs are less regulated but still come from trusted sources. FOSPS manages this content to provide relevant supplemental information.
*   **Focusing Mechanism**: This is the process of adapting ePI information to the specific context of an end-user to achieve optimal understanding. It involves operations like highlighting, collapsing, or adding new content.
*   **Lenses**: These are pieces of code that encode specific knowledge (e.g., medical facts, cultural aspects, patient preferences) and logic. Lenses determine how ePI content should be adapted during the focusing process (e.g., which sections to highlight or collapse).
*   **Preprocessors**: These are software services that semantically annotate raw ePIs, categorizing text units with medical terms or patient characteristics (like age or gender) using standard terminologies (e.g., SNOMED-CT, ICPC-2). This "preprocessed ePI" (p(ePI)) is then ready for lenses.
*   **Content Trust Framework (CTF)**: A set of tools and services designed to establish and assess the trustworthiness of digital content. It uses techniques like digital signatures, hashing, and provenance tracking to ensure content integrity, origin, and certifications.
*   **Provenance**: A FHIR standard record that describes the agents (actors), entities (resources), and activities (processes) involved in producing, delivering, or influencing a resource. It creates a comprehensive supply chain record for content, enabling traceability.
*   **FHIR (Fast Healthcare Interoperability Resources)**: The interoperability standard upon which FOSPS is built. It defines rules and specifications for exchanging healthcare data electronically.
*   **API (Application Programming Interface)**: FOSPS services expose their functionalities through REST APIs, enabling standard communication between different components and external applications.
*   **Audit Log**: A component that provides granular auditability for all platform activity, maintaining an immutable and non-repudiable trace of events using blockchain technology.

## How FOSPS Helps You Develop

FOSPS offers a comprehensive framework and resources for developers to integrate new components and extend its functionalities:

### Open Source and Collaboration
    *   FOSPS is an **open-source platform**, and much of its development is transparently managed on GitHub, providing access to source code, documentation, and sprints.
    *   The platform is designed to foster collaboration and allows for the integration of **3rd party developments**.

### Standardized and Interoperable Foundation
    *   FOSPS is built upon **HL7 FHIR standards**, ensuring high interoperability with a wide array of existing and future healthcare systems. This simplifies data exchange and integration.
    *   The use of **standard terminologies** (e.g., SNOMED-CT, ICPC-2) ensures consistency and enables core functions like focusing and material matchmaking.

### Extensible Architecture
    *   The **microservice architecture** allows for modularity and flexibility. You can choose which components to run, develop your own, and integrate them into the platform.
    *   FOSPS provides a small set of **optional front-end applications (Web User Interfaces)** targeted towards secondary stakeholders like platform administrators, HCPs, and developers.

## Specific Development Avenues

### Lenses Development
        *   Lenses are FHIR objects encoding JavaScript code, packaged using the Lens Profile archetype.
        *   The [FHIR Lens bunbler](https://github.com/Gravitate-Health/fhir-lens-bundler) tool can be used to aide in the packaging.
        *   Javastript code must comply with a "function interface" so it can be invoked from the Lens Execution Environment.
        *   You can use helper methods to `modifyCSSClass()` (for highlighting or collapsing sections) or `addNewContent()` (for adding HTML tags, hyperlinks, images, videos, or interactive elements).
        *   Lenses cannot remove or directly alter ePI content due to legal regulations, only change its display format.
        *   Lenses can operate on both server-side and client-side focusing modes.

### Preprocessor Development
        *   Preprocessors are pluggable services that semantically annotate ePIs.
        *   To be discovered by FOSPS, your Kubernetes deployment needs to include the label `eu.gravitate-health.fosps.preprocessing=true`.
        *   They must [implement an endpoint](https://github.com/Gravitate-Health/preprocessing-service-example/blob/main/openapi.yaml) with the path `/preprocess` that receives an ePI and returns its preprocessed version, updating its category from "Raw" to "Preprocessed".

### Connector Development
        *   Connectors are modules responsible for retrieving and transforming information from diverse sources into standard FHIR resources.
        *   They can operate in various modes, such as `fhs-git` (syncing from Git repositories), `HAPI FHIR sync` (syncing from other FHIR servers), or `FHIR proxy` (acting as a proxy for FHIR resources).
        *   Connectors generate **provenance statements** for actions like resource access, supporting the CTF.
        *   They can implement a cache server to optimize queries to external resources.
        *   To be auto-discovered by FOSPS, Kubernetes cron jobs for connectors need to include the label `eu.gravitate-health.fosps.connector: 'true'`.

### Specialized Extended Services Development
        *   You can develop new microservices from scratch in any language or tool, provided they include a Dockerfile for containerization.
        *   These services can connect to existing FOSPS services using their APIs.
        *   For external access, an Istio `VirtualService` must be included.
        *   The use of the **Audit Log** for maintaining validated logs is highly encouraged for new services.

### Patient Application Development (Frontend)
        *   Frontend applications can interact with FOSPS APIs for authentication/authorization, FHIR server access, and focusing mechanisms.
        *   FOSPS uses **Keycloak** as the Identity Provider for authentication and authorization, supporting standard protocols like OAuth 2.0 and OpenID Connect for Single-Sign-On solutions.

## Trust and Monitoring Infrastructure
    *   **Content Trust Framework (CTF)** components (Integrity Module, Provenance Engine, Trust Functions) ensure the integrity, authenticity, and traceability of all content handled by the platform. This is critical for building trust in health information.
    *   The **Audit Log** provides immutable, blockchain-backed logging for all platform activities, enhancing security and auditability.
    *   The **Metrics Manager** (using Grafana/Prometheus) offers comprehensive monitoring capabilities for system health, performance, and usage, with customizable dashboards for administrators.

By leveraging these features and following the provided guidelines, developers can build powerful, trustworthy, and user-centric digital health solutions on top of the FOSPS platform.
