### Setting up an ORM in Node JS - Part II
http://thekeunster.com/2016/05/11/Setting-up-an-ORM-in-Node-JS-Part-2/

### Setup
Using MYSQL

SQL: magic-platform.sql
PORT: 33306

```
npm install
typings install
npm run build
```

### Run sample
```
npm run test
```

### Blog info
Setting up an ORM in Node JS - Part II

May 11, 2016
Overview

This is Part II in the continuation of “Setting up and ORM in Node JS”. In the previous post, we did the following:

created an “Employees” database in either Postgres and/or MySQL
generated an entity model and repository layer
In this post, we’ll be going over on how to integrate the entity model and repository layer generated in the last post.

If you want to skip this post entirely, and go straight for the code here you go:

https://github.com/keunlee/blog-code-examples/tree/master/nodejs-orm-sample

Otherwise, keep going forward.

Prerequisites

Fullfill requirements from:
Setting up an ORM in Node JS - Part I

Integrating our Entity Model and Repository Layer

In previous posts we generated code for an entity model and repository layer. The files generated:

sequelize-models.ts
sequelize-names.ts
sequelize-types.ts
To integrate these, we’re going to want to create a test application.

(1) create the application skeleton

Create a directory. Let’s call it nodejs-orm-sample.

With inside of that folder, create a package.json file and copy the following contents into it.

{
  "name": "nodejs-orm-sample",
  "version": "1.0.0",
  "description": "",
  "databaseConfig": {
    "dialect": "postgres",
    "database": "employees",
    "username": "dbuser",
    "password": "password"
  },
  "scripts": {
    "build": "tsc",
    "test": "mocha --require ts-node/register test"
  },
  "dependencies": {
    "moment": "^2.13.0",
    "mysql": "2.3.2",
    "pg": "^4.5.1",
    "sequelize": "^3.14.2"
  },
  "devDependencies": {
    "chai": "^3.5.0",
    "grunt": "^0.4.5",
    "grunt-tslint": "^3.0.3",
    "load-grunt-tasks": "^3.4.1",
    "mocha": "^2.5.3",
    "shelljs": "^0.6.0",
    "ts-node": "^1.2.1",
    "tslint": "^3.9.0",
    "typescript": "^1.8.10"
  },
  "author": "",
  "license": "ISC"
}
Notice we’ve got some node package dependencies that we’ve already added. For our purposes, this is our minimal set of node dependencies we’ll be using, however, feel free to add more.

In addition to that, pay close attention to the node databaseConfig, in packages.json. That node is used to specify the database(s) we’ll be using for this demonstration.

In this example, I’m using postgres.

You’ll want to change the parameters based on your environment setup (i.e. username, password).

Since we’re using typescript, we’ll want to add a minimal set of typescript definition files for use.

create a typings.json file and add the following:

{
  "name": "nodejs-orm-sample",
  "version": false,
  "dependencies": {},
  "devDependencies": {},
  "globalDependencies": {
    "bluebird": "registry:dt/bluebird#2.0.0+20160209044412",
    "chai": "registry:dt/chai#3.4.0+20160317120654",
    "change-case": "registry:dt/change-case#0.0.0+20151116200427",
    "lodash": "registry:dt/lodash#3.10.0+20160314033737",
    "mocha": "registry:dt/mocha#2.2.5+20160317120654",
    "moment": "registry:dt/moment#2.8.0+20160316155526",
    "moment-node": "registry:dt/moment-node#2.11.1+20160511043338",
    "node": "registry:dt/node#4.0.0+20160311162451",
    "sequelize": "registry:dt/sequelize#3.4.1+20160312135039",
    "underscore.string": "registry:dt/underscore.string#0.0.0+20160127111130",
    "validator": "registry:dt/validator#4.5.1+20160124232055"
  }
}
to instruct the typescript transpiler how we want our typescript files transpiled, create a tsconfig.json file and add the following contents:

{
  "compilerOptions": {
    "sourceMap": true,
    "target": "es5",
    "module": "commonjs",
    "moduleResolution": "node",
    "isolatedModules": false,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "declaration": false,
    "noImplicitAny": false,
    "removeComments": true,
    "noLib": false,
    "preserveConstEnums": true,
    "suppressImplicitAnyIndexErrors": true
  },
  "exclude": [
    "node_modules",
    "typings"
  ]
}
next, we’ll want to copy the generated files (generated in our last post) into our source tree.

Copy the following files :

sequelize-models.ts
sequelize-names.ts
sequelize-types.ts
into the following directory:

nodejs-orm-sample/src/domain

next we’ll want to modify a few of the generated files above. In our case, sequelize-models.ts and sequelize-types.ts.

Open both of the files in a text editor, and locate the /// <reference path="..." /> line located near the top of each file.

change that line to this:

/// <reference path="../../typings/index.d.ts" />
and save both files.

At this point, run the following:

npm install
typings install
npm run build
if all is well, you should not have any build errors.

(2) create domain repositories

For this exercise, we’ll be creating a domain repository which implements an abstract repository.

The abstract repository will leverage the domain model and data access code which we generated from previous steps.

Starting with the abstract repository, create a new file:

nodejs-orm-sample/src/repository/AbstractRepository.ts

and add the following contents:

Afterwards, we’ll want to create a domain specific repository which implements the abstract repository we’ve just created.

Let’s create an “Employees” repository. To do this, create a new file:

nodejs-orm-sample/src/repository/EmployeesRepository.ts

and add the following contents:

(3) testing the repository

To test the “Employees” repository, we’ll be using mocha to run our unit tests.

Create the following file:

nodejs-orm-sample/test/EmployeesRepository.spec.ts

and add the following contents:

To run this test, execute the following at the command line:

npm run build
npm run test

You should see all your tests pass.