# Deploying your Connector

## Discovery
To make your connector service **auto-discovered** by FOSPS, the Kubernetes CronJob (or deployment, for API services) needs to include a specific label: `eu.gravitate-health.fosps.connector: ‘true’`.