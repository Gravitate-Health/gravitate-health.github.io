# Develop a Custom Pull Connector
## Create a project
Select your languaje, and project management tool(s), create a project with them.

For purposes of this tutorial, we will proceed with XXX.

```

```

## Generate the stub server
Beacuse the connector must follow the Open API specification to interface with FOSPS, one of the easiest ways to start is to use tools to generate the appropriate REST inmplementation with empty code (a.k.a Stub). From there then implement each service.

For the purposes of this tutorial we will use [OpenAPI Generator](https://openapi-generator.tech/) tool.

```

```

## Implement Services
<!-- Per service, simple explanation and implementation code -->

## Generate Docker image
If you are familiar with [Docker](https://www.docker.com/), this step should be straigh forward.
First Create a `Dockerfile` file in your project, it should look something like:

```
FROM node:20-alpine
WORKDIR /app
COPY . .
RUN yarn install --production
CMD ["node", "./src/index.js"]
```

Then generate the image with:

```
docker build -t my-connector .
```

Change the tag (the parameter after `-t`), remember the tag for later, as it is needed by FOSPS to deploy the connector.

## Helm chart
<!-- TODO: add helm-->