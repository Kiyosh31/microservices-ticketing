# Ticketing

## Description
This Project is my baby steps to learn and understand microservices architecture and it's implementation.  
This project was developed using Node.js, nats streaming, typescript and Next.js

## Install

Needed tools to run the project:  

1. [Node.js v^16](https://nodejs.org/es/download/)
2. [Docker](https://www.docker.com/products/docker-desktop/)
   - In case you're using Linux you need to install [Minikube](https://minikube.sigs.k8s.io/docs/start/)
   - Enable Kubernetes
4. [Skaffold](https://skaffold.dev/docs/install/)
5. Clone repo `git clone https://github.com/Kiyosh31/microservices-ticketing.git`

## Usage
Before running the project you need to generate a JWT inside kubernetes, you can generate it running this command: `kubectl create secret generic jwt-secret --from-literal JWT_KEY=<your secret key>`  
and finally:
```
skaffold dev
```