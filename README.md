# demax-client
[![Build Status](https://travis-ci.org/ess-dmsc/demax-client.svg?branch=master)](https://travis-ci.org/ess-dmsc/demax-client)

[![DeepScan grade](https://deepscan.io/api/teams/3527/projects/5201/branches/40431/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=3527&pid=5201&bid=40431)

This repository constitutes the frontend part of the DEMAX User Office website. The backend repository can be found <a href="https://github.com/ess-dmsc/demax-server">here.</a>
The DEMAX User Office will be used for submission and management of deuteration proposals.
This system is built in TypeScript with Angular CLI.

A live version of the system can be found at https://demax.esss.se

## Getting started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites
1. [Node.js](https://nodejs.org)

### Installing
1. ```git clone https://github.com/ess-dmsc/demax-client.git```
2. ```cd demax-client```
3. ```npm install --save```

### Run
```npm run dev```

Npm run dev initiates an Angular local angular development server on port 4200.
Backend communication is defined in [proxy.conf.json](https://github.com/ess-dmsc/demax-client/blob/master/proxy.conf.json) 
and is set to port 8080, which is the port at which [demax-backend](https://github.com/ess-dmsc/demax-server) is listening.

To set up the backend, simply follow the instructions of the <a href="https://github.com/ess-dmsc/demax-server">demax-server repository</a>

## Running the tests

### Unit tests
```ng test```

ng test starts the Angular karma test suite that runs all unit tests defined in all files ending with '.spec.ts'

```ng build --prod```

Before deploying, make sure to run this command to make sure that there are no type errors in the build version. This command creates new folder, 'dist/', and builds a production version of the code in that folder. During compilation, all TypeScript files are compiled into JavaScript and all HTML-files merged into a single index.html.

## Deployment
To deploy with docker, use the file 'Dockerfile'. This file pulls the latest version of the repository from Github, builds and compiles a production version of the code, and starts a NGINX Webserver to serve the frontend at port 8080.
To run demax-client together with the frontend, checkout the docker-compose-files in [demax-backend](https://github.com/ess-dmsc/demax-server).

## Contributing

*Todo*
Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Authors

* Jeremias Hillerberg

## License

This project is licensed under the BSD-2 License - see the [LICENSE.md](LICENSE) file for details

## Acknowledgements

* Hat tip to anyone whose code was used
