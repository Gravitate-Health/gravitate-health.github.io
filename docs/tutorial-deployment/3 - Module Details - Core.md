---
sidebar_position: 4
---

# Module Details - Core

## Core infrastructure and identity

| Module key | Chart path | Required for baseline | If skipped |
| --- | --- | --- | --- |
| [`istio`](https://github.com/Gravitate-Health/istio) | `oci://ghcr.io/gravitate-health/charts/istio-gravitatehealth` | Strongly recommended | No mesh gateway/routing/auth policies by default |
| [`keycloak`](https://github.com/Gravitate-Health/keycloak) | `oci://ghcr.io/gravitate-health/charts/keycloak` | Recommended | User auth flows unavailable unless replaced |
| [`keycloakRegistration`](https://github.com/Gravitate-Health/keycloak-registration) | `oci://ghcr.io/gravitate-health/charts/keycloak-registration` | Optional | No registration API on `/users/api/` |

## Data layer

| Module key | Chart path | Required for baseline | If skipped |
| --- | --- | --- | --- |
| [`fhirIps`](https://github.com/Gravitate-Health/fhir-ips) | `oci://ghcr.io/gravitate-health/charts/hapi-fhir-jpaserver` | Yes | IPS-dependent flows fail |
| [`fhirEpi`](https://github.com/Gravitate-Health/fhir-epi) | `oci://ghcr.io/gravitate-health/charts/hapi-fhir-jpaserver` | Yes | ePI-dependent flows fail |
| [`terminology`](https://github.com/Gravitate-Health/terminology-service) | `oci://ghcr.io/gravitate-health/charts/terminology-service` | Recommended | Terminology preprocessing features degrade |

## Core orchestration

| Module key | Chart path | Required for baseline | If skipped |
| --- | --- | --- | --- |
| [`fhirConnector`](https://github.com/Gravitate-Health/fhir-connector) | `oci://ghcr.io/gravitate-health/charts/fhir-connector` | Recommended | Data sync/proxy automation unavailable |
| [`focusingManager`](https://github.com/Gravitate-Health/focusing-manager) | `oci://ghcr.io/gravitate-health/charts/focusing-manager` | Yes | No focusing orchestration |

## Baseline preprocessing and lens discovery

| Module key | Chart path | Required for baseline | If skipped |
| --- | --- | --- | --- |
| [`preprocessingManual`](https://github.com/Gravitate-Health/preprocessing-service-manual) | `oci://ghcr.io/gravitate-health/charts/preprocessing-service-manual` | Optional | Manual preprocessing endpoints unavailable |
| [`preprocessingTerminology`](https://github.com/Gravitate-Health/preprocessing-service-terminology) | `oci://ghcr.io/gravitate-health/charts/preprocessing-service-terminology` | Optional | Terminology preprocessor unavailable |
| [`preprocessingCleaner`](https://github.com/Gravitate-Health/preprocessing-service-cleaner) | `oci://ghcr.io/gravitate-health/charts/preprocessing-service-cleaner` | Optional | Cleaner preprocessor unavailable |
| [`preprocessingDictionary`](https://github.com/Gravitate-Health/preprocessing-service-dictionary) | `oci://ghcr.io/gravitate-health/charts/preprocessing-service-dictionary` | Optional | Dictionary preprocessor unavailable |
| [`lensSelectorFhir`](https://github.com/Gravitate-Health/lens-selector-fhir) | `oci://ghcr.io/gravitate-health/charts/lens-selector-fhir` | Optional | FHIR-based lens selection unavailable |
| [`lensSelectorGit`](https://github.com/Gravitate-Health/lens-selector-git) | `oci://ghcr.io/gravitate-health/charts/lens-selector-git` | Optional | Git-based lens selection unavailable |

## Core tuning guidance

Most critical knobs:

- Networking mode per module (`istio`, `ingress`, `none`)
- Resource requests/limits for stateful and orchestration services
- FHIR endpoint URLs used by connector and focusing modules
