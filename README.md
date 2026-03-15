# 🚀 GEDS Inovação Tech — Plataforma Institucional

![GEDS Inovação](https://img.shields.io/badge/GEDS-Inovação_Tech-00DBFF?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?style=for-the-badge&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.2-6DB33F?style=for-the-badge&logo=spring-boot)
![Java](https://img.shields.io/badge/Java-17-ED8B00?style=for-the-badge&logo=openjdk)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=for-the-badge&logo=supabase)
![Sentry](https://img.shields.io/badge/Sentry-Monitoramento-362D59?style=for-the-badge&logo=sentry)

> **"Engenharia de Software & Soluções Digitais"**

Esta é a plataforma institucional oficial da **GEDS Inovação Tech**, uma boutique de software focada em alta performance, arquitetura robusta e design premium. O projeto reflete a identidade **Cyber-Neo** da marca, servindo tanto como cartão de visitas quanto como uma demonstração técnica real da capacidade de entrega da equipe.

---

## 📋 Índice

- [Sobre a Empresa](#-sobre-a-empresa)
- [Identidade Visual](#-identidade-visual-cyber-neo)
- [Funcionalidades e Páginas](#-funcionalidades-e-páginas)
- [Arquitetura do Projeto](#-arquitetura-do-projeto)
- [Frontend — Next.js](#-frontend--nextjs)
- [Backend — Spring Boot](#-backend--spring-boot-java)
- [Banco de Dados — Supabase + PostgreSQL](#-banco-de-dados--supabase--postgresql)
- [Monitoramento — Sentry](#-monitoramento--sentry)
- [Estrutura de Diretórios](#-estrutura-de-diretórios)
- [Instalação e Execução](#-instalação-e-execução)
- [Acessibilidade](#-acessibilidade)
- [Contato](#-contato)

---

## 🏢 Sobre a Empresa

A **GEDS Inovação Tech** é uma empresa de tecnologia e engenharia de software sediada em **São Luís – MA, Brasil**. Nossa missão é transformar desafios de negócio em soluções digitais de alta qualidade, trabalhando com:

- **Desenvolvimento sob medida**: Sistemas corporativos de alta complexidade com foco em performance, segurança e escalabilidade.
- **Cloud & Infraestrutura**: Arquiteturas modernas e migração para nuvem, reduzindo custos e eliminando dívida técnica.
- **Consultoria Estratégica**: Do MVP ao produto final, transformamos ideias em roadmaps técnicos viáveis.
- **Data & Analytics**: Dashboards inteligentes e integração de dados para decisões baseadas em fatos.
- **UX/UI Design**: Interfaces que convertem, com foco na experiência do usuário e na identidade da marca.

**Pilares do Projeto:**
1. ⚡ **Excelência Técnica** — Código limpo, componentização e tipagem rigorosa.
2. 🏛️ **Maturidade Institucional** — Processos bem definidos, prazos e qualidade.
3. 🎯 **Experiência do Usuário (UX)** — Navegação fluida, acessibilidade e feedback visual.

---

## 🎨 Identidade Visual (Cyber-Neo)

O design system segue a estética **Cyber-Neo**, caracterizada por:

| Elemento | Definição |
|---|---|
| **Base** | Fundo preto (`bg-black`) para profundidade e contraste |
| **Cor Primária** | Ciano neon `#00DBFF` como destaque principal |
| **Efeito de UI** | *Glassmorphism* — vidro fosco com backdrop-filter |
| **Animações** | Framer Motion — entradas, hovers e scroll reveals |
| **Tipografia** | Fontes modernas com gradientes de texto |
| **Bordas** | Linhas finas e detalhes minimalistas com glows sutis |

---

## ✨ Funcionalidades e Páginas

### Páginas Públicas
| Rota | Descrição |
|---|---|
| `/` | **Home** — Hero section, carrossel de serviços, sobre nós e estatísticas |
| `/processo` | **Como Trabalhamos** — Metodologia detalhada (Entendimento → Entrega) |
| `/portfolios` | **Portfólio** — Vitrine de projetos e colaboradores com stacks e links |
| `/plans` | **Planos e Preços** — Tabela de preços clara (Gratuito, Premium, Advanced, Empresarial) |
| `/contatos` | **Contato** — Formulário integrado, WhatsApp, e-mail e localização |
| `/servicos` | **Serviços** — Listagem completa dos serviços oferecidos |
| `/sobre-servicos` | **Sobre os Serviços** — Detalhamento de cada área |
| `/geds-lab` | **GEDS Lab** — Inovações, protótipos e projetos futuros |
| `/green-tech` | **Green Tech** — Iniciativas de tecnologia sustentável |

### Páginas Legais e de Conformidade
| Rota | Descrição |
|---|---|
| `/politica-de-privacidade` | Conformidade com LGPD e proteção de dados |
| `/termos-de-uso` | Regras de utilização da plataforma |

### Área do Cliente (Em Desenvolvimento)
| Rota | Descrição |
|---|---|
| `/login` | Autenticação de usuários |
| `/cadastro` | Criação de nova conta |
| `/esqueci-senha` | Recuperação de senha |
| `/userProfile` | Perfil do usuário com bio, habilidades e links |
| `/pagamento` | Fluxo de pagamento de planos (Pix, Boleto, Cartão) |

---

## 🏗️ Arquitetura do Projeto

O projeto adota uma arquitetura **monorepo** dividida em duas pastas raiz:

```
geds_website/
├── frontend/       # Aplicação Next.js (React + TypeScript)
└── backend/        # API REST (Spring Boot + Java 17)
```

O **frontend** consome dados tanto do **Supabase** diretamente (operações de leitura e autenticação) quanto da **API do backend** (regras de negócio mais complexas). O monitoramento de erros e performance é centralizado pelo **Sentry**.

```
┌──────────────┐     API REST      ┌─────────────────┐
│   Frontend   │ ◄────────────────► │  Backend (Java) │
│  (Next.js)   │                    │  (Spring Boot)  │
└──────┬───────┘                    └────────┬────────┘
       │                                     │
       │ SDK JS                              │ JDBC / JPA
       ▼                                     ▼
┌──────────────────────────────────────────────────────┐
│                 Supabase (PostgreSQL)                │
│     usuarios · projetos · planos · contatos          │
└──────────────────────────────────────────────────────┘
       │
       │ DSN
       ▼
┌──────────────┐
│    Sentry    │  ← Monitoramento de erros e performance
└──────────────┘
```

---

## 🖥️ Frontend — Next.js

### Visão Geral

O frontend foi construído com **Next.js 15** usando o **App Router**, aproveitando Server Components para performance máxima e Client Components para interatividade.

### Tecnologias Utilizadas

#### Core
| Tecnologia | Versão | Finalidade |
|---|---|---|
| **Next.js** | ^15.5 | Framework React com App Router e SSR |
| **React** | ^19.1 | Biblioteca de UI |
| **TypeScript** | ^5.6 | Tipagem estática e escalabilidade |

#### Estilização e UI
| Tecnologia | Versão | Finalidade |
|---|---|---|
| **Tailwind CSS** | ^4.0 | Estilização utilitária e responsiva |
| **Framer Motion** | ^12.24 | Animações complexas e scroll reveals |
| **Lucide React** | ^0.487 | Biblioteca de ícones modernos |
| **React Icons** | ^5.5 | Ícones vetoriais (FontAwesome, etc.) |
| **Swiper** | ^12.1 | Carrosséis touch para mobile e desktop |

#### Componentes e Formulários
| Tecnologia | Versão | Finalidade |
|---|---|---|
| **Radix UI** | latest | Componentes acessíveis (Checkbox, Select, Tabs, Toast…) |
| **React Hook Form** | ^7.71 | Gerenciamento de estado de formulários |
| **Zod** | ^4.3 | Validação de schemas de dados |
| **class-variance-authority** | ^0.7 | Variantes de componentes com tipagem |
| **clsx + tailwind-merge** | latest | Composição de classes CSS condicionais |

#### Integrações
| Tecnologia | Versão | Finalidade |
|---|---|---|
| **@supabase/supabase-js** | ^2.97 | Client para o banco de dados Supabase |
| **@sentry/nextjs** | ^10.39 | Monitoramento de erros e performance |
| **jsPDF** | ^4.0 | Geração de recibos em PDF no cliente |

### Estrutura de Páginas (`src/app/`)

```
src/
├── app/
│   ├── api/                        # Route Handlers (Next.js API Routes)
│   ├── cadastro/                   # Página de Cadastro
│   ├── components/                 # Componentes de página reutilizáveis
│   ├── contatos/                   # Página de Contato
│   ├── esqueci-senha/              # Recuperação de senha
│   ├── geds-lab/                   # Página GEDS Lab
│   ├── green-tech/                 # Página Green Tech
│   ├── login/                      # Página de Login
│   ├── pagamento/                  # Fluxo de Pagamento
│   ├── plans/                      # Planos e Preços
│   ├── politica-de-privacidade/    # Política de Privacidade (LGPD)
│   ├── portfolios/                 # Portfólio de Projetos
│   ├── processo/                   # Metodologia de Trabalho
│   ├── servicos/                   # Serviços
│   ├── sobre-servicos/             # Detalhes dos Serviços
│   ├── termos-de-uso/              # Termos de Uso
│   ├── userProfile/                # Perfil do Usuário
│   ├── global-error.tsx            # Página de erro global (integrada ao Sentry)
│   ├── globals.css                 # Estilos globais
│   ├── layout.tsx                  # Layout raiz da aplicação
│   └── page.tsx                    # Home Page
├── components/                     # Componentes globais reutilizáveis
├── lib/                            # Utilitários e clientes (Supabase, etc.)
├── instrumentation.ts              # Inicialização do Sentry (Server)
└── instrumentation-client.ts       # Inicialização do Sentry (Client + Replay)
```

---

## ☕ Backend — Spring Boot (Java)

### Visão Geral

A API REST do backend foi desenvolvida com **Spring Boot 3.2** e **Java 17**, fornecendo endpoints seguros para as operações de negócio que exigem mais controle do servidor.

### Tecnologias Utilizadas

| Tecnologia | Versão | Finalidade |
|---|---|---|
| **Java** | 17 (LTS) | Linguagem principal do backend |
| **Spring Boot** | 3.2.2 | Framework principal da API |
| **Spring Web** | — | Criação de endpoints REST |
| **Spring Data JPA** | — | ORM e persistência com PostgreSQL |
| **Spring Validation** | — | Validação de dados de entrada (Bean Validation) |
| **PostgreSQL Driver** | — | Conexão com o banco de dados |
| **Lombok** | — | Redução de boilerplate (getters, setters, construtores) |
| **Maven** | — | Gerenciador de dependências e build |

### Organização do Código (`src/main/java/com/geds/api/`)

```
com.geds.api/
├── GedsApplication.java            # Ponto de entrada da aplicação
│
├── controllers/                    # Camada de apresentação (REST endpoints)
│   ├── AuthController.java         # Autenticação e login
│   ├── PlanoController.java        # CRUD de planos de assinatura
│   └── UsuarioController.java      # CRUD de usuários e perfis
│
├── entities/                       # Modelos de dados (mapeamento JPA)
│   ├── Usuario.java                # Entidade de usuário
│   ├── Plano.java                  # Entidade de planos
│   ├── Projeto.java                # Entidade de projetos
│   ├── Pagamento.java              # Entidade de pagamentos
│   ├── Servico.java                # Entidade de serviços
│   └── Contato.java                # Entidade de contatos/leads
│
└── repositories/                   # Camada de acesso a dados (Spring Data JPA)
    ├── UsuarioRepository.java      # Queries de usuários
    ├── PlanoRepository.java        # Queries de planos
    └── ProjetoRepository.java      # Queries de projetos
```

---

## 🗄️ Banco de Dados — Supabase + PostgreSQL

### Visão Geral

O banco de dados é gerenciado pelo **Supabase**, uma plataforma open-source que provê um banco **PostgreSQL** gerenciado na nuvem com recursos adicionais como autenticação, storage e API em tempo real.

> O schema completo do banco está documentado em [`backend/geds.sql`](./backend/geds.sql).

### Tabelas

#### `usuarios`
Armazena os dados dos membros e clientes da plataforma.

| Coluna | Tipo | Descrição |
|---|---|---|
| `id` | UUID (PK) | Identificador único gerado automaticamente |
| `nome` | VARCHAR(100) | Nome completo do usuário |
| `email` | VARCHAR(100) | E-mail único para autenticação |
| `senha` | VARCHAR(255) | Senha com hash (bcrypt) |
| `cargo` | VARCHAR(100) | Cargo ou função (ex: "Administrador") |
| `biografia` | TEXT | Bio profissional |
| `url_avatar` | VARCHAR(255) | URL da foto de perfil |
| `habilidades` | TEXT[] | Array de tecnologias/skills |
| `experiencia_anos` | INTEGER | Anos de experiência |
| `total_clientes` | INTEGER | Número de clientes atendidos |
| `url_linkedin` | VARCHAR(255) | Link do perfil LinkedIn |
| `url_github` | VARCHAR(255) | Link do perfil GitHub |
| `url_twitter` | VARCHAR(255) | Link do perfil Twitter/X |
| `data_criacao` | TIMESTAMP | Data de cadastro |

#### `planos`
Define os níveis de assinatura da plataforma.

| Coluna | Tipo | Descrição |
|---|---|---|
| `id` | SERIAL (PK) | ID incremental |
| `nome` | VARCHAR(50) | Nome do plano (Gratuito, Premium, Advanced, Empresarial) |
| `preco_mensal` | DECIMAL(10,2) | Preço mensal em R$ |
| `preco_anual` | DECIMAL(10,2) | Preço anual em R$ |
| `descricao` | TEXT | Descrição do plano |
| `beneficios` | TEXT[] | Lista de benefícios incluídos |

#### `projetos`
Portfólio de projetos vinculados a usuários.

| Coluna | Tipo | Descrição |
|---|---|---|
| `id` | UUID (PK) | Identificador único |
| `proprietario_id` | UUID (FK) | Referência ao usuário dono |
| `titulo` | VARCHAR(100) | Nome do projeto |
| `descricao` | TEXT | Descrição detalhada |
| `status` | VARCHAR(50) | "Em progresso" ou "Concluído" |
| `progresso` | INTEGER | Percentual de conclusão (0–100) |
| `tecnologias` | TEXT[] | Tecnologias utilizadas |
| `url_repositorio` | VARCHAR(255) | Link do GitHub |
| `url_deploy` | VARCHAR(255) | Link do deploy |
| `url_imagem` | VARCHAR(255) | Screenshot do projeto |

#### `pagamentos`
Histórico de transações financeiras dos usuários.

| Coluna | Tipo | Descrição |
|---|---|---|
| `id` | UUID (PK) | Identificador único |
| `usuario_id` | UUID (FK) | Referência ao usuário |
| `plano_id` | INTEGER (FK) | Referência ao plano contratado |
| `valor` | DECIMAL(10,2) | Valor da transação |
| `metodo_pagamento` | VARCHAR(20) | `'pix'`, `'boleto'` ou `'cartao'` |
| `status` | VARCHAR(20) | `'pendente'`, `'concluido'`, `'falhado'` |
| `codigo_voucher` | VARCHAR(20) | Cupom de desconto aplicado |
| `parcelas` | INTEGER | Número de parcelas (cartão) |
| `cartao_final` | VARCHAR(4) | Últimos 4 dígitos do cartão |
| `url_recibo` | VARCHAR(255) | Link para o PDF do recibo |

#### `servicos`
Catálogo dos serviços oferecidos pela GEDS.

| Coluna | Tipo | Descrição |
|---|---|---|
| `id` | SERIAL (PK) | ID incremental |
| `titulo` | VARCHAR(100) | Nome do serviço |
| `descricao` | TEXT | Descrição do serviço |
| `nome_icone` | VARCHAR(50) | Ícone (Lucide ou React Icons) |
| `url_imagem` | VARCHAR(255) | Imagem ilustrativa |
| `url_link` | VARCHAR(255) | Link para a seção/página |
| `categoria` | VARCHAR(50) | Área: Desenvolvimento, Cloud, Design… |

#### `contatos`
Leads e mensagens recebidas pelo formulário de contato.

| Coluna | Tipo | Descrição |
|---|---|---|
| `id` | SERIAL (PK) | ID incremental |
| `nome` | VARCHAR(100) | Nome do remetente |
| `email` | VARCHAR(100) | E-mail para resposta |
| `assunto` | VARCHAR(150) | Assunto da mensagem |
| `mensagem` | TEXT | Conteúdo da mensagem |
| `status` | VARCHAR(20) | `'nao_lido'`, `'lido'`, `'respondido'` |

### Dados Iniciais (Seeds)
O arquivo `geds.sql` já inclui dados de exemplo prontos para desenvolvimento:
- ✅ 4 planos de assinatura (Gratuito, Premium, Advanced, Empresarial)
- ✅ 5 serviços cadastrados
- ✅ 1 usuário administrador de exemplo
- ✅ 2 projetos vinculados
- ✅ 1 pagamento de exemplo
- ✅ 2 contatos/leads de exemplo

---

## 🔍 Monitoramento — Sentry

### Visão Geral

O **Sentry** é a plataforma de observabilidade utilizada para monitorar erros, performance e a experiência do usuário na aplicação em tempo real. A integração foi feita com o SDK `@sentry/nextjs` na versão **^10.39**.

**Organização:** `geds-inovacao` | **Projeto:** `geds-web`

### O Que é Monitorado

| Funcionalidade | Descrição |
|---|---|
| **Captura de Erros** | Erros JavaScript capturados automaticamente no client e no server |
| **Performance Tracing** | Monitoramento de latência de páginas e requisições (`tracesSampleRate: 1`) |
| **Session Replay** | Gravação de sessões de usuários para reproduzir bugs visuais (10% das sessões, 100% em erros) |
| **Server-Side Errors** | Erros no servidor Next.js (SSR, API Routes, Edge Functions) |
| **PII** | Dados de usuário enviados para contexto de debug (`sendDefaultPii: true`) |
| **Source Maps** | Upload automático de source maps para stack traces legíveis em produção |
| **Router Transitions** | Captura de transições de rota do Next.js para performance |
| **Vercel Cron Monitors** | Monitoramento automático de CRON jobs na Vercel |

### Arquivos de Configuração

| Arquivo | Ambiente | Descrição |
|---|---|---|
| `sentry.server.config.ts` | Servidor (Node.js) | Init do Sentry para SSR e API Routes |
| `sentry.edge.config.ts` | Edge Runtime | Init do Sentry para Edge Functions |
| `src/instrumentation-client.ts` | Browser | Init do Sentry + Session Replay no cliente |
| `src/instrumentation.ts` | Servidor | Ponto de instrumentação do Next.js |
| `src/app/global-error.tsx` | Browser | Página de erro global integrada ao Sentry |

---

## 📂 Estrutura de Diretórios

```
geds_website/
│
├── frontend/                           # Aplicação Next.js
│   ├── src/
│   │   ├── app/                        # App Router (páginas e layouts)
│   │   │   ├── api/                    # Route Handlers (Next.js API)
│   │   │   ├── cadastro/               # Página de Cadastro
│   │   │   ├── components/             # Componentes das páginas
│   │   │   ├── contatos/               # Página de Contato
│   │   │   ├── esqueci-senha/          # Recuperação de Senha
│   │   │   ├── geds-lab/               # GEDS Lab
│   │   │   ├── green-tech/             # Green Tech
│   │   │   ├── login/                  # Página de Login
│   │   │   ├── pagamento/              # Fluxo de Pagamento
│   │   │   ├── plans/                  # Planos e Preços
│   │   │   ├── politica-de-privacidade/
│   │   │   ├── portfolios/             # Portfólio
│   │   │   ├── processo/               # Metodologia
│   │   │   ├── servicos/               # Serviços
│   │   │   ├── sobre-servicos/         # Detalhes dos Serviços
│   │   │   ├── termos-de-uso/
│   │   │   ├── userProfile/            # Perfil do Usuário
│   │   │   ├── global-error.tsx        # Página de erro (Sentry)
│   │   │   ├── layout.tsx              # Layout raiz
│   │   │   └── page.tsx                # Home
│   │   ├── components/                 # Componentes globais (UI Kit)
│   │   ├── lib/                        # Utilities e clientes (Supabase, etc.)
│   │   ├── instrumentation.ts          # Sentry Server Init
│   │   └── instrumentation-client.ts   # Sentry Client Init + Replay
│   ├── public/                         # Assets estáticos (imagens, ícones)
│   ├── next.config.ts                  # Config Next.js + Sentry webpack plugin
│   ├── sentry.server.config.ts         # Sentry Server Config
│   ├── sentry.edge.config.ts           # Sentry Edge Config
│   ├── tsconfig.json                   # Configurações do TypeScript
│   ├── postcss.config.mjs              # Config PostCSS / Tailwind
│   ├── eslint.config.mjs               # Regras ESLint
│   └── package.json                    # Dependências do Frontend
│
├── backend/                            # API REST Spring Boot
│   ├── src/main/java/com/geds/api/
│   │   ├── GedsApplication.java        # Ponto de entrada
│   │   ├── controllers/                # Endpoints REST
│   │   │   ├── AuthController.java
│   │   │   ├── PlanoController.java
│   │   │   └── UsuarioController.java
│   │   ├── entities/                   # Modelos JPA
│   │   │   ├── Usuario.java
│   │   │   ├── Plano.java
│   │   │   ├── Projeto.java
│   │   │   ├── Pagamento.java
│   │   │   ├── Servico.java
│   │   │   └── Contato.java
│   │   └── repositories/               # Spring Data JPA Repositories
│   │       ├── UsuarioRepository.java
│   │       ├── PlanoRepository.java
│   │       └── ProjetoRepository.java
│   ├── src/main/resources/             # application.properties
│   ├── geds.sql                        # Schema completo + seeds
│   └── pom.xml                         # Dependências Maven
│
├── vercel.json                         # Configuração de deploy (Vercel)
└── README.md                           # Este arquivo
```

---

## 🚀 Instalação e Execução

### Pré-Requisitos

- **Node.js** >= 18.x
- **Java** 17 (JDK)
- **Maven** 3.x
- Conta no **Supabase** (para o banco de dados)
- Conta no **Sentry** (para monitoramento)

---

### 1. Clone o Repositório

```bash
git clone https://github.com/Psds13/geds_website.git
cd geds_website
```

---

### 2. Frontend (Next.js)

```bash
cd frontend
npm install
```

Crie um arquivo `.env.local` na pasta `frontend/` com suas variáveis de ambiente:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anonima

# Sentry (opcional em dev)
SENTRY_AUTH_TOKEN=seu-token-sentry
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Acesse: [http://localhost:3000](http://localhost:3000)

---

### 3. Backend (Spring Boot)

```bash
cd backend
```

Configure o arquivo `src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://db.seu-projeto.supabase.co:5432/postgres
spring.datasource.username=postgres
spring.datasource.password=sua-senha-do-supabase
spring.jpa.hibernate.ddl-auto=validate
```

Execute a aplicação:

```bash
./mvnw spring-boot:run
# ou
mvn spring-boot:run
```

A API estará disponível em: [http://localhost:8080](http://localhost:8080)

---

### 4. Banco de Dados (Supabase)

1. Acesse o [dashboard do Supabase](https://supabase.com/dashboard).
2. Crie um novo projeto.
3. Acesse **SQL Editor** e execute o conteúdo de [`backend/geds.sql`](./backend/geds.sql) para criar todas as tabelas e inserir os dados iniciais.

---

## ♿ Acessibilidade

A GEDS Inovação Tech preza pela inclusão digital. O site conta com:

- **VLibras** — Widget oficial para tradução automática de conteúdo para Libras (Língua Brasileira de Sinais).
- **HTML Semântico** — Uso correto de `<header>`, `<main>`, `<nav>`, `<section>`, `<footer>`.
- **ARIA Labels** — Atributos de acessibilidade em elementos interativos.
- **Contraste WCAG** — Paleta de cores com contraste adequado para leitura.

---

## 📞 Contato

Para projetos, parcerias ou dúvidas técnicas:

- 📧 **Email:** contato@gedsinovacao.com
- 💬 **WhatsApp:** (98) 99999-9999
- 📍 **Localização:** São Luís – MA, Brasil
- 🐙 **GitHub:** [github.com/Psds13](https://github.com/Psds13)

---

© 2026 **GEDS Inovação Tech**. Todos os direitos reservados.
Desenvolvido com 💙 e Tecnologia em São Luís – MA, Brasil.
