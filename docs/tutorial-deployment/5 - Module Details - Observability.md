---
sidebar_position: 6
---

# Module Details - Observability

## Observability modules

| Module key | Chart path | Install when | If skipped |
| --- | --- | --- | --- |
| [`monitoringStack`](https://github.com/Gravitate-Health/Monitor) | `oci://ghcr.io/gravitate-health/charts/monitor-routing` + external charts | You need Grafana/Prometheus/Loki/Promtail stack | No centralized dashboards/logs/blackbox checks |
| [`focusingInspector`](https://github.com/Gravitate-Health/focusing-inspector) | `oci://ghcr.io/gravitate-health/charts/focusing-inspector` | You need focused inspection UI/workflows | Inspector UI unavailable |
| [`ghMonit`](https://github.com/Gravitate-Health/gh-monit) | `oci://ghcr.io/gravitate-health/charts/gh-monit` | You use custom monitoring component | Custom monitoring service unavailable |

## Gateway implications

`monitor-routing` points to `global.namespace/global.gatewayName` by default.

If you deploy without Istio:

- Disable `monitoringStack` or
- Reconfigure routing approach for your ingress controller

## Recommended rollout

1. Install core profile first.
2. Add observability profile.
3. Validate routes and dashboards.
