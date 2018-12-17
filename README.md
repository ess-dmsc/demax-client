# demax-client

This repository constitutes the frontend part of the DEMAX User Portal. 
A live version of the system (irregularly updated) can be found at https://demax.esss.app

The backend repository can be found <a href="https://github.com/ess-dmsc/demax-server">here.</a>

## Local development installation

### Prerequisites
1. [Node.js](https://nodejs.org)

### Installation
1. ```git clone https://github.com/ess-dmsc/demax-client.git```
2. ```cd demax-client```
3. ```npm install --save```

### Run
```npm run dev```

Npm run dev initiates a local angular development server listening to port 4200.
Backend communication is defined in [proxy.conf.json](https://github.com/ess-dmsc/demax-client/blob/master/proxy.conf.json) 
and is set to port 8080, which is the port at which [demax-backend](https://github.com/ess-dmsc/demax-server) is listening.

To set up the backend, simply follow the instructions of the <a href="https://github.com/ess-dmsc/demax-server">demax-server repository</a>
