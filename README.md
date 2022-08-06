# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker = [Download & Install Docker](https://www.docker.com/products/docker-desktop/)

## Downloading

```
git clone {repository URL}
```

## Installing NPM modules
```
npm install
```
## Environment variables
Rename `.env.example` to `.env` and correct if needed.
### Application server port
 - `PORT` (`4000` by default)
### Logger settings
 - `LOGGER_FILE_SIZE` File size in KB (`1024` by default)
 - `LOGGER_LEVEL` Log level: from `0` to `4` (`4` by default)

## Build and run docker images
### Run both DB and API server
`npm run docker:start`
### Build app images
`npm run docker:build`
### Push app images
`npm run docker:build`
### Scan app image
`npm run docker:scan`

## Running application
Choose one of the following mode
### Simple development mode
`npm start`
### Development watch mode
`npm run start:dev`
### Development debug mode
`npm run start:debug`
### Production mode
`npm run build && npm run start:prod`

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
