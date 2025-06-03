# Creating a Connector

## Retrieval Strategies
Connectors can be implemented in several ways:

*   **Pull:** Connectors translate internal request into a request to the TSI, thus *pulling* the information when necesary
*   **Push:** Connectors can also be persistent services that expose an API to external services to call when something changes, thus external systems *pushing* the changes. 
*   **CronJobs:** These are executed periodically to fetch data.


## Technical Requirements for Integration

Since connectors, especially __Push-type__ ones, are services deployed within FOSPS, they must adhere to general platform considerations for new services:

*   **Kubernetes Deployment:** Every new service developed for FOSPS needs to include a Kubernetes deployment. This defines how your service runs within the Kubernetes cluster.
*   **Dockerfile:** The Kubernetes deployment implies the service must have a Dockerfile defined to enable containerization. This allows your service to be packaged and run consistently across different environments.
*   **Istio for Network Management:**
    *   If your new connector workload exposes any service over the internet (i.e., needs to be accessed from outside FOSPS), a **VirtualService** must be included to route the request via Istio.
    *   the connecto needs to be accessed by other services *within* FOSPS, therefore it must define a **Kubernetes Service**.
    *   To protect endpoints exposed by your service, include an **Istio AuthorizationRequest**. This defines rules based on authentication and authorization policies.
*   **OpenAPI Specification (OAS):** To define the API that your connector service exposes, an OAS (Swagger) file must be included. The FOSPS Swagger deployment needs to be edited to include the new file. FOSPS services provide their APIs in OpenAPI format.

All the information needed to set up the platform and extend its capabilities is available. Technical details regarding deployed components can be found in the Gravitate-Health GitHub documentation specifically for deployment.

## 7. Caching

The default multi-purpose connector developed for Gravitate-Health includes a **cache server**. This cache stores results of queries to resources outside FOSPS to avoid high-traffic queries, thereby speeding up the overall functioning of FOSPS.

## 8. Accessing Data from your Connector

Once deployed and integrated, other FOSPS services or applications can access the data your connector provides. This is typically done by interacting with the FOSPS FHIR server, which acts as a central point for accessing information potentially sourced via your connector. 
