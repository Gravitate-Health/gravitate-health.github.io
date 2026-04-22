---
sidebar_position: 1
---

# Quick Start

This quick start deploys the platform with Helmfile and assumes defaults are acceptable.

Only one input is required: the public hostname used by the gateway and public URLs.

## Prerequisites

- Kubernetes cluster reachable from your control machine 
- [Helm 3](https://helm.sh/docs/intro/install/) installed on the control machine
- [Helmfile](https://helmfile.readthedocs.io/en/latest/#installation) installed on the control machine
- [Istio installer CLI](https://istio.io/latest/docs/ops/diagnostic-tools/istioctl/) installed on the control machine (required by default because the Istio chart uses `istio.install=true`)

## 1. Clone helm-charts repository

```bash
git clone https://github.com/Gravitate-Health/helm-charts.git
cd helm-charts
```

## 2. Choose one profile and deploy

Replace `fosps.example.org` with your instance host.

### Core profile

```bash
helmfile -f helmfile.yaml -e quickstart --state-values-set global.host=fosps.example.org apply
```

### AI profile

```bash
helmfile -f helmfile.yaml -e quickstart-ai --state-values-set global.host=fosps.example.org apply
```

### Observability profile

```bash
helmfile -f helmfile.yaml -e quickstart-observability --state-values-set global.host=fosps.example.org apply
```

### All modules

```bash
helmfile -f helmfile.yaml -e quickstart-all --state-values-set global.host=fosps.example.org apply
```

## 3. Verify basic availability

```bash
kubectl get pods -A
kubectl get svc -A
kubectl get virtualservice -A
```

Open:

- `https://<host>/auth` for Keycloak
- `https://<host>/focusing/` for Focusing Manager APIs (route level)

## What quick start configures

The shared host value is propagated to:

- Istio gateway hosts and certificate common name/SAN
- Keycloak public frontend URL and hostname
- Keycloak Registration base path
- Supporting Material Manager external URLs
- FHIR Connector SMM object storage URL

For full customization, continue with the full process tutorial.
