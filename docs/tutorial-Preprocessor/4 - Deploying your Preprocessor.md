# Deploying Preprocessors

Preprocessors are pluggable software services within the Federated Open-Source Platform and Services (FOSPS) that automatically annotate Electronic Product Information (ePIs) for use in the focusing mechanism. They read the Package Leaflet of an ePI and add semantic annotations to the text, preparing the raw ePI resource to become a preprocessed ePI (p(ePI)).

The preprocessor service must implement an endpoint located at the path `/preprocess` (specified in [OpenAPI](https://raw.githubusercontent.com/Gravitate-Health/preprocessing-service-example/refs/heads/main/openapi.yaml))and listen for HTTP connections. The focusing manager will determine automatically the port of the preprocessor (selecting the first one available to it).

## 1. Preprocessor Identification Label

For a preprocessor service to be automatically discovered and invoked by the **Focusing Manager**, its Kubernetes Service YAML file must include a specific label selector in the metadata.

The label that identifies a preprocessor service is:
`eu.gravitate-health.fosps.preprocessing: "True"`

## 2. Deployment Examples

Preprocessors are internal services and do not require gateway configuration to proxy petitions, as they are accessed internally within the Kubernetes cluster.

### 2.1 Kubernetes Deployment

To ensure the Focusing Manager can correctly discover the preprocessor, the service must be deployed within the **same Kubernetes namespace** as the Focusing Manager.

**Steps for Deployment:**

1.  Build your preprocessor service into a Docker image and upload it to a registry accessible by the Kubernetes cluster.
2.  Apply the Kubernetes Service configuration (e.g., `001_preprocessing-service.yaml`). This file **must contain the discovery label** within the metadata section of the service definition.
3.  Apply the Kubernetes Deployment configuration (e.g., `002_preprocessing-deployment.yaml`).

***Example Kubernetes Service Snippet (Focusing Manager Discovery):***

The service definition must include the required label under `metadata.labels` and define the port on which the service listens (typically port 3000 internally):

```yaml
apiVersion: v1
kind: Service
metadata:
  name: preprocessing-service-example # Internal service name
  namespace: <namespace_of_focusing_manager>
  labels:
    eu.gravitate-health.fosps.preprocessing: "True" # Required Label
spec:
  selector:
    app: preprocessing-service-example # Matches the deployment label
  ports:
    - port: 3000
      targetPort: 3000
```
 (Label Structure)

***Example Kubernetes Deployment Snippet (Using the same namespace):***

The deployment links the image and ensures the service runs in the correct namespace:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: preprocessing-deployment
  namespace: <namespace_of_focusing_manager>
spec:
  selector:
    matchLabels:
      app: preprocessing-service-example
  template:
    metadata:
      labels:
        app: preprocessing-service-example
    spec:
      containers:
      - name: preprocessor
        image: <docker-registry>/<your_image>:latest
        ports:
        - containerPort: 3000
```

To apply the files (assuming they are saved in the current directory and deployment files match the pattern found in the sources):

```bash
kubectl apply -f 001_preprocessing-service-example-service.yaml
kubectl apply -f 002_preprocessing-service-example-deployment.yaml
```
 (Command Structure)

Once deployed, the service will be internally accessible within the cluster using a URL format similar to: `http://<service-name>.<namespace>.svc.cluster.local:3000/preprocess`.

### 2.2 Docker Deployment 

A small version of FOSPS can be execute locally for development purposes. This is packaged in [focusing-SDK](https://github.com/Gravitate-Health/focusing-SDK). The deployment of preprocessors is essentially the same, following simple rules:

- The preprocessors need to be on the same network as the focusing manager (which in the SDK is `focusing-network`).
- The preprocessors need to be labeled `eu.gravitate-health.fosps.preprocessing=True`

***Example Docker-compose Deployment Snippet:***

```
  preprocessing-service-example:
    container_name: preprocessing-service-example
    image: <your-custom-preprocessor-image>
    environment:
      ENVIRONMENT: dev
    networks:
      - focusing-network
    restart: unless-stopped
    # Service discovery labels - used by focusing manager to detect this preprocessor
    labels:
      eu.gravitate-health.fosps.preprocessing: True
```