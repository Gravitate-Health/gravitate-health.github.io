# Develop a Custom Pull Connector

## Create a project

:::tip Getting Started
Select your language, and project management tool(s), create a project with them.
:::

:::note Tutorial Example
For purposes of this tutorial, we will proceed with a Node.js/JavaScript example.
:::

## Generate the stub server

:::info OpenAPI Specification
Because the connector must follow the OpenAPI specification to interface with FOSPS, one of the easiest ways to start is to use tools to generate the appropriate REST implementation with empty code (a.k.a Stub). From there then implement each service.
:::

For the purposes of this tutorial we will use [OpenAPI Generator](https://openapi-generator.tech/) tool.

:::caution Comming Soon
The code to generate a connector from the OpenAPI specification will be published soon.
:::

## Implement Services

:::tip Implementation
Implement each service endpoint according to your connector's requirements. The stub code provides the structure, and you add the business logic.
:::

### Key Endpoints to Implement

- **Resource retrieval endpoints**: Fetch data from TSI
- **Search endpoints**: Query and filter resources
- **Metadata endpoints**: Provide connector capabilities

## Generate Docker image

:::info Docker Containerization
If you are familiar with [Docker](https://www.docker.com/), this step should be straightforward.
:::

### Create Dockerfile

First create a `Dockerfile` file in your project, it should look something like:

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY . .
RUN yarn install --production
CMD ["node", "./src/index.js"]
```

### Build the Image

Then generate the image with:

```bash
docker build -t my-connector .
```

:::warning Important
Change the tag (the parameter after `-t`), remember the tag for later, as it is needed by FOSPS to deploy the connector.
:::

## Helm chart

:::caution Coming Soon
Helm chart configuration details will be added in a future version of this documentation.
:::