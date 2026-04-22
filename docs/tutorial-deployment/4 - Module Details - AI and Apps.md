---
sidebar_position: 5
---

# Module Details - AI and Apps

## AI-focused modules

| Module key | Chart path | Install when | If skipped |
| --- | --- | --- | --- |
| [`lensServiceSummary`](https://github.com/Gravitate-Health/lens-service-summary) | `oci://ghcr.io/gravitate-health/charts/lens-service-summary` | You need generated summary lenses | Summary lens unavailable |
| [`lensServicePlainLanguage`](https://github.com/Gravitate-Health/lens-service-plain-language) | `oci://ghcr.io/gravitate-health/charts/lens-service-plain-language` | You need plain-language adaptation | Plain-language lens unavailable |
| [`chatWithEpi`](https://github.com/Gravitate-Health/chat-with-epi) | `oci://ghcr.io/gravitate-health/charts/chat-with-epi` | You need chatbot backend | Chat backend unavailable |
| [`chatbotInterface`](https://github.com/Gravitate-Health/chatbot-interface) | `oci://ghcr.io/gravitate-health/charts/chatbot-interface` | You need chatbot web/API interface | Chat UI/API gateway unavailable |

## Application/support modules

| Module key | Chart path | Install when | If skipped |
| --- | --- | --- | --- |
| [`supportingMaterialManager`](https://github.com/Gravitate-Health/supporting-material-manager) | `oci://ghcr.io/gravitate-health/charts/supporting-material-manager` | You need external supporting-material handling and bucket flow | Supporting material workflow unavailable |
| [`provenanceEngine`](https://github.com/Gravitate-Health/provenance-engine) | `oci://ghcr.io/gravitate-health/charts/provenance-engine` | You need provenance/content trust capabilities | No provenance engine APIs |

## External AI backend requirements

Several AI modules depend on external model/LLM backends that must be provisioned separately. These are **not** included in the Helmfile and must be reachable from the platform.

### Chat modules

**`chatWithEpi`**

Requires an Ollama-compatible LLM service endpoint.

- **Config key**: `config.modelUrl`
- **Example**: `https://ollama.lst.tfo.upm.es`
- **Before deploying**: Ensure the Ollama instance is reachable and healthy from the cluster
- **Helmfile override**: `--state-values-set modules.chatWithEpi=false` if backend is unavailable

### Lens services

**`lensServiceSummary`**

Requires an external summarization/LLM service (typically Ollama or similar).

- **Config keys**: Refer to the chart's `values.yaml` for endpoint/model configuration
- **Before deploying**: Provision the model service and confirm network reachability

**`lensServicePlainLanguage`**

Requires an external model service for NLP/adaptation tasks.

- **Config key**: Model endpoint URL (check chart for exact key)
- **Before deploying**: Provision the model service

## Configuring AI backends

Once external backends are ready, override the endpoint URLs during deployment.

### Via Helmfile command

```bash
helmfile -f helmfile.yaml -e full -l phase=ai \
  --state-values-set chat-with-epi.config.modelUrl=https://your-ollama.example.com \
  apply
```

### Via values overlay

Create a file `values/ai-backends.yaml.gotmpl`:

```yaml
chat-with-epi:
  config:
    modelUrl: {{ .Values.aiBackends.chatModelUrl | quote }}

lens-service-summary:
  config:
    modelUrl: {{ .Values.aiBackends.summaryModelUrl | quote }}

lens-service-plain-language:
  config:
    modelUrl: {{ .Values.aiBackends.nlpModelUrl | quote }}
```

Then deploy:

```bash
helmfile -f helmfile.yaml -e full \
  --state-values-set aiBackends.chatModelUrl=https://ollama.example.com \
  --state-values-set aiBackends.summaryModelUrl=https://ollama.example.com \
  apply
```

## Dependency notes

- AI/chat modules assume core FHIR and focusing modules are healthy.
- `chatbotInterface` expects service-account and auth assumptions from the platform baseline.
- **Critical**: External model backends (Ollama, etc.) must be provisioned and reachable **before** installing AI modules.
- If a backend is unavailable, disable the dependent module or pre-provision the backend and then apply with updated config values.
