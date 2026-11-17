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
    quiz_id INT NOT NULL,
    question_text VARCHAR(255) NOT NULL,
    CONSTRAINT ct_fk_quiz_question
        FOREIGN KEY (quiz_id)
            REFERENCES quiz (id)
);

CREATE TABLE answer_option (
    id INT PRIMARY KEY AUTO_INCREMENT,
    question_id INT NOT NULL,
    option_text VARCHAR(255) NOT NULL,
    CONSTRAINT ct_fk_question_answer_option
        FOREIGN KEY (question_id)
            REFERENCES question (id)
);

CREATE TABLE creative_profile (
    id INT PRIMARY KEY AUTO_INCREMENT,
    profile_name VARCHAR(50) NOT NULL,
    description VARCHAR(255) NOT NULL
);

CREATE TABLE option_profile_score (
    option_id INT NOT NULL,
    profile_id INT NOT NULL,
    score INT NOT NULL,
    PRIMARY KEY (option_id, profile_id),
	FOREIGN KEY (option_id)
		REFERENCES answer_option (id),
    FOREIGN KEY (profile_id)
		REFERENCES creative_profile (id)
);

CREATE TABLE quiz_attempt (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    quiz_id INT NOT NULL,
    completed_at DATETIME,
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

INSERT INTO users (full_name, email, username, passwd) VALUES 
('Gabriel Cavalcante', 'gcsantos@sptech.school', 'gcsantos', SHA2('Admin@123', 256));

SELECT * 
FROM users 
ORDER BY id DESC;