---
sidebar_position: 7
---

# Verification

Run these checks after deployment.

## Release state

```bash
helm list -A
helmfile -f helm-charts/helmfile.yaml -e full list
```

## Kubernetes health

```bash
kubectl get pods -A
kubectl get deploy -A
kubectl get statefulset -A
kubectl get svc -A
```

## Istio routes

```bash
kubectl get gateway -A
kubectl get virtualservice -A
kubectl get authorizationpolicy -A
kubectl get requestauthentication -A
```

## Endpoint smoke tests

Replace `<host>` with your configured hostname.

```bash
curl -Ik https://<host>/auth
curl -Ik https://<host>/users/api
curl -Ik https://<host>/focusing/
curl -Ik https://<host>/connector/api
```

## Functional checks

- Keycloak realm and clients load correctly
- FHIR IPS and ePI services are reachable from in-cluster clients
- Focusing Manager discovers enabled preprocessors/lens services
- Optional AI modules return successful responses for basic requests
- Optional monitoring dashboards load and query data
