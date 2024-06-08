<h1 align="center">💰 Digital Wallet 💰</h1>
<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[![File count](https://img.shields.io/github/directory-file-count/mrrhak/digital-wallet?type=file&style=flat&logo=onlyoffice&label=Files&link=https%3A%2F%2Fgithub.com%2Fmrrhak%2Fs3_file_provider)](https://github.com/mrrhak/digital-wallet)
[![Code size](https://img.shields.io/github/languages/code-size/mrrhak/digital-wallet?logo=csharp&color=blue&label=Code%20size)](https://github.com/mrrhak/digital-wallet)
[![Star on Github](https://img.shields.io/github/stars/mrrhak/digital-wallet.svg?style=flat&logo=github&colorB=deeppink&label=Stars)](https://github.com/mrrhak/digital-wallet)
[![Forks on Github](https://img.shields.io/github/forks/mrrhak/digital-wallet?style=flat&label=Forks&logo=github)](https://github.com/mrrhak/digital-wallet)
[![License: MIT](https://img.shields.io/github/license/mrrhak/digital-wallet?label=License&color=red&logo=Leanpub)](https://opensource.org/licenses/MIT)
[![Developer](https://img.shields.io/badge/Developed_by-Mrr_Hak-blue.svg?logo=devdotto)](https://mrrhak.com)

## Description
The User Wallet Service is a vital component of any platform, designed to provide users with a secure and convenient way to manage their funds within the ecosystem.

![Digital Wallet Swagger](https://raw.githubusercontent.com/mrrhak/digital-wallet/master/assets/swagger.png)


## Getting Started
This repository provides various resources to get you started with building your Digital Wallet application:

### Features
- [x] Currency
  - [x] Create Currency
  - [x] Update Currency Ratio
  - [x] Get All Currencies
- [x] Wallet
  - [x] Create Wallet
  - [x] Active Wallet
  - [x] Suspend Wallet
  - [x] Change Wallet Name
  - [x] Get Wallet Balance
  - [x] Get Wallet Transactions
- [x] Transactions
  - [x] Credit Wallet Balance
  - [x] Debit Wallet Balance
  - [x] Transfer Wallet Balance
  - [x] Get Transactions Wallet 

## Installation

- This app running with NestJS and MongoDB with transactions support and Swagger UI
- Spin up mongo cluster with docker [here](./mongo/start-replicaset.sh)
  
```bash
chmod +x start-replicaset.sh
./start-replicaset.sh
```

## Install dependencies

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Contributing

We welcome contributions to this project! Feel free to open pull requests with improvements, bug fixes, or additional features.
 
## License

This project is licensed under the MIT License: [MIT License](https://opensource.org/licenses/MIT).

## Stay Connected
Feel free to raise any questions or suggestions through GitHub issues.