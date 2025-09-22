# 🎓 Sistema de Alocação Acadêmica – Escola Agrícola de Jundiaí (UFRN)

> Teste de workflow GitHub Actions

Sistema desenvolvido para otimizar a alocação de turmas, disciplinas, professores, horários e salas de aula, permitindo tanto alocação automática quanto manual, oferecendo maior controle e confiabilidade para a gestão acadêmica.

## 🏗️ Arquitetura

O projeto segue os princípios da **Clean Architecture** e **Domain-Driven Design (DDD)**, implementando os princípios **SOLID**:

### 📁 Estrutura de Pastas

```
src/
├── domain/           # 🏛️ Entidades de domínio
├── use-cases/        # 💼 Regras de negócio (casos de uso)
│   ├── @factories/   # 🏭 Factory Pattern para injeção de dependência
│   ├── errors/       # ❌ Exceções customizadas
│   └── [módulos]/    # 📦 Casos de uso organizados por contexto
├── repositories/     # 🗄️ Camada de acesso a dados
│   ├── prisma/       # 🔗 Implementações concretas com Prisma
│   └── in-memory/    # 🧪 Implementações para testes
├── http/            # 🌐 Camada de apresentação (controllers e rotas)
├── lib/             # ⚙️ Configurações e utilitários
└── scripts/         # 🔧 Scripts auxiliares
```

### 🎯 Princípios SOLID Implementados

#### **S** - Single Responsibility Principle

- ✅ **Use Cases**: Cada caso de uso tem uma única responsabilidade
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
- **TypeScript** - Tipagem estática
- **Fastify** - Framework web performático

### 🗄️ **Banco de Dados**

- **PostgreSQL** - Banco relacional
- **Prisma ORM** - Object-Relational Mapping
- **Docker** - Containerização do banco

### 🔐 **Segurança & Validação**

- **JWT** - Autenticação via tokens
- **bcryptjs** - Criptografia de senhas
- **Zod** - Validação de schemas

### 🧪 **Testes & Qualidade**

- **Vitest** - Framework de testes
- **@vitest/coverage-v8** - Cobertura de testes
- **ESLint** - Linting de código

### 🔧 **Build & Deploy**

- **tsup** - Bundler TypeScript
- **tsx** - Execução TypeScript
- **Docker Compose** - Orquestração de containers

## 📋 Setup e Comandos

### 🐳 **Docker (Banco de Dados)**

```bash
# Subir banco PostgreSQL
docker compose up -d

# Ou manualmente:
docker run -d --name postgresbd -e POSTGRES_PASSWORD=pgpassword -p 5432:5432 postgres:15
docker start postgresbd
```

### 📦 **Instalação**

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

### 🚀 **Execução**

```bash
# Desenvolvimento
npm run dev

# Build
npm run build

# Produção
npm start

# Testes
npm test
npm run test:watch
npm run test:coverage
```

## 📊 Regras de Negócio (RNs)

- [x] O usuário não pode se cadastrar com um email repetido
- [] Apenas usuários com perfil de coordenador podem cadastrar ou modificar salas, turmas, disciplinas e alocações
- [] A capacidade da sala deve ser maior ou igual ao número de alunos da turma na hora da alocação
- [x] Um professor não pode ser alocado em mais de uma sala no mesmo dia e horário
- [] Cada disciplina deve respeitar a carga horária
- [x] Uma sala não pode ser alocada para duas turmas no mesmo dia e horário

## ⚙️ Requisitos Funcionais (RF)

### ✅ **Implementados**

- **👥 Gestão de Usuários**: Cadastro de professores e coordenadores com autenticação JWT
- **🏫 Gestão de Salas**: CRUD completo de salas de aula
- **📚 Gestão de Disciplinas**: CRUD completo de disciplinas
- **🎓 Gestão de Turmas**: CRUD completo de turmas
- **⏰ Gestão de Horários**: CRUD com códigos padronizados
- **📅 Alocação Manual**: Alocação de disciplinas, turmas e professores em horários específicos
- **📊 Visualização de Grades**: Por professor, turma ou sala
- **🔍 Controle de Conflitos**: Minimização de conflitos de horários
- **📄 Paginação**: Listas com até 20 itens por página

### 🚧 **Pendentes**

- **🤖 Alocação Automática**: Considerando restrições e preferências
- **📈 Relatórios**: Geração de relatórios de horários e ocupação

## 🔧 Requisitos Não Funcionais (RNFs)

### ✅ **Implementados**

- **🔐 Segurança**: Senhas criptografadas com bcryptjs
- **🗄️ Persistência**: Dados em banco PostgreSQL
- **📄 Paginação**: Listas limitadas a 20 itens
- **🎫 Autenticação**: Identificação via JWT
- **⚡ Performance**: API desenvolvida com Node.js, Fastify e Prisma
- **✅ Validação**: Dados de entrada validados com Zod
- **❌ Tratamento de Erros**: Padronizado e centralizado

### 🚧 **Pendentes**

- **📱 Responsividade**: Adaptação para desktop e mobile
- **🔄 Transações**: Para operações críticas

## 🚀 Melhorias Sugeridas X

### 🔐 **Segurança e Autorização**

- [ ] Middleware de autorização baseado em roles (COORDENADOR vs PROFESSOR)
- [ ] Rate limiting para APIs
- [ ] Refresh tokens para JWT
- [ ] Validação de força de senha

### ⭐ **Funcionalidades Avançadas**

- [ ] Sistema de notificações para conflitos de horário
- [ ] Backup automático de dados
- [ ] Logs de auditoria para alterações
- [ ] Importação/exportação de dados em CSV/Excel
- [ ] Dashboard com estatísticas de uso

### ✅ **Validações de Negócio**

- [ ] Validação de capacidade da sala vs número de alunos
- [ ] Controle de carga horária por disciplina
- [ ] Validação de pré-requisitos entre disciplinas
- [ ] Limite de horas por professor por dia

### ⚡ **Performance e Monitoramento**

- [ ] Cache para consultas frequentes
- [ ] Métricas de performance da API
- [ ] Health check endpoints
- [ ] Documentação automática com Swagger

---

## 🎯 Conclusão

Este projeto demonstra a implementação de uma **arquitetura limpa e escalável**, seguindo rigorosamente os **princípios SOLID** e as melhores práticas de desenvolvimento. A separação clara de responsabilidades, o uso de padrões como Repository e Factory, e a implementação de testes garantem um código maintível e de alta qualidade.

A arquitetura permite fácil extensão de funcionalidades e troca de implementações sem impactar outras camadas do sistema, demonstrando a aplicação prática dos conceitos de **Clean Architecture** e **Domain-Driven Design**.
