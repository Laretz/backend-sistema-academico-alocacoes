# 🎓 Sistema de Alocação Acadêmica - Backend

## 📋 Visão Geral

Este é o backend do Sistema de Alocação Acadêmica, desenvolvido para automatizar e otimizar a distribuição de horários, professores, disciplinas e salas em instituições de ensino. O sistema foi construído seguindo os princípios da **Clean Architecture** e **SOLID**, garantindo alta qualidade, manutenibilidade e escalabilidade.

## 🏗️ Arquitetura

### 🎯 Clean Architecture

O projeto segue rigorosamente os princípios da Clean Architecture, com separação clara de responsabilidades:

```
├── prisma/             # Schema do banco de dados e migrações
src/
├── @types/             # Definições de tipos TypeScript
├── algorithms/         # Algoritmos de alocação e otimização
│   ├── allocation/     # Algoritmos de alocação de horários
│   └── genetic/        # Algoritmo genético para otimização
├── env/                # Configurações de ambiente
├── http/               # Camada de interface externa (Controllers e rotas)
│   ├── controllers/    # Controllers HTTP
│   ├── middlewares/    # Middlewares de autenticação e validação
│   └── routes.ts       # Definição das rotas da API
├── lib/                # Configurações e bibliotecas externas
├── repositories/       # Interfaces e implementações de acesso a dados
│   ├── in-memory/      # Implementações em memória para testes
│   ├── prisma-repositories/ # Implementações com Prisma ORM
│   ├── xinterface.ts
│   └── yinterface.ts
├── scripts/            # Scripts de inicialização e população do banco
├── tests/              # ✅ Estrutura organizada de testes
│   ├── e2e/           # Testes End-to-End (integração completa)
│   ├── unit/          # Testes unitários organizados por domínio
│   └── infra/         # Infraestrutura de testes (ambiente Prisma)
├── use-cases/          # Casos de uso da aplicação (Regras de negócio)
│   ├── @factories/     # Factories para injeção de dependência
│   ├── alocacao/       # Casos de uso de alocação
│   ├── curso/          # Casos de uso de cursos
│   ├── disciplina/     # Casos de uso de disciplinas
│   ├── errors/         # Definições de erros customizados
│   ├── horario/        # Casos de uso de horários
│   ├── sala/           # Casos de uso de salas
│   ├── turma/          # Casos de uso de turmas
│   └── users/          # Casos de uso de usuários
├── utils/              # Utilitários e helpers
├── app.ts              # Configuração da aplicação Fastify
└── server.ts           # Ponto de entrada do servidor
```

### 🔧 Princípios SOLID Implementados

#### **S** - Single Responsibility Principle

- ✅ **Use Cases**: Cada use case tem uma única responsabilidade
- ✅ **Repositories**: Cada repository gerencia apenas uma entidade
- ✅ **Controllers**: Cada controller trata apenas um endpoint específico

#### **O** - Open/Closed Principle

- ✅ **Interfaces de Repository**: Abertas para extensão, fechadas para modificação
- ✅ **Use Cases**: Podem ser estendidos sem modificar código existente

#### **L** - Liskov Substitution Principle

- ✅ **Repository Pattern**: Implementações Prisma e In-Memory são intercambiáveis
- ✅ **Testes**: Use cases funcionam com qualquer implementação de repository

#### **I** - Interface Segregation Principle

- ✅ **Repositories**: Interfaces específicas para cada entidade
- ✅ **Use Cases**: Dependem apenas das interfaces necessárias

#### **D** - Dependency Inversion Principle

- ✅ **Factory Pattern**: Use cases dependem de abstrações, não de implementações
- ✅ **Injeção de Dependência**: Controllers recebem use cases via factories

## 🛠️ Stack Tecnológica

### 🚀 **Core**

- **Node.js** - Runtime JavaScript
- **TypeScript** - Tipagem estática e desenvolvimento mais seguro
- **Fastify** - Framework web performático e moderno

### 🗄️ **Banco de Dados**

