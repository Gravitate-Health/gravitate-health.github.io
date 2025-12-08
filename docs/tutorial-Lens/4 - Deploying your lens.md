# Deploying your Lens

Lenses are typically deployed using a Lens selector. The Focusing Manager uses Lens selectors to securely access the available lenses. 

- **server-side-focusing**: To deploy your lens in the server you should ensure that it is served through one of the confifured Lens selectors.
- **client-side-focusing**: The client should have access to the FHIR bundled lens. Thus you need to ensure this artifact is available and publish the access mechanism (e.g. throug GithHub releasess mechanism)


## Lens Selector
The **Lens Selector** is a key component within the Focusing Mechanism module of the Federated Open-Source Platform and Services (FOSPS). It is implemented as an internal service that provides the actual focusing algorithms (lenses) to the platform.

### Purpose

The primary purpose of the Lens Selector is to manage and provide access to available lenses. It indexes known lenses, often from a repository, thereby letting the **Focusing Manager** know which lenses are available for use. This design ensures flexibility, allowing new lenses to be easily appended to the system once recognized by the selector.

### Mechanism for Providing Lenses

The Lens Selector operates as an internal service, exposing its functionality via a REST API interface that must be compliant with the OpenAPI Specification and listens for HTTP connections.

1.  **Discovery:** For the Focusing Manager to find and use the service, the Lens Selector's Kubernetes deployment must include the specific label selector: `eu.gravitate-health.fosps.focusing: "True"`.
2.  **Listing:** The Lens Selector first lists the available lenses and their metadata to the Focusing Manager.
3.  **Delivery:** When the Focusing Manager (or the requesting client via the Focusing Manager) requests a specific lens by name, the Lens Selector service sends the corresponding lens code and its accompanying metadata. The Focusing Manager orchestrates this interaction internally.

### Available Lens Selectors
The current implementations of lens selectors are:
- **[Lens Selector FHIR](https://github.com/Gravitate-Health/lens-selector-fhir)**: performs a FHIR query against a FHIR server to find the lens. Lenses should be pushed to this server to be deployed.
- **[Lens Selector File](https://github.com/Gravitate-Health/lens-selector-file)**: Looks for valid lenses in a local folder, looking for `.json` files. If a lens is missing its code, it will attempt to bundle js code from a similarly named file.
- **[Lens Selector GIT](https://github.com/Gravitate-Health/lens-selector-git)**: same as the Lens Selector File, but it clones and maintains updated a git repository.