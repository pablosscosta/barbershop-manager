# 📘 Barbershop Manager

Sistema de gerenciamento para barbearias — agendamentos, controle de barbeiros e serviços.

---

## 📌 Visão Geral / Contexto

O **Barbershop Manager** é uma aplicação full-stack criada com dois objetivos principais:

1. **Prático**: oferecer funcionalidades de gerenciamento para barbearias, como agendamento online, controle de barbeiros e gestão de serviços.  
2. **Educacional**: servir como exercício de construção de um projeto do zero, aplicando boas práticas de engenharia de software em todas as etapas — desde a organização de branches e commits até a documentação e testes automatizados.

Problema: barbearias têm dificuldade em organizar agendamentos e controlar serviços.  
Propósito adicional: praticar e consolidar padrões profissionais de desenvolvimento de software.  
Público-alvo: donos de barbearias e desenvolvedores que desejam aprender ou revisar boas práticas.  
Cenário: aplicação desenvolvida de forma incremental, seguindo GitHub Flow e princípios de arquitetura limpa.

---

## 📊 Status do Projeto

🚧 Em desenvolvimento inicial 

---

## 🚀 Tecnologias Utilizadas

### Backend
- Python 3.x
- Django 6.0
- Django REST Framework 3.16.1
- PostgreSQL (via psycopg2-binary)

---

## 🛠️ Funcionalidades

- [x] Endpoint de health-check (`GET /api/health/`)
- [x] Autenticação JWT:
  - `POST /api/token/` → login (gera access e refresh token)
  - `POST /api/token/refresh/` → gera novo access token
- [x] Endpoint protegido de teste (`GET /api/dashboard/`) → acessível apenas com token válido
- [x] Registro de usuários via API:
  - `POST /api/register/` → cria um novo usuário (campos: `username` e `password`)



---

## 📦 Instalação / Como Executar

```
# Clone o repositório
git clone https://github.com/pablosscosta/barbershop-manager.git

# Acesse a pasta do backend
cd barbershop-manager/backend

# Ative o ambiente virtual
source venv/bin/activate   # Linux/Mac
venv\Scripts\activate      # Windows

# Instale as dependências
pip install -r requirements.txt

# Realize as migrações
python manage.py migrate

# Inicie o servidor
python manage.py runserver

```

---


## 🔑 Fluxo de Teste da Autenticação

1. **Registrar usuário**
   - Faça uma requisição `POST` para `/api/register/` com os campos `username` e `password`.
   - Exemplo de body JSON:
     ```json
     {
       "username": "novo_user",
       "password": "senha123"
     }
     ```
   - Resposta esperada:
     ```json
     {"message": "Usuário registrado com sucesso!"}
     ```

2. **Obter tokens**
   - Faça uma requisição `POST` para `/api/token/` com `username` e `password`.
   - Você receberá um par de tokens: `access` e `refresh`.

3. **Usar rota protegida**
   - Faça uma requisição `GET` para `/api/dashboard/` sem token → resposta `401 Unauthorized`.
   - Faça a mesma requisição com o header `Authorization: Bearer <access_token>` → acesso autorizado.

4. **Renovar token**
   - Quando o `access token` expirar, envie o `refresh token` para `/api/token/refresh/`.
   - Você receberá um novo `access token`.

---

## ⏭️ Próximas Etapas

- [x] Configuração inicial do JWT (checkpoint 1)
- [x] Endpoints de login e refresh (checkpoint 2)
- [x] Registro de usuários via API (checkpoint 3)
- [ ] Proteção de rotas reais (checkpoint 4)
- [ ] Testes automatizados de autenticação (checkpoint 5)
- [ ] Criar CRUD de barbeiros e serviços
- [ ] Desenvolver sistema de agendamento básico
- [ ] Configurar ambiente Docker

---

## Estratégia de Branches (GitHub Flow)

- **`main`**: Branch principal (sempre estável)
- **`feature/*`**: Novas funcionalidades
- **`fix/*`**: Correções de bugs
- **`docs/*`**: Documentação
- **`refactor/*`**: Refatorações
- **`test/*`**: Testes

### Padrão de Commits (Conventional Commits)

```
feat: adiciona nova funcionalidade
fix: corrige bug
docs: atualiza documentação
refactor: refatora código
test: adiciona testes
chore: tarefas de manutenção
```

**Exemplos:**
```bash
feat(auth): adiciona endpoint de login
fix(booking): corrige validação de horário
docs(readme): atualiza instruções de setup
```

---

## Licença

Este projeto está sob a licença MIT.

---

## Autor

**Contato:**

[![GitHub](https://img.shields.io/badge/GitHub-Perfil-181717?logo=github)](https://github.com/pablosscosta)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Perfil-0A66C2?logo=linkedin&logoColor=white)](https://linkedin.com/in/pablosilva013)

---