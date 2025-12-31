# Infraestrutura
## Serviços Docker
- **web**: Django rodando em http://localhost:8000
- **db**: PostgreSQL disponível em db:5432
- **pgAdmin**: interface gráfica em http://localhost:8080
- **frontend-dev**: React + Vite em modo desenvolvimento, disponível em http://localhost:5173
- **frontend-prod**: React build servido por Nginx, disponível em http://localhost:3000

## Banco de Dados
- Host interno: db
- Porta: 5432
- Nome: barbershop
- Usuário: postgres
- Senha: postgres

## Painel Administrativo
- Django Admin disponível em http://localhost:8000/admin

## Acesso ao pgAdmin
- Login padrão: admin@admin.com / admin
- Configuração de servidor: Host `db`, Porta `5432`, Database `barbershop` 

## Observações
- Todos os serviços são orquestrados via Docker Compose.
- As credenciais e configurações estão definidas diretamente no `docker-compose.yml`.
- O frontend possui dois modos:
	- **Dev**: com hot reload para desenvolvimento.
	- **Prod**: otimizado e servido via Nginx.