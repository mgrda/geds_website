# 🚀 GEDS Inovação Tech - Plataforma Institucional

![GEDS Inovação](https://img.shields.io/badge/GEDS-Inovação_Tech-00DBFF?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-15.0-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-Cyber_Neo-38B2AC?style=for-the-badge&logo=tailwind-css)

> **"Engenharia de Software & Soluções Digitais"**

Esta é a plataforma institucional oficial da **GEDS Inovação Tech**, uma boutique de software focada em alta performance, arquitetura robusta e design premium. O projeto reflete a identidade "Cyber-Neo" da marca, utilizando tecnologias de ponta para criar uma experiência imersiva e profissional.

---

## 📋 Índice

- [Visão Geral](#-visão-geral)
- [Identidade Visual](#-identidade-visual)
- [Funcionalidades e Páginas](#-funcionalidades-e-páginas)
- [Stack Tecnológica](#-stack-tecnológica)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Instalação e Execução](#-instalação-e-execução)
- [Acessibilidade](#-acessibilidade)
- [Contato](#-contato)

---

## 🎯 Visão Geral

O site foi projetado não apenas como um cartão de visitas, mas como uma demonstração técnica da capacidade de entrega da GEDS. Ele combina animações fluidas, transições de página, carregamento otimizado e uma arquitetura focada em componentes reutilizáveis.

**Pilares do Projeto:**
1.  **Excelência Técnica:** Código limpo, componentização e tipagem rigorosa.
2.  **Maturidade Institucional:** Textos focados em processos, prazos e qualidade.
3.  **Experiência do Usuário (UX):** Navegação fluida, acessibilidade e feedback visual.

---

## 🎨 Identidade Visual (Cyber-Neo)

O design system adotado segue a estética **Cyber-Neo**, caracterizada por:

-   **Base:** Fundo Preto (`bg-black`) para profundidade e contraste.
-   **Destaque:** Ciano Neon (`#00DBFF` / `text-cyan`) como cor primária.
-   **Elementos:**
    -   *Glassmorphism* (efeito de vidro fosco).
    -   Glows e gradientes sutis.
    -   Bordas finas e detalhes minimalistas.
    -   Animações de entrada (`Framer Motion`) e efeitos de *Reveal*.

---

## ✨ Funcionalidades e Páginas

O projeto conta com uma estrutura de páginas completa para atender às necessidades institucionais:

### 1. **Home (`/`)**
   -   **Hero Section:** Introdução impactante com animações.
   -   **Serviços:** Carrossel interativo (`Swiper`) dos principais serviços.
   -   **Sobre Nós:** Texto institucional atualizado focando em qualidade e parcerias.
   -   **Estatísticas:** Números da empresa com animações de contagem.

### 2. **Como Trabalhamos (`/processo`)**
   -   Detalhamento da metodologia de trabalho (Entendimento, Prototipação, Desenvolvimento, Entrega).
   -   Foco em **transparência** e **cumprimento de prazos**.

### 3. **Portfólio (`/portfolios`)**
   -   Vitrine técnica dos colaboradores ("Excelência Técnica").
   -   Cards detalhados com biografia profissional, stack tecnológica e links para projetos reais (GitHub).

### 4. **Planos e Preços (`/plans`)** (Seção na Home)
   -   Tabela de preços clara e objetiva para serviços padronizados.

### 5. **Contato (`/contatos`)**
   -   Formulário premium integrado com validação (`React Hook Form`).
   -   Links diretos para WhatsApp, E-mail e Redes Sociais.
   -   Mapa e localização.

### 6. **Institucional Legal**
   -   **Política de Privacidade (`/politica-de-privacidade`)**: Conformidade com proteção de dados.
   -   **Termos de Uso (`/termos-de-uso`)**: Regras de utilização da plataforma.

### 7. **Área do Cliente (Em desenvolvimento)**
   -   Login (`/login`) e Cadastro (`/cadastro`) com design system unificado.
   -   Perfil do Usuário (`/userProfile`) e Dashboard.

---

## 🛠 Stack Tecnológica

O projeto utiliza o que há de mais moderno no ecossistema React:

### Core
-   **Next.js 15**: App Router, Server Components e Otimização de Imagens.
-   **React 18**: Biblioteca de UI.
-   **TypeScript**: Segurança de tipos e escalabilidade.

### Estilização e UI
-   **Tailwind CSS**: Estilização utilitária e responsiva.
-   **Framer Motion**: Animações complexas (entradas, hovers, scroll reveals).
-   **React Icons**: Biblioteca de ícones vetoriais.
-   **Swiper**: Sliders de toque para mobile e desktop.

### Formulários e Lógica
-   **React Hook Form**: Gerenciamento de estado de formulários.
-   **Zod** (Recomendado/Em implementação): Validação de schemas.

### Acessibilidade
-   **VLibras**: Widget de tradução automática para Libras.
-   Tags semânticas e `aria-labels`.

---

## 📂 Estrutura do Projeto

```bash
src/
├── app/                    # App Router
│   ├── components/         # Componentes Reutilizáveis (Header, Footer, About, etc.)
│   ├── contatos/           # Página de Contato
│   ├── portfolios/         # Página de Portfólio
│   ├── processo/           # Página de Metodologia
│   ├── politica-de-privacidade/
│   ├── termos-de-uso/
│   ├── layout.tsx          # Layout Principal (Root)
│   └── page.tsx            # Home Page
├── public/                 # Assets Estáticos (Imagens, Ícones)
└── ...config files         # Tailwind, Next, TSConfig
```

---

## 🚀 Instalação e Execução

Para rodar o projeto localmente:

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/SeuUsuario/geds_website.git
    cd geds_website
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    # ou
    yarn install
    ```

3.  **Rode o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

4.  Acesse `http://localhost:3000` no seu navegador.

---

## ♿ Acessibilidade

A GEDS Inovação Tech preza pela inclusão. O site conta com o componente **VLibras** para garantir que o conteúdo seja acessível a pessoas surdas ou com deficiência auditiva, além de seguir boas práticas de HTML semântico.

---

## 📞 Contato

Para projetos, parcerias ou dúvidas técnica:

-   **Email:** contato@gedsinovacao.com
-   **WhatsApp:** (98) 99999-9999
-   **Localização:** São Luís - MA, Brasil

---

© 2026 **GEDS Inovação Tech**. Todos os direitos reservados.
Desenvolvido com 💙 e Tecnologia.
