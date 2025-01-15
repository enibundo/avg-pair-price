# avg-pair-price

#### Introduction

The aim is to have an average price of 3 (or more) crypto exchanges for a given pair.
As an example we will focus on the `BTCUSD` pair but this could eventually change and the given solution could be generalized to work with other (or many) pairs.

We will expose the average price of the pair through a REST API for our clients.
Main focus is having a performant, scalable and uncoupled backend system that could scale and upgrade without downtime.

#### Architecture

I will have one service per exchange (let's call them Worker services) and one service for the API. Everytime a worker service has a new price it will persist it.
Each worker service will be independent and will have different logic to fetch data, respecting specific limits of each exchange, and using specific protocol that the exchanges permit us.

The presentation/api service, whenever called, will compute the average of the latest information we have from each service. We are not interested in historical data in our case and we only need _latest known_ average price.

#### Stack

I will use:

- Typescript
- NodeJS
- Express
- Docker
- Kubernetes
- Some type of persistence (Redis or Sql)d
