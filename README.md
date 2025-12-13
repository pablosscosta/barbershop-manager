# 📘 Barbershop Manager

Sistema de gerenciamento para barbearias — agendamentos, controle de barbeiros e serviços.

---

## 📌 Visão Geral / Contexto

O **Barbershop Manager** é uma aplicação full-stack criada com dois objetivos principais:

1. **Prático**: oferecer gerenciamento interno de barbearias. Permite ao administrador cadastrar barbeiros, serviços, clientes e controlar agendamentos, com autenticação JWT para proteger as rotas.  
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
- [x] Registro de usuários via API (`POST /api/register/`)
- [x] CRUD protegido de barbeiros (`/api/barbers/`)
- [x] CRUD protegido de serviços (`/api/services/`)
- [x] CRUD protegido de clientes (`/api/customers/`)
- [x] CRUD protegido de agendamentos (`/api/appointments/`)


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

## ⏭️ Próximas Etapas

- [x] Autenticação JWT
- [x] CRUD de barbeiros, serviços, clientes e agendamentos
- [ ] Configuração Docker
- [ ] Testes automatizados
- [ ] Endpoint de estatísticas/dashboard


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