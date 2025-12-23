# Testes
## Estrutura da suite de testes
Os testes desse projeto estão divididos em:
- [testes para os models;](https://github.com/pablosscosta/barbershop-manager/blob/main/backend/api/tests/test_models.py)
- [testes para API;](https://github.com/pablosscosta/barbershop-manager/blob/main/backend/api/tests/test_api.py)
- [testes para integração;](https://github.com/pablosscosta/barbershop-manager/blob/main/backend/api/tests/test_integration.py)


## Executar todos os testes
```
docker compose run --rm test
```

## Executar testes específicos
### Testes de models
```
docker compose run --rm test pytest backend/tests/test_models.py
```

### Testes de API
```
docker compose run --rm test pytest backend/tests/test_api.py
```

### Testes de integração
```
docker compose run --rm test pytest backend/tests/test_integration.py
```