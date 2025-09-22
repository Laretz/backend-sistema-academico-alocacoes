# 🎓 Sistema de Alocação Acadêmica - Backend

## 📋 Visão Geral

Este é o backend do Sistema de Alocação Acadêmica, desenvolvido para automatizar e otimizar a distribuição de horários, professores, disciplinas e salas em instituições de ensino. O sistema foi construído seguindo os princípios da **Clean Architecture** e **SOLID**, garantindo alta qualidade, manutenibilidade e escalabilidade.

## 🏗️ Arquitetura

### 🎯 Clean Architecture

O projeto segue rigorosamente os princípios da Clean Architecture, com separação clara de responsabilidades:

```
src/
├── domain/              # Entidades e regras de negócio
├── use-cases/           # Casos de uso da aplicação
├── repositories/        # Interfaces e implementações de dados
├── http/               # Controllers e rotas (interface externa)
├── algorithms/         # Algoritmos de alocação e otimização
└── lib/                # Configurações e utilitários
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
- **JWT** - Autenticação via tokens seguros
- **bcryptjs** - Criptografia de senhas
- **Zod** - Validação rigorosa de schemas

### 🧪 **Testes & Qualidade**
- **Vitest** - Framework de testes moderno e rápido
- **@vitest/coverage-v8** - Cobertura de testes detalhada
- **ESLint** - Linting e padronização de código

### 🔧 **Build & Deploy**
- **tsup** - Bundler TypeScript otimizado
- **tsx** - Execução TypeScript em desenvolvimento
- **Docker Compose** - Orquestração de containers

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
- Docker e Docker Compose
- PostgreSQL (via Docker)

### 🐳 **1. Configurar Banco de Dados**
```bash
# Subir PostgreSQL via Docker
docker compose up -d

# Verificar se está rodando
docker ps
```

### 📦 **2. Instalação**
```bash
# Instalar dependências
npm install

# Gerar cliente Prisma
npx prisma generate

# Executar migrações
npx prisma migrate dev

# Criar horários padrão
npm run setup:horarios
```

### ⚙️ **3. Variáveis de Ambiente**
Crie o arquivo `.env`:
```env
DATABASE_URL="postgresql://postgres:pgpassword@localhost:5432/postgresbd"
JWT_SECRET="seu-jwt-secret-super-seguro"
NODE_ENV="dev"
PORT=3333
```

### 🚀 **4. Execução**
```bash
# Desenvolvimento (com hot reload)
npm run dev

# Build para produção
npm run build

# Executar produção
npm start
```

### 🧪 **5. Testes**
```bash
# Testes unitários
npm test

# Testes com watch mode
npm run test:watch

# Testes E2E
npm run test:e2e

# Cobertura de testes
npm run test:coverage

# Interface visual de testes
npm run test:ui
```

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

### 🎓 **Entidades Acadêmicas**
```http
# Cursos
GET    /cursos         # Listar cursos
POST   /cursos         # Criar curso
PUT    /cursos/:id     # Atualizar curso

# Disciplinas
GET    /disciplinas    # Listar disciplinas
POST   /disciplinas    # Criar disciplina
PUT    /disciplinas/:id # Atualizar disciplina

# Turmas
GET    /turmas         # Listar turmas
POST   /turmas         # Criar turma
PUT    /turmas/:id     # Atualizar turma

# Salas
GET    /salas          # Listar salas
POST   /salas          # Criar sala
PUT    /salas/:id      # Atualizar sala
```

### 📅 **Alocações e Horários**
```http
GET    /alocacoes      # Listar alocações
POST   /alocacoes      # Criar alocação
PUT    /alocacoes/:id  # Atualizar alocação
DELETE /alocacoes/:id  # Excluir alocação

GET    /grade-horarios # Grade de horários
GET    /horarios       # Listar horários
POST   /horarios/codigo # Criar horário por código
```

### 🤖 **Algoritmos**
```http
POST   /alocacoes-geneticas        # Gerar alocação automática
GET    /alocacoes-geneticas-preview # Preview da alocação
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
- [ ] Documentação automática com Swagger
- [ ] Monitoring com Prometheus/Grafana

### 🌐 **Integração e Deploy**
- [ ] CI/CD com GitHub Actions
- [ ] Deploy automatizado
- [ ] Containerização completa
- [ ] Kubernetes para orquestração
- [ ] CDN para assets estáticos

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