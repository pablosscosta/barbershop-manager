# Barbershop Manager

Aplicação para gerenciamento de barbearias: cadastro de barbeiros, serviços, clientes e controle de agendamentos.  
Este projeto também tem caráter educacional, servindo como exercício de construção de uma aplicação completa com boas práticas de engenharia de software.


---

## Visão Geral

O Barbershop Manager oferece uma API para administrar barbearias de forma prática e segura.  
Principais objetivos:
- Facilitar o controle de agendamentos, barbeiros, serviços e clientes.
- Servir como estudo de boas práticas de desenvolvimento de software, incluindo arquitetura limpa, GitHub Flow, testes automatizados e documentação de APIs.


---

## Status do Projeto

Em desenvolvimento.  
Algumas funcionalidades básicas já estão disponíveis (como autenticação e CRUD de recursos principais).  
A lista completa de funcionalidades implementadas pode ser consultada em [docs/features.md](docs/features.md).


---

## Tecnologias Utilizadas

- **Backend**: Python, Django, Django REST Framework  
- **Banco de Dados**: PostgreSQL  
- **Infraestrutura**: Docker, Docker Compose  
- **Autenticação**: JWT (JSON Web Token)

Para detalhes de configuração e infraestrutura, veja [docs/infra.md](docs/infra.md).

---

## Instalação / Como Executar

Pré-requisitos: Docker Desktop instalado e em execução.

```
# Clone o repositório
git clone https://github.com/pablosscosta/barbershop-manager.git cd barbershop-manager

# Construa e suba os containers
docker compose up -d --build

# Aplique as migrações
docker compose exec web python backend/manage.py migrate

# Crie um superusuário (opcional)
docker compose exec web python backend/manage.py createsuperuser
```

- API disponível em: http://localhost:8000/api

- Painel administrativo: http://localhost:8000/admin

---

## Como Rodar os Testes
O projeto possui uma suíte de testes automatizados configurada com pytest. Para executar os testes, utilize o serviço de testes definido no Docker Compose:
```
docker compose run --rm test
```

Para instruções avançadas de execução, consulte [docs/tests.md](docs/tests.md).


---

## Documentação da API

A documentação interativa da API estará disponível em breve em `/api/docs/` (Swagger/OpenAPI).  
Esse recurso permitirá explorar os endpoints, parâmetros e respostas diretamente pelo navegador.


---

## Contribuição

Contribuições são bem-vindas!  
Veja [docs/contributing.md](docs/contributing.md) para orientações sobre como colaborar com o projeto.

---

## Licença

Este projeto está licenciado sob os termos da licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.


---

## Autor

Desenvolvido por Pablo Costa  

[![GitHub](https://img.shields.io/badge/GitHub-pablosscosta-black?logo=github)](https://github.com/pablosscosta)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-pablosilva013-blue?logo=linkedin)](https://linkedin.com/in/pablosilva013)

