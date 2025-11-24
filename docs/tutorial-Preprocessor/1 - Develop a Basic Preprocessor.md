# Develop a Basic Preprocessor

In general you will need to produce a Docker container that implements a specific http REST interface (see [this openapi specification](https://raw.githubusercontent.com/Gravitate-Health/preprocessing-service-example/refs/heads/main/openapi.yaml )).

There are several alternatives to do this, one is to fork an existing project that is similar to what you what (languaje, frameworks, process, etc...). Another option is to use a code generator to create a new proyect with almost everything ready to run the server. And, of course, you may also create your project from scratch, as long as it follows the conditions above.

## Forking template

Fork:

 https://github.com/Gravitate-Health/preprocessing-service-example.

This is a simple preprocessor written in TrueScript/JavaScript. 
You can write the business logic in `src/controllers/preporcessing.ts`.
It is ready with Docker file, and even kubernetes yaml definitions.

## Generic Approach using OpenAPI Generator 
You can opt to use an API sever generator, for example [OpenAPI Generator](https://github.com/OpenAPITools/openapi-generator), which will be explained in detail.
Preprocessor OpenAPI Spec is in:

 https://raw.githubusercontent.com/Gravitate-Health/preprocessing-service-example/refs/heads/main/openapi.yaml 

You can create servers with stubs in any of the supported languages.
You may need to create Dockefile for the Preprocessor service; rembember to expose the port where the API is published.

Using the official Docker image avoids installing Java or OpenAPI Generator locally. You will need [docker installed](https://docs.docker.com/engine/install/).


### 1. Generate a server stub

Use the dockerized generator:


```sh
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

Checkout the full list of supported languajes (+ frameworks) in openapi-generator's list of [SERVER Gerenators](https://openapi-generator.tech/docs/generators#server-generators)


### 2. Implement business logic

After generation:

* Each endpoint will have a handler stub.
* Implement your logic inside those functions.
* Avoid modifying generated models or interfaces (regenerate at any time).

### 3. Build & run Docker image

Ensure the docker image can be built, if there isn't any Dockerfile [create one for your project](https://www.docker.com/blog/how-to-create-dockerfiles-with-genai/).
```sh
docker build -t my-service .
docker run -p 8080:8080 my-service
```

---

## Concrete Examples by Popular Languages

### Python – Flask Server

**Generate**

```sh
docker run --rm \
  -v ${PWD}:/local --user $(id -u):$(id -g) \
  openapitools/openapi-generator-cli generate \
  -i https://raw.githubusercontent.com/Gravitate-Health/preprocessing-service-example/refs/heads/main/openapi.yaml \
  -g python-flask \
  -o /local/generated/python-flask
```
**Project Structure**

```
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

```
openapi_server/controllers/preprocess_controller.py
```

You may use FHIR Python Helper modules like [fhir.resources](https://github.com/nazrulworld/fhir.resources) (Pydantic-based models).

**Dockerfile (Flask)**

Generator already provides a working Dockerfile.

If there is an issue, try changing `FROM python:3-alpine` in the dockerfile to `FROM python:3.11-alpine`.

---

### Java – Spring Boot Server

**Generate**

```sh
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

```
generated/spring/
 ├── pom.xml
 ├── src/main/java/org/openapitools/api/...   # handlers
 ├── src/main/java/org/openapitools/model/... # models
 ├── ...
```

Write your logic inside classes under:

```
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

