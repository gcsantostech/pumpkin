CREATE DATABASE pumpkin;
USE pumpkin;

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    username VARCHAR(15) UNIQUE NOT NULL,
    passwd VARCHAR(100) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE quiz (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(50) NOT NULL,
    quiz_description VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE question (
    id INT PRIMARY KEY AUTO_INCREMENT,
	question_text VARCHAR(255) NOT NULL,
    quiz_id INT NOT NULL,
    CONSTRAINT ct_fk_quiz_question
        FOREIGN KEY (quiz_id)
            REFERENCES quiz (id)
);

CREATE TABLE creative_profile (
    id INT PRIMARY KEY AUTO_INCREMENT,
    profile_name VARCHAR(50) NOT NULL,
    description VARCHAR(255) NOT NULL
);

CREATE TABLE answer_option (
    id INT PRIMARY KEY AUTO_INCREMENT,
    option_text VARCHAR(255) NOT NULL,
    score INT NOT NULL,
    question_id INT NOT NULL,
    profile_id INT NOT NULL,
    CONSTRAINT ct_fk_question_answer_option
        FOREIGN KEY (question_id)
            REFERENCES question (id),
	CONSTRAINT ct_fk_profile_asnwer_option
		FOREIGN KEY (profile_id)
			REFERENCES creative_profile (id)
);

CREATE TABLE quiz_attempt (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    quiz_id INT NOT NULL,
    completed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT ct_fk_quiz_attempt_user
        FOREIGN KEY (user_id)
            REFERENCES users (id),
    CONSTRAINT ct_fk_quiz_attempt_quiz
        FOREIGN KEY (quiz_id)
            REFERENCES quiz (id)
);

CREATE TABLE user_answer (
    attempt_id INT NOT NULL,
    question_id INT NOT NULL,
    option_id INT NOT NULL,
    PRIMARY KEY (attempt_id, question_id),
	FOREIGN KEY (attempt_id)
		REFERENCES quiz_attempt (id),
    FOREIGN KEY (question_id)
		REFERENCES question (id),
	FOREIGN KEY (option_id)
		REFERENCES answer_option (id)
);

DROP TABLE IF EXISTS posts;
CREATE TABLE posts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(150) NOT NULL,
  sumary VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  image VARCHAR(255) NOT NULL,
  url VARCHAR(255) NOT NULL,
  published_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO posts (title, sumary, content, image, url) VALUES
('Figma abre escritório em São Paulo',
 'A empresa formalizou sua operação na América Latina em um dos seus cinco maiores mercados. Já o Canva expandiu seu kit de criação visual com mais de 100 novidades em 2026.',
 'O Figma abriu seu primeiro escritório na América Latina em São Paulo, formalizando a operação em um dos seus cinco maiores mercados.\n\nJá o Canva expandiu seu kit de criação visual com mais de 100 novidades em 2026.',
 'https://forbes.com.br/wp-content/uploads/2026/07/Novo-Tamanho-Site-2026-07-21T165526.537-860x484.jpg',
 'https://forbes.com.br/forbes-money/2026/07/figma-escritorio-sao-paulo-brasil/'),

('Marcas e embalagens em destaque',
 'A nova identidade da Maker''s Mark, com selo em cera vermelha, e as discussões sobre a nova marca da CNN Brasil chamaram atenção no setor.',
 'No setor de marcas e embalagens, chamou atenção a nova identidade visual da Maker''s Mark, com selo em cera vermelha criado pela Turner Duckworth.\n\nTambém se destacaram embalagens de aperitivo sem álcool feitas com elementos naturais e vidro em relevo, além das discussões sobre a nova marca da CNN Brasil.',
 'https://clubedecriacao.com.br/wp-content/uploads/2026/11/Captura-de-tela-2026-11-17-175919-1024x580.png',
 'https://clubedecriacao.com.br/ultimas/made-by-hand-inspired-by-land/'),

('Claude DATA chega para dashboards',
 'O novo recurso da Anthropic amplia a prototipagem e a automação de processos visuais, além de acelerar entregas com regras reutilizáveis e tokens de marca.',
 'A Anthropic lançou o Claude DATA, recurso voltado à criação de dashboards e visualização de dados que amplia a prototipagem e a automação de processos visuais.\n\nAnálises de novembro destacam a compressão de fluxos de trabalho, permitindo entregas mais rápidas com regras reutilizáveis e tokens de marca, e o clima de debate sobre o futuro da profissão após o Adobe MAX 2026.',
 'https://animaapp.com/blog/wp-content/uploads/2026/11/claude-whiteboards-sheets-data-cover-1024x636.jpg',
 'https://animaapp.com/blog/pt/agentic-pt/claude-whiteboards-folhas-e-dados-o-que-foi-enviado-planos-limites-e-compartilhamento/');
 
 
INSERT INTO quiz (id, title, quiz_description)
VALUES (
    1,
    'Descubra seu perfil criativo',
    'Responda 8 Questions sobre tipografia, cores, layout e processo criativo e descubra que tipo de designer vive em você.'
);


INSERT INTO creative_profile (id, profile_name, description) VALUES
(1, 'Ousado', 'Você prioriza impacto e experimentação. Quebra regras de grid, brinca com escala e contraste e 
	prefere ser lembrado a ser seguro. Seus projetos chamam atenção à primeira vista.'),
(2, 'Clássico', 'Você valoriza tradição e refinamento. Confia em proporção, hierarquia e tipografia bem trabalhada, 
	e cria design atemporal, que continua elegante com o passar dos anos.'),
(3, 'Minimalista', 'Você busca simplicidade e funcionalidade. Cada elemento precisa ter motivo para existir, e o espaço 
	em branco é um aliado. Seus projetos são limpos, claros e fáceis de entender.'),
(4, 'Expressivo', 'Você gosta de cor e emoção no design. Aposta em ilustração, textura e traço humano para contar histórias 
	e provocar sentimentos. Seus projetos têm alma e personalidade.');
    

INSERT INTO question (id, quiz_id, question_text)
VALUES
    (1, 1, 'Você vai criar a identidade visual de uma marca nova. Por onde você começa?'),
    (2, 1, 'Qual estilo de tipografia mais combina com você?'),
    (3, 1, 'Qual dessas paletas de cores você escolheria para um projeto pessoal?'),
    (4, 1, 'Como é a composição do seu layout ideal?'),
    (5, 1, 'Qual desses projetos você mais gostaria de pegar?'),
    (6, 1, 'Qual comentário de um cliente soaria como o maior elogio para você?'),
    (7, 1, 'Qual parte do processo criativo você mais curte?'),
    (8, 1, 'Qual frase está mais próxima da sua filosofia de design?');
    

INSERT INTO answer_option (id, question_id, option_text, profile_id, score)
VALUES
    -- Question 1
    (1,  1, 'Reduzindo tudo ao essencial: um símbolo simples que funcione em qualquer tamanho.', 3, 1),
    (2,  1, 'Com um conceito inusitado que ninguém espera, mesmo que seja arriscado.', 1, 1),
    (3,  1, 'Montando um moodboard cheio de emoção, textura e cores que contem uma história.', 4, 1),
    (4,  1, 'Pesquisando referências consagradas e definindo proporções equilibradas.', 2, 1),

    -- Question 2
    (5,  2, 'Serifada elegante, como Garamond ou Baskerville.', 2, 1),
    (6,  2, 'Manuscrita ou lettering feito à mão, cheio de personalidade.', 4, 1),
    (7,  2, 'Display gigante, distorcida ou totalmente experimental.', 1, 1),
    (8,  2, 'Sem serifa e limpa, como Helvetica ou Inter.', 3, 1),

    -- QUestion 3
    (9,  3, 'Cores quentes e vibrantes, em gradientes e combinações inesperadas.', 4, 1),
    (10, 3, 'Preto, branco e, no máximo, uma cor de destaque.', 3, 1),
    (11, 3, 'Tons sóbrios e atemporais, como azul-marinho, bordô e dourado.', 2, 1),
    (12, 3, 'Neons e contrastes fortes que gritam na tela.', 1, 1),

    -- Question 4
    (13, 4, 'Elementos sobrepostos, grid quebrado e escala exagerada.', 1, 1),
    (14, 4, 'Grid rigoroso, simetria e hierarquia bem definida.', 2, 1),
    (15, 4, 'Ilustrações, colagens e formas orgânicas ocupando a página.', 4, 1),
    (16, 4, 'Muito espaço em branco e pouquíssimos elementos.', 3, 1),

    -- Question 5
    (17, 5, 'A interface de um aplicativo de produtividade.', 3, 1),
    (18, 5, 'A capa de um álbum ou de um livro ilustrado.', 4, 1),
    (19, 5, 'O cartaz de um festival de música eletrônica.', 1, 1),
    (20, 5, 'O rótulo de um vinho ou perfume de luxo.', 2, 1),

    -- Question 6
    (21, 6, 'Ficou muito elegante!', 2, 1),
    (22, 6, 'Ficou muito ousado!', 1, 1),
    (23, 6, 'Ficou muito limpo!', 3, 1),
    (24, 6, 'Ficou muito cheio de vida!', 4, 1),

    -- Question 7
    (25, 7, 'Desenhar à mão, usar tablet, pincéis digitais e texturas.', 4, 1),
    (26, 7, 'Ajustar kerning, alinhamentos e grids com todo o cuidado.', 2, 1),
    (27, 7, 'Construir vetores simples com poucas formas e linhas.', 3, 1),
    (28, 7, 'Testar efeitos, glitch e experimentos até algo surpreendente surgir.', 1, 1),

    -- Question 8
    (29, 8, 'Regras existem para serem quebradas.', 1, 1),
    (30, 8, 'Menos é mais.', 3, 1),
    (31, 8, 'O que é bem feito nunca sai de moda.', 2, 1),
    (32, 8, 'Um bom design é aquele que faz a pessoa sentir algo.', 4, 1);

INSERT INTO users (full_name, email, username, passwd) VALUES 
('Gabriel Cavalcante', 'gcsantos@sptech.school', 'gcsantos', SHA2('Admin@123', 256));

SELECT
      qz.id AS quiz_id,
      qz.title,
      qz.quiz_description,
      qt.id AS question_id,
      qt.question_text,
      ao.id AS option_id,
      ao.option_text
    FROM quiz qz JOIN question qt
      ON qz.id = qt.quiz_id
    JOIN answer_option ao
        ON ao.question_id = qt.id;

-- Result quiz attempt
SELECT
	cp.id,
	cp.profile_name AS profile_name,
    cp.description AS description,
	SUM(ao.score) as total_score
FROM quiz_attempt qa JOIN user_answer ua
	ON qa.id = ua.attempt_id
JOIN answer_option ao 
	ON ao.id = ua.option_id
JOIN  creative_profile cp
	ON cp.id = ao.profile_id
WHERE qa.id = 2 AND qa.user_id = 2
GROUP BY cp.id, user_id, profile_name, description
ORDER BY total_score DESC, cp.id ASC
LIMIT 2; 

-- KPI Dashboard
SELECT
	cp.id AS profile_id,
	cp.profile_name AS profile_name,
    cp.description AS description,
    SUM(ao.score) as score,
	COUNT(DISTINCT ua.attempt_id) AS qtd_attempt
FROM quiz_attempt qa JOIN user_answer ua
	ON qa.id = ua.attempt_id
JOIN answer_option ao 
	ON ao.id = ua.option_id
JOIN  creative_profile cp
	ON cp.id = ao.profile_id
WHERE qa.user_id = 2
GROUP BY profile_id, profile_name, description
ORDER BY score DESC;

-- Chart Radar
SELECT
	cp.profile_name AS profile_name,
    SUM(ao.score) AS score_total,
    COUNT(DISTINCT ua.attempt_id) AS max_score
FROM quiz_attempt qa JOIN user_answer ua
	ON qa.id = ua.attempt_id
JOIN answer_option ao 
	ON ao.id = ua.option_id
JOIN  creative_profile cp
	ON cp.id = ao.profile_id
WHERE qa.user_id = 1
GROUP BY profile_name
ORDER BY score_total DESC; 


-- Chart Dougnut
SELECT
	cp.profile_name AS profile_name,
    SUM(ao.score) AS score_total
FROM quiz_attempt qa JOIN user_answer ua
	ON qa.id = ua.attempt_id
JOIN answer_option ao 
	ON ao.id = ua.option_id
JOIN  creative_profile cp
	ON cp.id = ao.profile_id
WHERE qa.user_id = 1
GROUP BY profile_name
ORDER BY score_total DESC; 

-- New Users
SELECT * 
FROM users 
ORDER BY id DESC;