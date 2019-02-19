# demax-client
[![Build Status](https://travis-ci.org/ess-dmsc/demax-client.svg?branch=master)](https://travis-ci.org/ess-dmsc/demax-client)

This repository constitutes the frontend part of the DEMAX User Office website. The backend repository can be found <a href="https://github.com/ess-dmsc/demax-server">here.</a>
The DEMAX User Office will be used for submission and management of deuteration proposals.
This system is built in TypeScript with Angular CLI.

A live version of the system (irregularly updated) can be found at https://demax.esss.app

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

## Deployment

```ng build --prod```

This command creates new folder, 'dist/', and builds a production version of the code in that folder. During compilation, all TypeScript files are compiled into JavaScript and all HTML-files merged into a single index.html.

```ng build --prod --aot```

This command builds a production version using the Ahead-of-time compilation. Ahead-of-time compilation compiles all code (TypeScript, HTML and CSS/SCSS) into one single JavaScript file that is later downloaded and displayed by browser clients - no browser-side compilation needed.

## Contributing

*Todo*
Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Authors

* Jeremias Hillerberg

## License

This project is licensed under the BSD-2 License - see the [LICENSE.md](LICENSE) file for details

## Acknowledgements

* Hat tip to anyone whose code was used
