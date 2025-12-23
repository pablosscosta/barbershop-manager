# Infraestrutura
## Serviços Docker
- **web**: Django rodando em http://localhost:8000
- **db**: PostgreSQL disponível em db:5432
- **pgAdmin**: interface gráfica em http://localhost:8080

## Banco de Dados
- Nome: barbershop
- Usuário: postgres
- Senha: postgres
- Host interno: db
- Porta: 5432

## Painel Administrativo
- Django Admin disponível em http://localhost:8000/admin

## Acesso ao pgAdmin
- Login padrão: admin@admin.com / admin
- Configuração de servidor: Host `db`, Porta `5432`, Database `barbershop` 

## Observações
- Todos os serviços são orquestrados via Docker Compose.
- As credenciais e configurações estão definidas diretamente no `docker-compose.yml`.