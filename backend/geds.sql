-- Database Schema Completo para GEDS (PostgreSQL)
-- Baseado em toda a estrutura de pastas do Frontend
-- Com nomes de tabelas e colunas em Português

-- Habilitar UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. USUÁRIOS E PERFIL (cadastro, login, userProfile)
CREATE TABLE usuarios (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    cargo VARCHAR(100) DEFAULT 'Usuário',
    biografia TEXT,
    url_avatar VARCHAR(255),
    habilidades TEXT[], -- Array de strings para as habilidades mostradas no perfil
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. PLANOS DE ASSINATURA (plans)
CREATE TABLE planos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    preco_mensal DECIMAL(10,2) NOT NULL,
    preco_anual DECIMAL(10,2) NOT NULL,
    descricao TEXT,
    beneficios TEXT[] -- Lista de benefícios de cada plano
);

-- 3. PAGAMENTOS E TRANSAÇÕES (pagamento)
CREATE TABLE pagamentos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    usuario_id UUID REFERENCES usuarios(id) ON DELETE CASCADE,
    plano_id INTEGER REFERENCES planos(id),
    valor DECIMAL(10,2) NOT NULL,
    metodo_pagamento VARCHAR(20) NOT NULL, -- 'pix', 'boleto', 'cartao'
    status VARCHAR(20) DEFAULT 'pendente', -- 'pendente', 'concluido', 'falhado'
    codigo_voucher VARCHAR(20),
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. PROJETOS (portfolios, dashboard, app-geds)
CREATE TABLE projetos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    proprietario_id UUID REFERENCES usuarios(id) ON DELETE CASCADE, -- Dono do projeto ou Colaborador vinculado
    titulo VARCHAR(100) NOT NULL,
    descricao TEXT,
    status VARCHAR(50) DEFAULT 'Em progresso', -- 'Em progresso', 'Concluído'
    progresso INTEGER DEFAULT 0, -- 0 a 100
    tecnologias TEXT[], -- Tecnologias usadas no projeto
    url_link VARCHAR(255), -- Link do projeto ou GitHub
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. SERVIÇOS (servicos, sobre-servicos)
CREATE TABLE servicos (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    descricao TEXT,
    nome_icone VARCHAR(50), -- Nome do ícone do Lucide/Fi
    url_imagem VARCHAR(255),
    categoria VARCHAR(50) -- 'Desenvolvimento', 'Cloud', 'Design', etc
);

-- 6. CONTATOS E LEADS (contatos)
CREATE TABLE contatos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    mensagem TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'nao_lido', -- 'nao_lido', 'lido', 'respondido'
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ---------------------------------------------------------
-- INSERTS DE DADOS INICIAIS (Baseado no Frontend atual)
-- ---------------------------------------------------------

-- Planos
INSERT INTO planos (nome, preco_mensal, preco_anual, descricao, beneficios) VALUES 
('Gratuito', 0.00, 0.00, 'Ideal para experimentar os recursos básicos.', ARRAY['Acesso ao chat básico', '50 interações/mês']),
('Premium', 49.99, 499.99, 'Para usuários regulares e pequenas equipes.', ARRAY['Acesso completo', '2.000 interações/mês', 'Suporte prioritário']),
('Advanced', 99.99, 949.99, 'Para profissionais que exigem alto desempenho.', ARRAY['Modelos de última geração', '10.000 interações/mês', 'Integrações API']);

-- Serviços
INSERT INTO servicos (titulo, descricao, nome_icone, url_imagem, categoria) VALUES 
('Desenvolvimento Sob Medida', 'Sistemas corporativos de alta complexidade.', 'Code2', 'https://images.pexels.com/photos/374074/pexels-photo-374074.jpeg', 'Desenvolvimento'),
('Cloud & Infraestrutura', 'Arquiteturas modernas e migração para nuvem.', 'Cloud', 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg', 'Infraestrutura'),
('UX/UI Design', 'Interfaces que convertem.', 'Layout', 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg', 'Design');
