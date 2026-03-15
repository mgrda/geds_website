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
ALTER TABLE public.contatos ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.servicos ENABLE ROW LEVEL SECURITY;

CREATE TABLE lab_projetos (
    id          SERIAL PRIMARY KEY,
    titulo      VARCHAR(150) NOT NULL,
    descricao   TEXT,

    -- Categoria da seção exibida na página
    -- Valores esperados: 'desenvolvimento', 'prototipos', 'inovacao'
    categoria   VARCHAR(50) NOT NULL DEFAULT 'inovacao',

    -- Status exibido no badge do card
    -- Valores esperados: 'Em progresso', 'Teste', 'MVP', 'Alfa', 'Conceito', 'Ideia'
    status      VARCHAR(30) NOT NULL DEFAULT 'Conceito',

    -- Visibilidade pública na página
    publicado   BOOLEAN DEFAULT TRUE,

    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO lab_projetos (titulo, categoria, status) VALUES
-- Seção: Projetos em desenvolvimento
('Sistema inteligente para pequenas empresas',  'desenvolvimento', 'Em progresso'),
('Plataforma de ideias de startups',            'desenvolvimento', 'Em progresso'),

-- Seção: Protótipos
('Site teste interativo',   'prototipos', 'Teste'),
('Aplicativo em fase inicial', 'prototipos', 'MVP'),
('Sistema experimental',    'prototipos', 'Alfa'),

-- Seção: Ideias de inovação
('Aplicativo para conectar estudantes',         'inovacao', 'Conceito'),
('Plataforma de colaboração tecnológica',       'inovacao', 'Ideia');


-- -------------------------------------------------------
-- 8. GREEN TECH (/green-tech)
-- Página de impacto sustentável da GEDS com métricas
-- exibidas em cards de dashboard (Papel, Automação, Cloud).
-- -------------------------------------------------------
CREATE TABLE metricas_green_tech (
    id          SERIAL PRIMARY KEY,

    -- Título do card exibido na página (ex: "Papel Economizado")
    titulo      VARCHAR(100) NOT NULL,

    -- Ícone Lucide associado ao card (ex: 'TreePine', 'Zap', 'Globe2')
    nome_icone  VARCHAR(50),

    -- Valor numérico da métrica (ex: 98 para "98%")
    valor_numerico DECIMAL(10,2),

    -- Unidade ou sufixo exibido (ex: '%', 'k docs', 'em alta')
    unidade     VARCHAR(30),

    -- Texto descritivo abaixo do valor
    descricao   VARCHAR(255),

    -- Ordenação dos cards na página
    ordem       INTEGER DEFAULT 0,

    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seeds: métricas iniciais da página Green Tech
INSERT INTO metricas_green_tech (titulo, nome_icone, valor_numerico, unidade, descricao, ordem) VALUES
('Papel Economizado',       'TreePine',  NULL,   'em alta', 'Documentos e fluxos migrados para o digital',               1),
('Processos Automatizados', 'Zap',       98.00,  '%',       'Aumento do grau de eficiência operacional',                 2),
('Soluções Digitais',       'Globe2',    100.00, '%',       'Focadas no uso inteligente de cloud computing',             3);


-- -------------------------------------------------------
-- 9. RECUPERAÇÃO DE SENHA (/esqueci-senha)
-- A página envia um código de 6 dígitos por e-mail.
-- Esta tabela armazena os tokens gerados para validação.
-- -------------------------------------------------------
CREATE TABLE tokens_recuperacao_senha (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    -- Email do usuário que solicitou a recuperação
    email       VARCHAR(100) NOT NULL,

    -- Código de 6 dígitos enviado por e-mail
    codigo      VARCHAR(6) NOT NULL,

    -- Flag para saber se já foi utilizado (evita reutilização)
    utilizado   BOOLEAN DEFAULT FALSE,

    -- Expiração: o token expira após 15 minutos (controlado pela aplicação)
    expira_em   TIMESTAMP NOT NULL DEFAULT (CURRENT_TIMESTAMP + INTERVAL '15 minutes'),

    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índice para acelerar a busca por email + código
CREATE INDEX idx_tokens_email ON tokens_recuperacao_senha (email, utilizado);


-- -------------------------------------------------------
-- 10. BENEFÍCIOS DOS SERVIÇOS (/sobre-servicos)
-- A página /sobre-servicos exibe para cada serviço uma
-- lista de benefícios (bullets com FiCheckCircle).
-- Em vez de um TEXT[], usa tabela separada para permitir
-- fácil atualização via painel admin no futuro.
-- -------------------------------------------------------
CREATE TABLE beneficios_servico (
    id          SERIAL PRIMARY KEY,

    -- Referência ao serviço pai
    servico_id  INTEGER REFERENCES servicos(id) ON DELETE CASCADE,

    -- Texto do benefício exibido no bullet
    descricao   VARCHAR(255) NOT NULL,

    -- Ordem de exibição dos bullets
    ordem       INTEGER DEFAULT 0
);

-- Também adicionar coluna "descricao_detalhada" na tabela servicos
-- para a descrição longa exibida em /sobre-servicos (diferente do resumo)
ALTER TABLE servicos ADD COLUMN IF NOT EXISTS descricao_detalhada TEXT;

-- Seeds: benefícios de cada serviço (baseados no frontend /sobre-servicos)
-- Desenvolvimento Sob Medida
INSERT INTO beneficios_servico (servico_id, descricao, ordem)
SELECT id, unnest(ARRAY[
    'Arquitetura escalável e resiliente',
    'Segurança by-design',
    'Integração total com sistemas legados',
    'Código auditável e de alta qualidade'
]), generate_series(1, 4)
FROM servicos WHERE titulo = 'Desenvolvimento Sob Medida';

-- Cloud & Infraestrutura
INSERT INTO beneficios_servico (servico_id, descricao, ordem)
SELECT id, unnest(ARRAY[
    'Redução de custos com servidores (FinOps)',
    'Alta disponibilidade e redundância',
    'Pipelines de CI/CD automatizados',
    'Monitoramento e observabilidade 24/7'
]), generate_series(1, 4)
FROM servicos WHERE titulo = 'Cloud & Infraestrutura';

-- Consultoria Estratégica
INSERT INTO beneficios_servico (servico_id, descricao, ordem)
SELECT id, unnest(ARRAY[
    'Diagnóstico tecnológico profundo',
    'Definição de stack e arquitetura',
    'Otimização de processos de desenvolvimento',
    'Mentoria técnica para times internos'
]), generate_series(1, 4)
FROM servicos WHERE titulo = 'Consultoria Estratégica';

-- Data & Analytics
INSERT INTO beneficios_servico (servico_id, descricao, ordem)
SELECT id, unnest(ARRAY[
    'Dashboards executivos (PowerBI, Metabase)',
    'Engenharia de dados e ETL',
    'Modelagem de dados para BI',
    'Insights preditivos para o negócio'
]), generate_series(1, 4)
FROM servicos WHERE titulo = 'Data & Analytics';

-- UX/UI Design
INSERT INTO beneficios_servico (servico_id, descricao, ordem)
SELECT id, unnest(ARRAY[
    'Pesquisa e testes com usuários',
    'Prototipagem de alta fidelidade',
    'Design Systems completos',
    'Foco em acessibilidade e conversão'
]), generate_series(1, 4)
FROM servicos WHERE titulo = 'UX/UI Design';

-- Atualizar descrições detalhadas dos serviços (texto longo do /sobre-servicos)
UPDATE servicos SET descricao_detalhada =
    'Criamos software corporativo de alta complexidade desenhado especificamente para as regras de negócio da sua empresa. Utilizamos arquiteturas robustas (Clean Architecture, Hexagonal) para garantir que o sistema cresça junto com sua operação, sem perder performance ou segurança.'
WHERE titulo = 'Desenvolvimento Sob Medida';

UPDATE servicos SET descricao_detalhada =
    'Modernize sua operação migrando para a nuvem. Projetamos e gerenciamos infraestruturas cloud-native (AWS, Azure, Google Cloud) que reduzem custos operacionais, aumentam a disponibilidade e eliminam dívidas técnicas de servidores on-premise.'
WHERE titulo = 'Cloud & Infraestrutura';

UPDATE servicos SET descricao_detalhada =
    'Mais do que código, oferecemos visão de inteligência. Nossos especialistas atuam como parceiros estratégicos para transformar desafios de negócio em roadmaps técnicos viáveis, guiando sua empresa desde a validação de MVPs até a escala global.'
WHERE titulo = 'Consultoria Estratégica';

UPDATE servicos SET descricao_detalhada =
    'Transforme dados brutos em vantagem competitiva. Construímos pipelines de dados e dashboards inteligentes que permitem aos gestores tomar decisões baseadas em fatos e métricas reais, com visualizações intuitivas e relatórios em tempo real.'
WHERE titulo = 'Data & Analytics';

UPDATE servicos SET descricao_detalhada =
    'Interfaces que encantam e convertem. Nosso time de design cria experiências digitais centradas no usuário, aliando estética sofisticada (Cyber-Neo) com usabilidade funcional para maximizar a retenção e o engajamento.'
WHERE titulo = 'UX/UI Design';

ALTER TABLE "public"."tokens_recuperacao_senha" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.metricas_green_tech ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."lab_projetos" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.beneficios_servico ENABLE ROW LEVEL SECURITY;