- **PostgreSQL** - Banco relacional robusto
- **Prisma ORM** - Object-Relational Mapping moderno
- **Docker** - Containerização do banco de dados

### 🔐 **Segurança & Validação**

- **JWT** - Autenticação via tokens seguros ✅
- **bcryptjs** - Criptografia de senhas ✅
- **Zod** - Validação rigorosa de schemas ✅
- **Middlewares** - Verificação JWT e controle de acesso ✅

### 🧪 **Testes & Qualidade**

- **Vitest** - Framework de testes moderno e rápido com projetos separados
- **@vitest/coverage-v8** - Cobertura de testes detalhada
- **@vitest/ui** - Interface visual para execução de testes
- **ESLint** - Linting e padronização de código
- **Supertest** - Testes de integração HTTP

## 📋 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev                    # Servidor com hot reload

# Build e Produção
npm run build                  # Build da aplicação com tsup
npm start                      # Executar em produção

# Testes ✅
npm test                       # Todos os testes (unitários + e2e)
npm run test:unit              # Apenas testes unitários
npm run test:unit:watch        # Testes unitários em modo watch
npm run test:e2e               # Apenas testes end-to-end
npm run test:e2e:watch         # Testes e2e em modo watch
npm run test:all               # Executar todos os projetos de teste
npm run test:coverage          # Cobertura de todos os testes
npm run test:coverage:unit     # Cobertura apenas dos testes unitários
npm run test:coverage:e2e      # Cobertura apenas dos testes e2e
npm run test:ui                # Interface visual de testes

# Banco de Dados
npx prisma studio              # Interface visual do banco
npx prisma migrate dev         # Executar migrações
npx prisma generate            # Gerar cliente Prisma

# Utilitários
npm run setup:horarios         # Criar horários padrão no banco
```

### 🔧 **Build & Deploy**

- **tsup** - Bundler TypeScript otimizado
- **tsx** - Execução TypeScript em desenvolvimento
- **Docker Compose** - Orquestração de containers
- **Docker** - Containerização da aplicação ✅
- **Render** - Plataforma de deploy em produção ✅

## 🎯 Funcionalidades Principais

### ✅ **Implementadas**

#### 👥 **Gestão de Usuários**

- Cadastro de professores, coordenadores e administradores
- Autenticação JWT com diferentes níveis de acesso
- Perfis: ADMIN, COORDENADOR, PROFESSOR

#### 🏫 **Gestão Acadêmica**

- **Cursos**: CRUD completo com turnos e duração
- **Disciplinas**: Gestão com carga horária e códigos
- **Turmas**: Controle de períodos e capacidade
- **Salas**: Gestão por prédios com tipos (Lab/Sala)
- **Horários**: Sistema padronizado com códigos (ex: 2M12)

#### 📅 **Sistema de Alocação**

- **Alocação Manual**: Interface para alocação precisa
- **Algoritmo Genético**: Alocação automática inteligente
- **Controle de Conflitos**: Validação de sobreposições
- **Grade de Horários**: Visualização por turma, professor ou sala

#### 🔍 **Relatórios e Consultas**

- Grade horária consolidada
- Carga horária por professor
- Ocupação de salas
- Alocações por período

### 🚧 **Em Desenvolvimento**

- Sistema de preferências de horários
- Relatórios avançados de ocupação
- Notificações automáticas de conflitos

## 🧬 Algoritmos Avançados

### 🤖 **Algoritmo Genético**

Implementação sofisticada para alocação automática:

```typescript
// Estrutura do algoritmo genético
src/algorithms/genetic/
├── genetic-algorithm.ts     # Algoritmo principal
├── genetic-operators.ts     # Operadores (crossover, mutação)
└── constraints.ts          # Restrições e validações
```

**Características:**

- **População**: Múltiplas soluções de alocação
- **Fitness**: Avaliação baseada em conflitos e otimização
- **Crossover**: Combinação de soluções eficientes
- **Mutação**: Exploração de novas possibilidades
- **Elitismo**: Preservação das melhores soluções

### ⚡ **Resolução de Conflitos**

```typescript
src/algorithms/allocation/
├── allocation-service.ts    # Serviço principal de alocação
└── conflict-resolver.ts     # Detecção e resolução de conflitos
```

## 📊 Regras de Negócio

### ✅ **Implementadas**

- ✅ Email único por usuário
- ✅ Professor não pode estar em duas salas simultaneamente
- ✅ Sala não pode ter duas turmas no mesmo horário
- ✅ Validação de capacidade sala vs número de alunos

### 🚧 **Pendentes**

- [ ] Controle de carga horária por disciplina
- [ ] Validação de pré-requisitos entre disciplinas
- [ ] Limite de horas consecutivas por professor

## 🚀 Como Executar

### 📋 **Pré-requisitos**

- Node.js 18+
- PostgreSQL 14+ (ou Docker)
- npm ou yarn

### 🐳 **Execução com Docker (Recomendado)**

1. **Clone o repositório**

```bash
git clone <url-do-repositorio>
cd backend
```

2. **Configure o ambiente**

```bash
cp .env.example .env
# Edite o arquivo .env com suas configurações
```

3. **Execute com Docker Compose**

```bash
docker-compose up -d
```

A API estará disponível em `http://localhost:3333`

