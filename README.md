# 📱 WorkingFood - Documentação do Projeto

## 📋 Índice
1. [Visão Geral](#visão-geral)
2. [Arquitetura](#arquitetura)
3. [Tecnologias](#tecnologias)
4. [Estrutura do Projeto](#estrutura-do-projeto)
5. [Módulos e Funcionalidades](#módulos-e-funcionalidades)
6. [Banco de Dados](#banco-de-dados)
7. [API Endpoints](#api-endpoints)
8. [Configuração e Instalação](#configuração-e-instalação)
9. [Fluxo de Uso](#fluxo-de-uso)

---

## 🎯 Visão Geral

**WorkingFood** é uma plataforma de delivery de alimentos similar ao iFood, conectando restaurantes e clientes através de uma interface web moderna e intuitiva.

### Principais Funcionalidades
- 👤 Cadastro e autenticação de clientes
- 🏪 Cadastro e gerenciamento de restaurantes
- 🍕 Catálogo de produtos (cardápio)
- 🛒 Carrinho de compras
- 📦 Sistema de pedidos
- 📍 Gerenciamento de endereços
- 🏷️ Categorização de produtos

---

## 🏗️ Arquitetura

O projeto segue uma arquitetura **cliente-servidor** com separação clara entre frontend e backend:

```
┌─────────────────────┐
│   working-food-web  │  ← Frontend (Nuxt 4)
│     (Port 3000)     │
└──────────┬──────────┘
           │
           │ HTTP/REST API
           │
┌──────────▼──────────┐
│  working-food-api   │  ← Backend (NestJS)
│     (Port 3001)     │
└──────────┬──────────┘
           │
           │ Prisma ORM
           │
┌──────────▼──────────┐
│    PostgreSQL       │  ← Banco de Dados
│   (workingfood)     │
└─────────────────────┘
```

---

## 🛠️ Tecnologias

### Backend (working-food-api)
- **Framework:** NestJS (TypeScript)
- **ORM:** Prisma
- **Banco de Dados:** PostgreSQL
- **Arquitetura:** Modular (Modules, Controllers, Services, Repositories)

### Frontend (working-food-web)
- **Framework:** Nuxt 4 (Vue 3)
- **Build Tool:** Vite
- **Ícones:** Nuxt Icon (mdi-light)
- **Roteamento:** Vue Router (file-based)

---

## 📁 Estrutura do Projeto

### Backend (`working-food-api/src/`)

```
src/
├── core/                          # Funcionalidades essenciais
│   ├── annotation/                # Sistema de anotações
│   ├── constants/                 # Constantes da aplicação
│   └── helpers/                   # Funções auxiliares
│
├── database/                      # Camada de dados
│   └── prisma/                    # Configuração Prisma
│       ├── schema.prisma          # Schema do banco
│       └── migrations/            # Migrações
│
├── order/                         # Módulo de Pedidos
│   ├── address/                   # Endereços de entrega
│   ├── cart/                      # Carrinho de compras
│   ├── category/                  # Categorias de produtos
│   ├── models/                    # Models do domínio
│   ├── product/                   # Produtos/Cardápio
│   ├── order.controller.ts        # Controller de pedidos
│   ├── order.module.ts            # Módulo de pedidos
│   ├── order.repository.ts        # Repositório de dados
│   └── order.service.ts           # Lógica de negócio
│
├── users/                         # Módulo de Usuários
│   ├── auth/                      # Autenticação
│   ├── costumer/                  # Clientes
│   ├── models/                    # Models de usuário
│   ├── restaurant/                # Restaurantes
│   ├── users.controller.ts        # Controller de usuários
│   ├── users.module.ts            # Módulo de usuários
│   ├── users.repository.ts        # Repositório de usuários
│   └── users.service.ts           # Lógica de usuários
│
├── app.controller.ts              # Controller principal
├── app.module.ts                  # Módulo raiz
├── app.service.ts                 # Service principal
└── main.ts                        # Entry point
```

### Frontend (`working-food-web/`)

```
working-food-web/
├── pages/                         # Páginas (rotas automáticas)
│   ├── costumer/                  # Área do cliente
│   │   ├── index.vue              # /costumer
│   │   └── register/              
│   │       ├── index.vue          # /costumer/register
│   │       └── company.vue        # /costumer/register/company
│   │
│   ├── restaurant/                # Área do restaurante
│   │   └── index.vue              # /restaurant
│   │
│   ├── product/                   # Produtos/Cardápio
│   │   ├── index.vue              # /product (listagem)
│   │   ├── [id].vue               # /product/:id (detalhes)
│   │   ├── add.vue                # /product/add
│   │   └── edit.vue               # /product/edit
│   │
│   ├── index.vue                  # / (home)
│   ├── menu.vue                   # /menu
│   ├── login.vue                  # /login
│   ├── contact.vue                # /contact
│   ├── order.vue                  # /order
│   └── app.vue                    # Layout principal
│
├── components/                    # Componentes reutilizáveis
├── composables/                   # Composables Vue
├── layouts/                       # Layouts da aplicação
├── public/                        # Arquivos estáticos
├── .env                          # Variáveis de ambiente
└── nuxt.config.ts                # Configuração Nuxt
```

---

## 🎨 Módulos e Funcionalidades

### 1. **Módulo de Usuários** (`users/`)

#### Autenticação (`auth/`)
- Login de clientes e restaurantes
- Registro de novos usuários
- Gerenciamento de sessões
- Tokens de autenticação

#### Clientes (`costumer/`)
- Cadastro de clientes (pessoa física e jurídica)
- Perfil do cliente
- Histórico de pedidos
- Endereços salvos

#### Restaurantes (`restaurant/`)
- Cadastro de restaurantes
- Gerenciamento do cardápio
- Controle de pedidos recebidos
- Configurações do estabelecimento

### 2. **Módulo de Pedidos** (`order/`)

#### Produtos (`product/`)
- CRUD de produtos/pratos
- Preços e descrições
- Disponibilidade

#### Categorias (`category/`)
- Organização do cardápio
- Filtros de produtos
- Categorias personalizadas por restaurante

#### Carrinho (`cart/`)
- Adição/remoção de produtos
- Cálculo de totais
- Validação de disponibilidade
- Persistência temporária

#### Endereços (`address/`)
- Cadastro de múltiplos endereços
- Validação de área de entrega
- Seleção de endereço no pedido

#### Pedidos (`order/`)
- Criação de pedidos
- Acompanhamento de status
- Histórico de pedidos
- Notificações

---

## 🗄️ Banco de Dados

### Configuração Prisma

**Localização:** `working-food-api/prisma/schema.prisma`

## ⚙️ Configuração e Instalação

### Pré-requisitos
- Node.js 18+ 
- PostgreSQL 14+
- npm

- #### Back-End
- git clone https://github.com/RannyG/WorkingFood
- apague a pasta gitignore
- Agora dentro da pasta API inserimos no terminal o comando (npm i)
- incluia um arquivo no diretorio raiz do projeto chamado (.env)

  
  DATABASE_URL=postgresql://postgres:postgres@localhost:5432/workingfooddb
JWT_SECRET=cf83e1357eefb8bdf1542850d66d8007d620e4050b5715dc83f4a921d36ce9ce47d0d13c5d85f2b0ff8318d2877eec2f63b931bd47417a81a538327af927da3e
PORT=3001
VIA_CEP_API_URL=https://viacep.com.br/ws/{{CEP}}/json/


- depois npm run start:dev

- #### Front-End
- como foi dado o git clone anteriormente não há necessidade de executa-lo novamente
- apague a pasta gitignore
- dentro do diretorio raiz crie o arquivo (.env) e dentro dele adicione:

API_URI=http://localhost:3001
NUXT_SESSION_PASSWORD=16e61fab35db42bc874256341d6162c9

-Agora no terminal adicione o comando "npm run dev"






