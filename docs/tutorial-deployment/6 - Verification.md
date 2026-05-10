---
sidebar_position: 8
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

## FHIR server checks

```bash
# Readiness probes (expect 200)
curl -Ik https://<host>/epi/api/readyz
curl -Ik https://<host>/ips/api/readyz

# FHIR capability statement (expect 200 + JSON body)
curl -s https://<host>/epi/api/fhir/metadata | head -5
curl -s https://<host>/ips/api/fhir/metadata | head -5
```

In-cluster service URLs (used by other platform modules — verify resolution from any pod):

```bash
kubectl run -it --rm debug --image=curlimages/curl --restart=Never -- \
  curl -s http://fhir-server-epi:8080/epi/api/fhir/metadata | head -3
kubectl run -it --rm debug --image=curlimages/curl --restart=Never -- \
  curl -s http://fhir-server-ips:8080/ips/api/fhir/metadata | head -3
```

For probe issues, check that the probe-patch Job completed successfully:

```bash
kubectl get jobs -A | grep probe-patch
kubectl logs -n <namespace> job/<release>-probe-patch
```

## Functional checks

- Keycloak realm and clients load correctly
- FHIR ePI and IPS servers respond to `/epi/api/fhir/metadata` and `/ips/api/fhir/metadata`
- FHIR IPS `$summary` operation responds at `/ips/api/fhir/Patient/<id>/$summary`
- Focusing Manager discovers enabled preprocessors/lens services
- Optional AI modules return successful responses for basic requests
- Optional monitoring dashboards load and query data