### 💻 **Execução Local**

1. **Clone o repositório**

```bash
git clone <url-do-repositorio>
cd backend
```

2. **Instale as dependências**

```bash
npm install
```

3. **Configure o ambiente**

```bash
cp .env.example .env
# Edite o arquivo .env com suas configurações
```

4. **Execute as migrações**

```bash
npx prisma migrate dev
```

5. **Popule o banco (opcional)**

```bash
npm run seed
```

6. **Inicie o servidor**

```bash
npm run dev
```

A API estará disponível em `http://localhost:3333`

## 🧪 Testes

### Estrutura de Testes ✅

O projeto possui uma estrutura organizada de testes separada por tipo:

```
src/tests/
├── unit/              # Testes unitários organizados por domínio
│   ├── use-cases/     # Testes dos casos de uso
│   ├── algorithms/    # Testes dos algoritmos
│   └── utils/         # Testes dos utilitários
├── e2e/               # Testes End-to-End (integração completa)
│   ├── controllers/   # Testes dos endpoints HTTP
│   └── routes/        # Testes das rotas
└── infra/             # Infraestrutura de testes
    └── prisma/        # Configuração do ambiente de teste
```

### Comandos de Teste ✅

```bash
# Executar todos os testes (unitários + e2e)
npm test

# Executar apenas testes unitários
npm run test:unit

# Executar apenas testes E2E
npm run test:e2e

# Executar todos os testes com interface visual
npm run test:ui

# Executar testes com cobertura
npm run test:coverage

# Executar testes em modo watch
npm run test:watch
```

### Configuração de Testes ✅

- **Framework**: Vitest com projetos separados para unit e e2e
- **Mocks**: Configuração automática com `clearMocks` e `restoreMocks`
- **Ambiente E2E**: Banco PostgreSQL isolado para testes de integração
- **Cobertura**: Relatórios detalhados com V8 coverage

## 📡 API Endpoints

### 🔐 **Autenticação**

```http
POST /session          # Login
GET  /profile          # Perfil do usuário
```

### 👥 **Usuários**

```http
GET    /users          # Listar usuários
POST   /users          # Criar usuário
GET    /users/:id      # Buscar usuário
PUT    /users/:id      # Atualizar usuário
DELETE /users/:id      # Excluir usuário
```

## 🎯 Pontos Fortes

### 🏗️ **Arquitetura Sólida**

- **Clean Architecture** com separação clara de camadas
- **SOLID principles** rigorosamente aplicados
- **Repository Pattern** para abstração de dados
- **Factory Pattern** para injeção de dependências

### 🔒 **Segurança Robusta**

- Autenticação JWT com diferentes níveis de acesso
- Senhas criptografadas com bcryptjs
- Validação rigorosa com Zod
- Middleware de autorização por roles

