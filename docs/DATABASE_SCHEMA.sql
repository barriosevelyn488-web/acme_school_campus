

CREATE DATABASE IF NOT EXISTS acme_school

USE acme_school;

-- ------------------------------------------------------------
-- Tablas de referencia
-- ------------------------------------------------------------

CREATE TABLE identification_types (
  id INT AUTO_INCREMENT PRIMARY KEY,
  code VARCHAR(6) NOT NULL UNIQUE,
  name VARCHAR(100) NOT NULL,
  description VARCHAR(250)
);

CREATE TABLE cities (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  code VARCHAR(10) NOT NULL UNIQUE,
  name VARCHAR(100) NOT NULL
);

CREATE TABLE classrooms (
  id INT AUTO_INCREMENT PRIMARY KEY,
  code VARCHAR(10) NOT NULL UNIQUE,
  description VARCHAR(250),
  capacity INT NOT NULL DEFAULT 0,
  active TINYINT NOT NULL DEFAULT 1
);

-- ------------------------------------------------------------
-- Personas
-- ------------------------------------------------------------

CREATE TABLE students (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  code VARCHAR(14) NOT NULL UNIQUE,
  firstName VARCHAR(60) NOT NULL,
  lastName VARCHAR(60) NOT NULL,
  identification_type_id INT,
  identificationNumber VARCHAR(16),
  gender VARCHAR(20),
  birthdate DATETIME,
  email VARCHAR(100),
  address VARCHAR(100),
  city_id BIGINT,
  CONSTRAINT fk_students_identification_type
    FOREIGN KEY (identification_type_id) REFERENCES identification_types(id),
  CONSTRAINT fk_students_city
    FOREIGN KEY (city_id) REFERENCES cities(id)
);

CREATE TABLE teachers (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  firstName VARCHAR(60) NOT NULL,
  lastName VARCHAR(60) NOT NULL,
  identification_type_id INT,
  identificationNumber VARCHAR(16),
  email VARCHAR(100),
  CONSTRAINT fk_teachers_identification_type
    FOREIGN KEY (identification_type_id) REFERENCES identification_types(id)
);

-- ------------------------------------------------------------
-- Cursos, horarios e inscripciones
-- ------------------------------------------------------------

CREATE TABLE courses (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  code VARCHAR(10) NOT NULL UNIQUE,
  description VARCHAR(250) NOT NULL,
  intensity INT DEFAULT 0,
  weight INT DEFAULT 0,
  active TINYINT NOT NULL DEFAULT 1
);

CREATE TABLE courses_schedules (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  course_id BIGINT NOT NULL,
  teacher_id BIGINT NOT NULL,
  classroom_id INT NOT NULL,
  start_date DATETIME NOT NULL,
  end_date DATETIME NOT NULL,
  active TINYINT NOT NULL DEFAULT 1,
  CONSTRAINT fk_schedules_course
    FOREIGN KEY (course_id) REFERENCES courses(id),
  CONSTRAINT fk_schedules_teacher
    FOREIGN KEY (teacher_id) REFERENCES teachers(id),
  CONSTRAINT fk_schedules_classroom
    FOREIGN KEY (classroom_id) REFERENCES classrooms(id)
);

CREATE TABLE inscriptions (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  course_schedule BIGINT NOT NULL,
  student_id BIGINT NOT NULL,
  register_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  active TINYINT NOT NULL DEFAULT 1,
  CONSTRAINT fk_inscriptions_schedule
    FOREIGN KEY (course_schedule) REFERENCES courses_schedules(id),
  CONSTRAINT fk_inscriptions_student
    FOREIGN KEY (student_id) REFERENCES students(id)
);

CREATE TABLE rates (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  inscription_id BIGINT NOT NULL,
  rate BIGINT NOT NULL,
  comments VARCHAR(250),
  CONSTRAINT fk_rates_inscription
    FOREIGN KEY (inscription_id) REFERENCES inscriptions(id)
);

-- ------------------------------------------------------------
-- Contenido de los cursos
-- ------------------------------------------------------------

CREATE TABLE topics (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  course_id BIGINT NOT NULL,
  code VARCHAR(10) NOT NULL,
  title VARCHAR(100) NOT NULL,
  description VARCHAR(250),
  active TINYINT NOT NULL DEFAULT 1,
  CONSTRAINT fk_topics_course
    FOREIGN KEY (course_id) REFERENCES courses(id)
);

-- ============================================================
-- Datos de demostración
-- ============================================================

INSERT INTO identification_types (code, name, description)
VALUES
  ('DPI', 'Documento Personal de Identificación', 'Identificación nacional'),
  ('PAS', 'Pasaporte', 'Documento de viaje');

INSERT INTO cities (code, name)
VALUES
  ('GUA', 'Guatemala'),
  ('ANT', 'Antigua Guatemala');

INSERT INTO students (
  code, firstName, lastName, identification_type_id,
  identificationNumber, gender, birthdate, email, address, city_id
)
VALUES
  ('EST-0001', 'Ana', 'López', 1, '1234567890101', 'Femenino',
   '2005-04-12', 'ana.lopez@campus.edu', 'Zona 1', 1),
  ('EST-0002', 'Luis', 'Morales', 1, '1234567890102', 'Masculino',
   '2004-09-20', 'luis.morales@campus.edu', 'Zona 10', 1),
  ('EST-0003', 'Sofía', 'Herrera', 2, 'A12345678', 'Femenino',
   '2005-01-03', 'sofia.herrera@campus.edu', 'Centro', 2);

INSERT INTO teachers (
  firstName, lastName, identification_type_id, identificationNumber, email
)
VALUES
  ('Carlos', 'Méndez', 1, '9876543210101', 'carlos.mendez@campus.edu'),
  ('María', 'García', 1, '9876543210102', 'maria.garcia@campus.edu');

INSERT INTO classrooms (code, description, capacity)
VALUES
  ('A-101', 'Aula de informática', 30),
  ('B-202', 'Aula multimedia', 25);

INSERT INTO courses (code, description, intensity, weight)
VALUES
  ('NODE-01', 'Introducción a Node.js', 36, 3),
  ('POO-02', 'POO, Patrones de Diseño y Buenas Prácticas', 36, 3),
  ('DB-03', 'Persistencia de Datos', 36, 3);

INSERT INTO courses_schedules (
  course_id, teacher_id, classroom_id, start_date, end_date
)
VALUES
  (1, 1, 1, '2026-09-04 07:00:00', '2026-10-02 10:30:00'),
  (2, 2, 2, '2026-09-07 07:00:00', '2026-10-05 10:30:00'),
  (3, 1, 1, '2026-09-14 07:00:00', '2026-10-12 10:30:00');

INSERT INTO inscriptions (course_schedule, student_id)
VALUES
  (1, 1),
  (1, 2),
  (2, 1),
  (2, 3),
  (3, 2),
  (3, 3);

INSERT INTO rates (inscription_id, rate, comments)
VALUES
  (1, 95, 'Excelente participación'),
  (2, 88, 'Buen progreso');

INSERT INTO topics (course_id, code, title, description)
VALUES
  (1, 'N01', 'Introducción a Node.js', 'Entornos de ejecución y módulos'),
  (1, 'N02', 'Programación orientada a objetos',
   'Clases, encapsulamiento y principios SOLID'),
  (2, 'P01', 'Principios SOLID',
   'Responsabilidad única, extensión e inversión de dependencias'),
  (2, 'P02', 'Patrones de diseño', 'Patrones creacionales y estructurales'),
  (3, 'D01', 'Consultas SQL', 'Relaciones, joins y transacciones');
