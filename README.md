# inversify-constructor-injection

[![Build Status](https://travis-ci.org/Roaders/inversify-constructor-injection.svg?branch=master)](https://travis-ci.org/Roaders/inversify-constructor-injection)
![NPM version](https://img.shields.io/npm/v/inversify-constructor-injection)
![Dependencies](https://img.shields.io/david/roaders/inversify-constructor-injection)
![Typescript](https://camo.githubusercontent.com/d81d2d42b56e290c0d4d74eb425e19242f4f2d3d/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f74797065732f73637275622d6a732e737667)

 > Helper functions to provide class constructor parameters or function parameters from inversify

 ## Install

```
npm install inversify-constructor-injection
```

## Example Usage

### Constructor Injection

```typescript
import { resolveContainer } from "inversify-constructor-injection";

// setup providers
resolveContainer().bind(EmployeeService).to(EmployeeService);
resolveContainer().bind(EmployeeUtil).to(EmployeeUtil);
```

```typescript
import { injectConstructor } from "inversify-constructor-injection";
import { injectable } from "inversify";

@Injectable()
class ClassWithParameters {
    constructor(
        name: string,
        service: EmployeeService,
        util: EmployeeUtil) {
    }
}

const injectedConstructor = injectConstructor(ClassWithParameters);

const instance = new injectedConstructor("instanceName"); // other parameters provided from inversify
```

### Function Injection

A similar approach can be used to provide values for function parameters. Unfortunately the metadata for function parameters isn't currently available so we need to provide the metadata for the function parameters ourselves.

```typescript
import { resolveContainer } from "inversify-constructor-injection";

// setup providers
resolveContainer().bind(EmployeeService).to(EmployeeService);
resolveContainer().bind(EmployeeUtil).to(EmployeeUtil);
```

```typescript
import { injectFunction } from "inversify-constructor-injection";

function functionWithParameters(
    paramOne: string,
    paramTwo: EmployeeService,
    paramThree: EmployeeUtil): string {
}

const injectedFunction = injectFunction( // typed as (paramOne?: string, paramTwo?: EmployeeService, paramThree?: EmployeeUtil) => string
    functionWithParameters, 
    [ undefined, EmployeeService, EmployeeUtil ], // provide type metadata
    );

injectedFunctions("stringValueThatCantBeInjected"); // call function
```

## Setup

This package uses Reflect Metadata to inspect the constructor parameters of your class. To use this your `tsconfig.json` must contain:

```json
{
    "compilerOptions": {
        "experimentalDecorators": true,    
        "emitDecoratorMetadata": true      
    }
}
```

and the class that you are trying to construct MUST have a decorator to inform typescript that metadata should be saved:

```typescript
@Injectable()
class ClassWithParameters {
    constructor(
        public readonly paramOne: string,
        public readonly paramTwo: number,
        public readonly paramThree: boolean) {
    }
}
```

you must also install and import `reflect-metadata` somwhere in your app - preferably as the first import.

```
npm install reflect-metadata
```

```typescript
import "reflect-metadata";
```

Minimum Typescript version: `3.5`
