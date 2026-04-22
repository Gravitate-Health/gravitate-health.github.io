---
sidebar_position: 8
---

# Troubleshooting

## Helmfile cannot resolve chart dependencies

Symptoms:

- Install fails on local charts with dependencies (for example PostgreSQL/cert-manager)

Actions:

- Run `helm dependency update` in the affected chart directory
- Retry `helmfile ... apply`

## Gateway host or certificate mismatch

Symptoms:

- HTTPS failures
- 404/503 for host-based routes

Actions:

- Confirm `global.host` value used in command
- Render templates and inspect gateway/certificate resources
- Verify DNS points to the cluster ingress address

## Auth path failures (`/auth`, `/users/api`)

Symptoms:

- 401/403 or route not found

Actions:

- Verify Keycloak and Keycloak Registration pods are healthy
- Confirm Istio auth policies and request authentication resources
- Check Keycloak URL-related values match your host

## Focusing/connector errors due to missing upstreams

Symptoms:

- Services running but API calls fail internally

Actions:

- Verify both FHIR servers are healthy
- Confirm in-cluster service DNS names resolve
- Check module env values for endpoint URLs

## Deploying without Istio

Symptoms:

- External routes never become reachable

Actions:

- Disable Istio-dependent modules or
- Reconfigure affected charts to ingress mode and set ingress hosts/tls

## Fast debug commands

```bash
kubectl get events -A --sort-by=.metadata.creationTimestamp
kubectl logs -n <namespace> deploy/<deployment-name> --tail=200
kubectl describe pod -n <namespace> <pod-name>
```
