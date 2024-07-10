# Typescript chat app backend

This is a backend application for real time chatroom using Express.js, Typescript, Mongodb. It includes user api, auth api, chatroom socket, and chatroon integration api.




## Prerequisite
1. MongoDb install and connect, the default connection config located in root "config/index.tx"

2. Node.js version 20
## Installation

```bash
JWT_SECRET_KEY = <Your JWT secret key>
```

3. Create a .env file in the root directory
```bash
npm install
```
    
## Run Locally

Run development mode using nodemon

```bash
npm run start:dev
```

Start the server

```bash
npm run start:server
```

## Formatting
```bash
npm run format
```

Eslint:
The project use lint for code quality checking, if you want to disable the auto check when commit please remove the .hunsky file