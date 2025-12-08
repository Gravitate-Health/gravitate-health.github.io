---
sidebar_position: 1
---

# Introducing FOSPS: Your Gateway to Innovative Digital Health Solutions

:::tip Welcome Developers!
This document introduces you to the **Federated Open-Source Platform and Services (FOSPS)**, a core component of the [Gravitate-Health project](https://www.gravitatehealth.eu/). FOSPS is designed to empower patients with digital tools for active personal health management and adherence to treatment by providing access to actionable, understandable, and reliable health information.
:::

If you're looking to integrate new components, develop specialized services, or build applications that leverage trustworthy health data, FOSPS provides a robust and flexible framework.

## What is FOSPS?

:::info Platform Overview
FOSPS is a **Federated Open-Source Platform and Services** that serves as the IT infrastructure and services for the Gravitate-Health project's G-lens system. It adopts a **microservice architecture**, which means it's built from independently deployable and loosely coupled components, ensuring agility, scalability, and autonomy.
:::

### Platform Architecture

The platform is structured in three layers:

#### 1. App Layer

This includes front-end applications for end-users like patients and healthcare professionals (HCPs), as well as web interfaces for administrators and developers.

#### 2. Service Layer

This is where the core operations occur, housing processing and analysis components, AI services, and connectors to data sources.

#### 3. Data Layer

This layer contains the platform's data sources in a standardized form, including both sensitive (e.g., patient data) and non-sensitive (e.g., public health information) data.

:::note Federated Architecture
A key characteristic of FOSPS is its **federated** nature, allowing for deployment across multiple centers, often managed by different entities (like national health services), while still enabling cooperation and interoperable connections between instances.
:::

## Key Concepts for Developers

:::tip Essential Terminology
To effectively interact with FOSPS, it's helpful to understand some core concepts:
:::

* **G-lens**: This is the overarching solution and trademarked name for the Gravitate-Health system. It creates a focused, personalized view of electronic product information (ePI) for citizens.

* **Electronic Product Information (ePI)**: A digitally structured, regulator-approved source of authoritative information about a medicinal product. The Federated Open-Source Publishing System (FOSPS) enhances the clarity, accessibility, and practical usefulness of ePIs for patients, caregivers, and healthcare professionals.

* **International Patient Summary (IPS)**: A standardized, cross-border extract of a patient’s essential health information, designed to support continuity of care. Because it contains sensitive personal health data, the IPS plays a central role in safely tailoring medication information to individual needs.

* **Supporting Material (SM) / Risk Minimization Measures (RMM) / Health Education Material (HEM)**: These terms refer to complementary digital content that supports ePIs or general health education. RMMs are regulated materials, while HEMs are less regulated but still come from trusted sources. FOSPS manages this content to provide relevant supplemental information.

* **Focusing Mechanism**: This is the process of adapting ePI information to the specific context of an end-user to achieve optimal understanding. It involves operations like highlighting, collapsing, or adding new content.

* **Lenses**: These are pieces of code that encode specific knowledge (e.g., medical facts, cultural aspects, patient preferences) and logic. Lenses determine how ePI content should be adapted during the focusing process (e.g., which sections to highlight or collapse).

* **Preprocessors**: These are software services that semantically annotate raw ePIs, categorizing text units with medical terms or patient characteristics (like age or gender) using standard terminologies (e.g., SNOMED-CT, ICPC-2). This "preprocessed ePI" (p(ePI)) is then ready for lenses.

* **Cyber Trust Framework (CTF)**: A set of tools and services designed to establish and assess the trustworthiness of digital content. It uses techniques like digital signatures, hashing, and provenance tracking to ensure content integrity, origin, and certifications.

* **Provenance**: A FHIR standard record that describes the agents (actors), entities (resources), and activities (processes) involved in producing, delivering, or influencing a resource. It creates a comprehensive supply chain record for content, enabling traceability.

* **HL7 FHIR (Fast Healthcare Interoperability Resources)**: The interoperability standard upon which FOSPS is built. It defines rules and specifications for exchanging healthcare data electronically.

* **API (Application Programming Interface)**: FOSPS services expose their functionalities through REST APIs, enabling standard communication between different components and external applications.

* **Audit Log**: A component that provides granular auditability for all platform activity, maintaining an immutable and non-repudiable trace of events using blockchain technology.

## How FOSPS Helps You Develop

:::info Development Framework
FOSPS offers a comprehensive framework and resources for developers to integrate new components and extend its functionalities:
:::

### Open Source and Collaboration

* FOSPS is an **open-source platform**, and much of its development is transparently managed on GitHub, providing access to source code, documentation, and sprints.
* The platform is designed to foster collaboration and allows for the integration of **3rd party developments**.

### Standardized and Interoperable Foundation

* FOSPS is built upon **HL7 FHIR standards**, ensuring high interoperability with a wide array of existing and future healthcare systems. This simplifies data exchange and integration.
* The use of **standard terminologies** (e.g., SNOMED-CT, ICPC-2) ensures consistency and enables core functions like focusing and material matchmaking.

### Extensible Architecture

* The **microservice architecture** allows for modularity and flexibility. You can choose which components to run, develop your own, and integrate them into the platform.
* FOSPS provides a small set of **optional front-end applications (Web User Interfaces)** targeted towards secondary stakeholders like platform administrators, HCPs, and developers.

## Specific Development Avenues

### Lenses Development

:::info Lens Capabilities
Lenses are HL7 FHIR objects encoding JavaScript code, packaged using the [Lens Profile](https://build.fhir.org/ig/hl7-eu/gravitate-health/StructureDefinition-lens.html).
:::

**Key Points:**

* The [FHIR Lens bundler](https://github.com/Gravitate-Health/fhir-lens-bundler) tool can be used to aid in the packaging.
* JavaScript code must comply with a "function interface" so it can be invoked from the Lens Execution Environment.
* You can use helper methods to `modifyCSSClass()` (for highlighting or collapsing sections) or `addNewContent()` (for adding HTML tags, hyperlinks, images, videos, or interactive elements).
* Lenses cannot remove or directly alter ePI content due to legal regulations, only change its display format.
* Lenses can operate on both server-side and client-side focusing modes.

### Preprocessor Development

:::tip Semantic Annotation
Preprocessors are pluggable services that semantically annotate ePIs.
:::

**Requirements:**

* To be discovered by FOSPS, your Kubernetes deployment needs to include the label:

  ```yaml
  eu.gravitate-health.fosps.preprocessing=true
  ```

* They must [implement an endpoint](https://github.com/Gravitate-Health/preprocessing-service-example/blob/main/openapi.yaml) with the path `/preprocess` that receives an ePI and returns its preprocessed version, updating its category from "Raw" to "Preprocessed".

### Connector Development

:::info Data Integration
Connectors are modules responsible for retrieving and transforming information from diverse sources into standard FHIR resources.
:::

**Capabilities:**

* They can operate in various modes, such as `fhs-git` (syncing from Git repositories), `HAPI FHIR sync` (syncing from other FHIR servers), or `FHIR proxy` (acting as a proxy for FHIR resources).
* Connectors generate **provenance statements** for actions like resource access, supporting the CTF.
* They can implement a cache server to optimize queries to external resources.
* To be auto-discovered by FOSPS, Kubernetes cron jobs for connectors need to include the label:

  ```yaml
  eu.gravitate-health.fosps.connector=true
  ```

### Specialized Extended Services Development

:::tip Custom Services
You can develop new microservices from scratch in any language or tool, provided they include a Dockerfile for containerization.
:::

**Requirements:**

* These services can connect to existing FOSPS services using their APIs.
* For external access, an Istio `VirtualService` must be included.
* The use of the **Audit Log** for maintaining validated logs is highly encouraged for new services.

### Patient Application Development (Frontend)

:::info Frontend Integration
Frontend applications can interact with FOSPS APIs for authentication/authorization, FHIR server access, and focusing mechanisms.
:::

**Authentication:**

* FOSPS uses **Keycloak** as the Identity Provider for authentication and authorization, supporting standard protocols like OAuth 2.0 and OpenID Connect for Single-Sign-On solutions.

---

## Trust and Monitoring Infrastructure

:::note Security & Monitoring
**Key Infrastructure Components:**

* **Cyber Trust Framework (CTF)** components (Integrity Module, Provenance Engine, Trust Functions) ensure the integrity, authenticity, and traceability of all content handled by the platform. This is critical for building trust in health information.

* **Audit Log** provides immutable, blockchain-backed logging for all platform activities, enhancing security and auditability.

* **Metrics Manager** (using Grafana/Prometheus) offers comprehensive monitoring capabilities for system health, performance, and usage, with customizable dashboards for administrators.
:::

---

:::tip Start Building
By leveraging these features and following the provided guidelines, developers can build powerful, trustworthy, and user-centric digital health solutions on top of the FOSPS platform.
:::
