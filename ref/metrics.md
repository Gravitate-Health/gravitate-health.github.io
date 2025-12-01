---
sidebar_position: 46
title: Metrics Management
tags: [monitoring, grafana, prometheus, observability]
---

# Metric Management System (Grafana/Prometheus/Loki Stack)

The **Metric Management System** is the subsystem used for collecting, storing, processing, and monitoring technical Key Performance Indicators (KPIs) and logs in real-time to ensure [FOSPS](./fosps.md) system health.

## Purpose

Provides:
- **System Monitoring**: Real-time platform health
- **Performance Tracking**: Response times, throughput
- **Resource Usage**: CPU, memory, storage
- **Log Aggregation**: Centralized log collection
- **Alerting**: Proactive issue notification
- **Visualization**: Customizable dashboards

## Technology Stack

### Prometheus
**Metrics collection and storage**:
- Time-series database
- Pull-based metrics scraping
- PromQL query language
- Alert rule engine

### Grafana
**Visualization and dashboards**:
- Customizable dashboards
- Real-time graphs
- Multi-datasource support
- Alert visualization

### Loki
**Log aggregation**:
- Distributed log collection
- LogQL query language
- Integration with Grafana
- Cost-effective storage

## Monitored Metrics

### Platform Metrics
- Service availability/uptime
- Request rates and latency
- Error rates and types
- Resource utilization

### Component-Specific

#### Focusing Manager
- [Focusing](./focusing.md) requests per minute
- Average focusing duration
- [Preprocessor](./preprocessor.md) execution times
- [Lens](./lens.md) selection patterns

#### FHIR Server
- Query performance
- Resource creation/update rates
- Storage usage
- Connection pool status

#### Connectors
- External source response times
- Retrieval success/failure rates
- Cache hit ratios

#### LEE
- [Lens](./lens.md) execution duration
- Memory usage per execution
- Concurrent execution count

## Log Aggregation

Collects logs from:
- All [FOSPS architectural layers](./architectural-layers.md)
- [Kubernetes](./kubernetes-deployment.md) pods
- [Istio](./istio.md) service mesh
- [Audit Log](./audit-log.md) (for monitoring, not storage)

## Dashboards

Pre-configured dashboards for:
- **Platform Overview**: System-wide health
- **Service Health**: Per-component metrics
- **User Experience**: Response times, error rates
- **Security**: Failed authentication, suspicious activity
- **Capacity Planning**: Resource trends

## Alerting

Alerts configured for:
- Service downtime
- High error rates
- Performance degradation
- Resource exhaustion
- Security events

Notifications sent via:
- Email
- Slack/Teams
- PagerDuty
- Webhooks

## Access Control

Dashboard access restricted by [Keycloak](./keycloak.md):
- Administrators: Full access
- Developers: Read-only
- Service accounts: API access

## Integration

- **[Kubernetes](./kubernetes-deployment.md)**: Pod metrics
- **[Istio](./istio.md)**: Service mesh telemetry
- **[Audit Log](./audit-log.md)**: Security event correlation
- **[OpenAPI](./openapi.md)**: API performance tracking

## Related Concepts

- [FOSPS](./fosps.md) - Monitored platform
- [Architectural Layers](./architectural-layers.md) - Monitored components
- [Audit Log](./audit-log.md) - Security logging
- [Keycloak](./keycloak.md) - Access control
- [Kubernetes](./kubernetes-deployment.md) - Deployment platform
