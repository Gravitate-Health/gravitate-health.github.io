# Develop a Basic Preprocessor


## Forking template

Fork https://github.com/Gravitate-Health/preprocessing-service-example
This is a simple preprocessor written in TrueScript/JavaScript

## Using an API generator

Use OpenAPI Generator https://github.com/OpenAPITools/openapi-generator
Preprocessor OpenAPI Spec is in https://raw.githubusercontent.com/Gravitate-Health/preprocessing-service-example/refs/heads/main/openapi.yaml 
You can create stubs in any of the supported languajes
You may need to create Dockefile for the Preprocessor service


```
docker run --rm -v "${PWD}:/local" openapitools/openapi-generator-cli generate \
    -i https://raw.githubusercontent.com/Gravitate-Health/preprocessing-service-example/refs/heads/main/openapi.yaml \
    -g java \
    -o /local/
```