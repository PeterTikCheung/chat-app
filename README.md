Pre
MongoDb
Node version 20
npm install

Run development mode
npm run start:dev
Run locally
npm run start:server

formatting
npm run format

The project use lint for code quality checking, if you want to disable the auto check please modify the below section in package.json
"husky": {
    "hooks": {
      "pre-commit": "npm run lint"
    }
}