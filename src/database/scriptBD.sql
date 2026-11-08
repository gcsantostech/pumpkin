-- Depois remover permissão de alter
CREATE DATABASE pumpkin;
USE pumpkin;

CREATE TABLE usuario (
	id INT PRIMARY KEY AUTO_INCREMENT,
    nome_completo VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    username VARCHAR(15) UNIQUE NOT NULL,
    senha VARCHAR(8) NOT NULL
);

CREATE TABLE posts (
	id INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(100) UNIQUE NOT NULL,
    descricao VARCHAR(100) NULL,
    curtidas INT NULL,
    salvamentos INT NULL,
    usuario_id INT NOT NULL,
    CONSTRAINT cfk_usuario_posts FOREIGN KEY (usuario_id)
    REFERENCES usuario(id)
);

CREATE TABLE cores (
	id INT PRIMARY KEY,
    cor VARCHAR(8) NOT NULL,
    descricao VARCHAR(20)
);

CREATE TABLE fontes (
	id INT PRIMARY KEY,
    fonte VARCHAR(8) NOT NULL,
    descricao VARCHAR(20)
);

CREATE TABLE posts_cores (
	posts_id INT,
    cores_id INT,
    PRIMARY KEY (posts_id, cores_id),
    FOREIGN KEY (posts_id) 
		REFERENCES posts (id),
	FOREIGN KEY (cores_id)
    REFERENCES cores (id)
);

CREATE TABLE posts_fontes (
	posts_id INT,
    fontes_id INT,
    PRIMARY KEY (posts_id, fontes_id),
    FOREIGN KEY (posts_id) 
		REFERENCES posts (id),
	FOREIGN KEY (fontes_id)
    REFERENCES fontes (id)
);

CREATE TABLE colecao (
	id INT PRIMARY KEY AUTO_INCREMENT,
    dt_salvamento DATETIME,
    usuario_id INT NOT NULL,
    CONSTRAINT cfk_usuario_colecao FOREIGN KEY (usuario_id)
    REFERENCES usuario(id)
);

CREATE table salvos (
	colecao_id INT,
    posts_id INT,
    PRIMARY KEY (colecao_id, posts_id),
    FOREIGN KEY (colecao_id) 
		REFERENCES colecao (id),
	FOREIGN KEY (posts_id)
    REFERENCES posts (id)
);

INSERT INTO usuario (nome_completo, email, username, senha) VALUES 
('Gabriel Cavalcante', 'gcsantos@sptech.school', 'gcsantos', '1447');

SELECT * 
FROM usuario 
ORDER BY id DESC;