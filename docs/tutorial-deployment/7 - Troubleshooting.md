---
sidebar_position: 9
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

## FHIR server pod stuck in NotReady / probe failures

Symptoms:

- Pod is running but never becomes Ready
- Liveness or readiness probe fails with 404

This happens when the probe-patch Job has not yet run or failed. The upstream HAPI chart hardcodes probe paths to `/livez`/`/readyz`, but the server runs at `/epi/api/livez` etc.

Actions:

- Check if the probe-patch Job completed: `kubectl get jobs -A | grep probe-patch`
- Inspect Job logs: `kubectl logs -n <namespace> job/<release>-probe-patch`
- Re-trigger by running `helm upgrade` (hook runs on every upgrade)
- Manually patch as a last resort:
  ```bash
  kubectl patch deployment fhir-server-epi -n <namespace> \
    --type=json -p='[{"op":"replace","path":"/spec/template/spec/containers/0/livenessProbe/httpGet/path","value":"/epi/api/livez"}]'
  ```

## FHIR server cannot connect to PostgreSQL

Symptoms:

- HAPI pod crashes or logs `Connection refused` / `password authentication failed`

Actions:

- Verify the DB Secret exists and has the expected keys (`password`, `postgres-password`):
  ```bash
  kubectl get secret fhir-server-epi-postgresql -n <namespace> -o jsonpath='{.data}' | python3 -m json.tool
  ```
- Confirm `hapi.externalDatabase.host` matches the PostgreSQL Service name (`<release-name>-postgresql`):
  ```bash
  kubectl get svc -n <namespace> | grep postgresql
  ```
- If the Secret is missing (e.g. after accidental deletion), run `helm upgrade` — the chart will regenerate it

## Focusing/connector errors due to missing upstreams

Symptoms:

- Services running but API calls fail internally

Actions:

- Verify both FHIR servers are healthy (`/epi/api/readyz`, `/ips/api/readyz` return 200)
- Confirm in-cluster service DNS names resolve (`fhir-server-epi`, `fhir-server-ips`)
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
