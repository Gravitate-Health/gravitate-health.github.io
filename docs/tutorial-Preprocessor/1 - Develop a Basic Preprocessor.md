# Develop a Basic Preprocessor

:::info Requirements
You will need to produce a Docker container that implements a specific HTTP REST interface. See the [OpenAPI specification](https://raw.githubusercontent.com/Gravitate-Health/preprocessing-service-example/refs/heads/main/openapi.yaml) for complete details.
:::

There are several alternatives to accomplish this:

- **Fork an existing template** - Start with a project similar to your needs (language, frameworks, process, etc.)
- **Use a code generator** - Create a new project with almost everything ready to run the server
- **Build from scratch** - Create your project from the ground up, as long as it follows the OpenAPI specification

Select the development path that best fits your needs and expertise.

## Forking a Template

### JavaScript

📦 **Repository:** [preprocessing-service-example](https://github.com/Gravitate-Health/preprocessing-service-example)

This is a simple preprocessor written in TypeScript/JavaScript.

:::tip Quick Start
You can write the business logic in `src/controllers/preprocessing.ts`. The template is ready with Dockerfile and even Kubernetes YAML definitions.
:::

**Key Features:**
- Pre-configured TypeScript environment
- Docker and Kubernetes deployment files included
- Ready-to-use project structure

**Getting Started:**
1. Fork the repository
2. Add your dependencies
3. Write your code

### Python

📦 **Repository:** [preprocessing-service-example-python](https://github.com/Gravitate-Health/preprocessing-service-example-python)

This is another simple preprocessor written in Python.

:::tip Quick Start
It's ready to fork and develop your own preprocessor from it. Start at `preprocessor\controllers\preprocess_controller.py` — the function is `_apply_preprocess`.
:::

**Key Features:**
- Components to access common ePI elements such as the composition
- Built-in support for managing [`HtmlElementLink`](https://build.fhir.org/ig/hl7-eu/gravitate-health/StructureDefinition-HtmlElementLink.html) Extension
- Tools to extract and manipulate HTML content
- Embedded ePI examples for testing

**Getting Started:**
1. Fork the repository
2. Add your dependencies
3. Write your code
4. Test it with the embedded ePI examples

## Generic Approach using OpenAPI Generator

You can opt to use an API server generator, for example [OpenAPI Generator](https://github.com/OpenAPITools/openapi-generator), which will be explained in detail.

📋 **Preprocessor OpenAPI Spec:**
```
https://raw.githubusercontent.com/Gravitate-Health/preprocessing-service-example/refs/heads/main/openapi.yaml
```

You can create servers with stubs in any of the supported languages.

:::warning Docker Requirements
You may need to create a Dockerfile for the Preprocessor service. Remember to expose the port where the API is published.
:::

:::info Installation-Free Approach
Using the official Docker image avoids installing Java or OpenAPI Generator locally. You will need [Docker installed](https://docs.docker.com/engine/install/).
:::


### 1. Generate a server stub

Use the dockerized generator:

```bash
docker run --rm \
  -v ${PWD}:/local --user $(id -u):$(id -g) \
  openapitools/openapi-generator-cli generate \
  -i https://raw.githubusercontent.com/Gravitate-Health/preprocessing-service-example/refs/heads/main/openapi.yaml \
  -g <language> \
  -o /local/out/<language-server>
```

Where `<language>` can be:

| Language                | Generator               |
| ----------------------- | ----------------------- |
| Java Spring             | `spring`                |
| Python Flask            | `python-flask`          |
| Node/JavaScript Express | `nodejs-express-server` |
| Go Gin                  | `go-gin-server`         |
| Rust Hyper/Tower        | `rust-server`           |

Checkout the full list of supported languages (+ frameworks) in openapi-generator's list of [SERVER Generators](https://openapi-generator.tech/docs/generators#server-generators)


### 2. Implement business logic

After generation:

* Each endpoint will have a handler stub.
* Implement your logic inside those functions.
* Avoid modifying generated models or interfaces (regenerate at any time).

### 3. Build & run Docker image

Ensure the docker image can be built, if there isn't any Dockerfile [create one for your project](https://www.docker.com/blog/how-to-create-dockerfiles-with-genai/).
```bash
docker build -t my-service .
docker run -p 8080:8080 my-service
```

---

## Concrete Examples by Popular Languages

### Python – Flask Server

**Generate**

```bash
docker run --rm \
  -v ${PWD}:/local --user $(id -u):$(id -g) \
  openapitools/openapi-generator-cli generate \
  -i https://raw.githubusercontent.com/Gravitate-Health/preprocessing-service-example/refs/heads/main/openapi.yaml \
  -g python-flask \
  -o /local/generated/python-flask \
  --additional-properties=packageName=preprocessor
```
**Project Structure**

```plaintext
generated/python-flask/
 ├── __main__.py  # Flask root
 ├── openapi_server
 |   ├── controllers/  # handlers
 |   ├── models/  
 |   ├── api/  
 |   ├── ...
 ├── Dockerfile
 ├── requirements.txt
 ├── ...
```

Implement your code in:

```python
openapi_server/controllers/preprocess_controller.py
```

:::tip FHIR Helper Libraries
You may use FHIR Python Helper modules like [fhir.resources](https://github.com/nazrulworld/fhir.resources) (Pydantic-based models).
:::

**Dockerfile (Flask)**

Generator already provides a working Dockerfile.

:::note Troubleshooting
If there is an issue, try changing `FROM python:3-alpine` in the dockerfile to `FROM python:3.11-alpine`.
:::

---

### Java – Spring Boot Server

**Generate**

```bash
docker run --rm \
  -v ${PWD}:/local --user $(id -u):$(id -g)\
  openapitools/openapi-generator-cli generate \
  -i https://raw.githubusercontent.com/Gravitate-Health/preprocessing-service-example/refs/heads/main/openapi.yaml \
  -g spring \
  --additional-properties=java8=true \
  -o /local/generated/spring
```

The generated project already includes Maven or Gradle support.

**Project Structure (Spring)**

```plaintext
generated/spring/
 ├── pom.xml
 ├── src/main/java/org/openapitools/api/...   # handlers
 ├── src/main/java/org/openapitools/model/... # models
 ├── ...
```

Write your logic inside classes under:

```java
src/main/java/org/openapitools/api/PreprocessApiController.java
```
You may use FHIR Helper packages like [HAPI FHIR](https://hapifhir.io/), `hapi-fhir-base` provides parsing and manipulation.

**Example Dockerfile (Java Spring)**

**`generated/spring/Dockerfile`**
```Dockerfile
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /workspace

# copy pom / mvnw first to leverage Docker layer cache if sources change often
COPY pom.xml ./
COPY src ./src

# build the project (skip tests for faster builds by default)
RUN mvn -B -DskipTests package

# normalize produced jar name for the next stage
RUN cp target/*.jar app.jar

FROM eclipse-temurin:17-jre AS runtime
WORKDIR /app

# copy the assembled jar from the build stage
COPY --from=build /workspace/app.jar ./app.jar

# default Spring Boot port
EXPOSE 8080

# allow passing JVM options with JAVA_OPTS
ENV JAVA_OPTS=""

ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar /app/app.jar"]
```