### ⚡ **Performance Otimizada**

- Fastify para alta performance
- Prisma ORM com queries otimizadas
- Paginação automática (20 itens por página)
- Algoritmos eficientes de alocação

### 🧪 **Qualidade Assegurada**

- Cobertura de testes abrangente
- Testes unitários e E2E
- ESLint para padronização
- TypeScript para type safety

### 🤖 **Inteligência Artificial**

- Algoritmo genético para alocação automática
- Resolução inteligente de conflitos
- Otimização multi-objetivo
- Aprendizado baseado em soluções anteriores

## 🚀 Próximos Passos

### 🔐 **Segurança Avançada**

- [ ] Implementar refresh tokens
- [ ] Rate limiting para APIs
- [ ] Logs de auditoria detalhados
- [ ] Validação de força de senha
- [ ] Two-factor authentication (2FA)

### ⭐ **Funcionalidades Avançadas**

- [ ] Sistema de preferências de horários para professores
- [ ] Notificações em tempo real para conflitos
- [ ] Backup automático de dados
- [ ] Importação/exportação CSV/Excel
- [ ] Dashboard com métricas avançadas

### 🤖 **Inteligência Artificial**

- [ ] Machine Learning para predição de conflitos
- [ ] Otimização baseada em histórico
- [ ] Sugestões inteligentes de alocação
- [ ] Análise preditiva de ocupação

### ⚡ **Performance e Monitoramento**

- [ ] Cache Redis para consultas frequentes
- [ ] Métricas de performance em tempo real
- [ ] Health check endpoints
- [x] **Swagger UI** - Documentação interativa da API ✅
- [ ] Monitoring com Prometheus/Grafana

### 📖 **Documentação da API Disponível**

A API possui documentação interativa gerada automaticamente:

```bash
# Iniciar o servidor
npm run dev

# Acessar documentação
http://localhost:3333/docs
```

**Funcionalidades da documentação**:

- Interface Swagger UI interativa
- Schemas automáticos baseados em Zod
- Exemplos de requisições e respostas
- Teste direto dos endpoints

### 🌐 **Integração e Deploy**

- [x] **Docker Compose** - Orquestração do banco PostgreSQL ✅
- [x] **Build Script** - Comando `npm run build` com tsup ✅
- [x] **Start Script** - Comando `npm start` para produção ✅
- [ ] CI/CD com GitHub Actions
- [ ] Deploy automatizado
- [ ] Containerização completa
- [ ] Kubernetes para orquestração
- [ ] CDN para assets estáticos

### 🐳 **Containerização Disponível**

```bash
# Subir banco PostgreSQL via Docker
docker-compose up -d

# Verificar containers rodando
docker ps

# Parar containers
docker-compose down
```

**Configuração atual**: `docker-compose.yml` configurado apenas para PostgreSQL

- **Imagem**: postgres:15
- **Porta**: 5432
- **Banco**: postgresbd
- **Usuário**: postgres

### 📊 **Analytics e Relatórios**

- [ ] Relatórios avançados de ocupação
- [ ] Análise de eficiência de alocação
- [ ] Métricas de uso do sistema
- [ ] Dashboards executivos
- [ ] Exportação de relatórios em PDF

## 🎯 Conclusão

Este backend representa uma implementação robusta e escalável de um sistema de alocação acadêmica, demonstrando:

- **Excelência Técnica**: Arquitetura limpa, código bem estruturado e testado
- **Inovação**: Uso de algoritmos genéticos para otimização automática
- **Escalabilidade**: Preparado para crescimento e novas funcionalidades
- **Manutenibilidade**: Código limpo e bem documentado
- **Performance**: Otimizado para alta carga e responsividade

A arquitetura permite fácil extensão de funcionalidades e troca de implementações sem impactar outras camadas do sistema, demonstrando a aplicação prática dos conceitos de **Clean Architecture** e **Domain-Driven Design**.

---

**Desenvolvido com ❤️ para o TCC - Sistema de Alocação Acadêmica**
