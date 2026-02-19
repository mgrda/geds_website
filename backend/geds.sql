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
    habilidades TEXT[], -- Array de strings para as habilidades
    
    -- Campos extras para UserProfile
    experiencia_anos INTEGER DEFAULT 0,
    total_clientes INTEGER DEFAULT 0,
    url_linkedin VARCHAR(255),
    url_github VARCHAR(255),
    url_twitter VARCHAR(255),

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
    parcelas INTEGER DEFAULT 1,
    cartao_final VARCHAR(4), -- Últimos 4 dígitos se for cartão
    url_recibo VARCHAR(255), -- Link para o PDF/Recibo
    data_pagamento TIMESTAMP,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. PROJETOS (portfolios, dashboard, app-geds)
CREATE TABLE projetos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    proprietario_id UUID REFERENCES usuarios(id) ON DELETE CASCADE, 
    titulo VARCHAR(100) NOT NULL,
    descricao TEXT,
    status VARCHAR(50) DEFAULT 'Em progresso', -- 'Em progresso', 'Concluído'
    progresso INTEGER DEFAULT 0, -- 0 a 100
    tecnologias TEXT[], -- Tecnologias usadas no projeto
    url_repositorio VARCHAR(255), -- Link do GitHub
    url_deploy VARCHAR(255),      -- Link do site no ar
    url_imagem VARCHAR(255),      -- Screenshot do projeto
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. SERVIÇOS (servicos, sobre-servicos)
CREATE TABLE servicos (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    descricao TEXT,
    nome_icone VARCHAR(50), -- Nome do ícone (Lucide ou React Icons)
    url_imagem VARCHAR(255),
    url_link VARCHAR(255),  -- Link para página/seção do serviço
    categoria VARCHAR(50)   -- 'Desenvolvimento', 'Cloud', 'Design', etc
);

-- 6. CONTATOS E LEADS (contatos)
CREATE TABLE contatos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    assunto VARCHAR(150),
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
('Advanced', 99.99, 949.99, 'Para profissionais que exigem alto desempenho.', ARRAY['Modelos de última geração', '10.000 interações/mês', 'Integrações API']),
('Empresarial', 0.00, 0.00, 'Soluções personalizadas sob consulta.', ARRAY['Suporte dedicado 24/7', 'Consultoria personalizada', 'SLA garantido']);

-- Serviços
INSERT INTO servicos (titulo, descricao, nome_icone, url_imagem, url_link, categoria) VALUES 
('Desenvolvimento Sob Medida', 'Sistemas corporativos de alta complexidade. Foco em performance, segurança e escalabilidade real.', 'Code2', 'https://images.pexels.com/photos/374074/pexels-photo-374074.jpeg', '/sobre-servicos#desenvolvimento-sob-medida', 'Desenvolvimento'),
('Cloud & Infraestrutura', 'Arquiteturas modernas e migração para nuvem. Redução de custos e eliminação de dívida técnica.', 'Cloud', 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg', '/sobre-servicos#cloud-infraestrutura', 'Infraestrutura'),
('Consultoria Estratégica', 'Transformamos desafios de negócio em roadmaps técnicos viáveis. Do MVP ao produto final.', 'LineChart', 'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg', '/sobre-servicos#consultoria-estrategica', 'Consultoria'),
('Data & Analytics', 'Dashboards inteligentes e integração de dados para decisões baseadas em fatos, não em intuição.', 'Search', 'https://images.pexels.com/photos/3810787/pexels-photo-3810787.jpeg', '/sobre-servicos#data-analytics', 'Data Science'),
('UX/UI Design', 'Interfaces que convertem. Foco total na experiência do usuário e na identidade da sua marca.', 'Layout', 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg', '/sobre-servicos#ux-ui-design', 'Design');

-- Exemplo de Usuário (Baseado no Perfil e Portfólio)
-- Definindo o primeiro usuário como Administrador
INSERT INTO usuarios (nome, email, senha, cargo, biografia, url_avatar, habilidades, experiencia_anos, total_clientes, url_github, url_linkedin) VALUES
('Edmilson Oliveira', 'edmilson@gedsinovacao.com', '$2b$10$K7...hash', 'Administrador', 'Especialista em interfaces digitais de alta performance. Atua na construção de sistemas escaláveis utilizando o ecossistema React e Next.js.', '/eusinho.jpg', ARRAY['React', 'Next.js', 'PostgreSQL', 'TypeScript'], 5, 15, 'https://github.com/Psds13', 'https://linkedin.com/in/edmilson');

-- Exemplo de Projetos vinculados
INSERT INTO projetos (proprietario_id, titulo, descricao, tecnologias, url_repositorio, status, progresso)
SELECT id, 'Gerenciador de Tarefas', 'Sistema de gestão de tarefas com arquitetura robusta.', ARRAY['PHP', 'PostgreSQL'], 'https://github.com/Psds13/Gerenciador-de-Tarefas', 'Concluído', 100
FROM usuarios WHERE email = 'edmilson@gedsinovacao.com';

INSERT INTO projetos (proprietario_id, titulo, descricao, tecnologias, url_repositorio, status, progresso)
SELECT id, 'GEDS Website', 'Portal institucional e plataforma de serviços.', ARRAY['Next.js', 'Tailwind', 'PostgreSQL'], 'https://github.com/Psds13/geds_website', 'Em progresso', 75
FROM usuarios WHERE email = 'edmilson@gedsinovacao.com';

-- Exemplo de Pagamentos
INSERT INTO pagamentos (usuario_id, plano_id, valor, metodo_pagamento, status, parcelas, data_pagamento)
SELECT u.id, p.id, 49.99, 'pix', 'concluido', 1, CURRENT_TIMESTAMP
FROM usuarios u, planos p WHERE u.email = 'edmilson@gedsinovacao.com' AND p.nome = 'Premium' LIMIT 1;

-- Exemplo de Contatos (Leads)
INSERT INTO contatos (nome, email, assunto, mensagem, status) VALUES 
('João Silva', 'joao.silva@empresa.com', 'Orçamento de Software', 'Gostaria de um orçamento para um sistema de gestão de estoque.', 'nao_lido'),
('Maria Souza', 'maria.souza@startup.io', 'Consultoria Cloud', 'Temos interesse em migrar nossa infraestrutura para AWS.', 'lido');
