# Typescript Futurum Express
![license](https://img.shields.io/github/license/futurum-dev/typescript.futurum.express?style=for-the-badge)

An example of a modern containerised REST API using typescript, express and [tsoa](https://github.com/lukeautry/tsoa).

Using [tsoa](https://github.com/lukeautry/tsoa), you can define your REST endpoints with routes and controllers using decorators, and it will automatically generate the OpenAPI spec for you.

## To start development node
This will automatically watch for changes and restart the server.

But, it does not pick up changes in the `swagger.json` file. You need to run `npm run build:tsoa` to update the swagger.json file.
```
npm run dev
```

## Generate Routes and Swagger.json
```
npm run build:tsoa
```

## Docker
### Build
```
docker build -t typescript.futurum.express .
```

### Run
```
docker run -p 3002:8080 typescript.futurum.express
```
