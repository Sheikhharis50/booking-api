# Booking API

## Description

The API is written using [NestJS](https://github.com/nestjs/nest) framework.

### Components

**_Sqlite_** - database with typeorm is used to manage the data.

**_Jest_** - is used as a testing framework to write end-to-end test cases.

**_Prettier_** - is used to lint the code properly.

### Modules

The followings are the main modules of this Project.

**_Agent_** - a entity who can login and manage the system.

**_User_** - a entity who can login into system.

**_Role_** - each Agent has a role either Regular which can read or Admin which can read and write.

**_Permission_** - each Role has many permissions against each module with read and write type.

**_Bookings_** A entity which can be created by agent against a specific user.

## Quick Start

### Installation

```bash
yarn install
```

### Running the app

```bash
yarn start
```

### Test

```bash
# e2e tests
yarn test:e2e
```

## Stay in touch

Author - [Sheikh Haris Zahid](https://github.com/Sheikhharis50)
