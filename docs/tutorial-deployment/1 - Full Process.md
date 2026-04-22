---
sidebar_position: 2
---

# Full Process

Use this process when you need namespace control, selective modules, and per-module tuning.

## Prerequisites

- Kubernetes cluster reachable from your control machine 
- [Helm 3](https://helm.sh/docs/intro/install/) installed on the control machine
- [Helmfile](https://helmfile.readthedocs.io/en/latest/#installation) installed on the control machine
- [Istio installer CLI](https://istio.io/latest/docs/ops/diagnostic-tools/istioctl/) installed on the control machine (required by default because the Istio chart uses `istio.install=true`)

## Step 1: Plan deployment scope

Decide your profile:

- `quickstart`: core platform
- `quickstart-ai`: core plus AI modules
- `quickstart-observability`: core plus monitoring/inspector
- `quickstart-all`: all available modules
- `full`: all modules with explicit full-process overrides

Note: when Istio is enabled, this installer renders an `IstioOperator` resource and expects `istioctl` to be available in the operator/control workstation toolchain.

Review profile values in:

- `helm-charts/environments/profiles/core.yaml`
- `helm-charts/environments/profiles/ai.yaml`
- `helm-charts/environments/profiles/observability.yaml`
- `helm-charts/environments/profiles/all.yaml`

## Step 2: Set instance-wide values

At minimum:

- `global.host`

Common full-install overrides:

- `global.namespace`
- `global.monitoringNamespace`
- `global.gatewayName`

Example:

```bash
git clone https://github.com/Gravitate-Health/helm-charts.git
cd helm-charts
helmfile -f helmfile.yaml -e full \
  --state-values-set global.host=fosps.example.org \
  --state-values-set global.namespace=gravitate \
  --state-values-set global.monitoringNamespace=monitoring \
  apply
```

## Step 3: Install in controlled phases

If you need stage-gated rollout, use label selectors:

```bash
helmfile -f helmfile.yaml -e full -l phase=infra apply
helmfile -f helmfile.yaml -e full -l phase=data apply
helmfile -f helmfile.yaml -e full -l phase=iam apply
helmfile -f helmfile.yaml -e full -l phase=core apply
helmfile -f helmfile.yaml -e full -l phase=extensions apply
helmfile -f helmfile.yaml -e full -l phase=ai apply
```

:::warning Before AI phase

The AI phase (`lens-service-summary`, `lens-service-plain-language`, `chat-with-epi`, etc.) requires external LLM/model backends such as Ollama to be already provisioned and reachable from the cluster. These backends are not managed by Helmfile. If you are deploying AI modules:

1. Pre-provision your Ollama instance or compatible LLM service
2. Confirm it is reachable from the cluster network
3. Note the endpoint URL (e.g., `https://ollama.lst.tfo.upm.es`)
4. Update the AI module charts with correct endpoint configuration before deploying the AI phase

If backends are not yet ready, skip the AI phase and deploy it later once infrastructure is in place.

:::

```bash
helmfile -f helmfile.yaml -e full -l phase=apps apply
helmfile -f helmfile.yaml -e full -l phase=observability apply
```

## Step 4: Tune module configuration

Override module values using Helmfile overlays in:

- `helm-charts/values/releases/`

Or use `--state-values-set` / `--values` flags with Helmfile commands.

Charts are published to GHCR as OCI artifacts (e.g., `oci://ghcr.io/gravitate-health/charts/istio-gravitatehealth`) and don't require local chart source files.

## Step 5: Validate and harden

Run templates before apply:

```bash
helmfile -f helmfile.yaml -e full template > rendered.yaml
```

Check:

- Namespaces and release names
- Route hostnames and gateways
- Security policies and auth assumptions
- Resource requests/limits per environment

For troubleshooting and deeper module decisions, see the following pages in this section.
