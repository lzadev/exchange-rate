# exchange-rate

## Overview

Multi-service platform for currency exchange, including:

- NestJS APIs (`orion-rates`, `altair-exchange`)
- .NET APIs (`gateway-api`)
- Java/Quarkus microservice (`mercuriofx`)

## Services

### orion-rates

NestJS API for currency rates and conversion.

### altair-exchange

NestJS API for advanced exchange operations.

### gateway-api

.NET API gateway for service orchestration.

### mercuriofx

Java/Quarkus microservice for currency conversion.

## Running Locally

1. Build and start all services:

   ```sh
   docker compose up --build
   ```

2. Access services:
   - orion-rates: http://localhost:3000
   - altair-exchange: http://localhost:5600
   - gateway-api: http://localhost:5500
   - mercuriofx: http://localhost:4000

## Environment Variables

- `API_KEY` for NestJS services
- `ASPNETCORE_ENVIRONMENT` for .NET services

## Project Structure

```
orion-rates/
altair-exchange/
Gateway/
mercuriofx/
docker-compose.yml
```

## Contributing

Pull requests are welcome!
