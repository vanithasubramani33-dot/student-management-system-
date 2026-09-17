CREATE DATABASE student_management;

USE student_management;

CREATE TABLE students (
    id INT PRIMARY KEY AUTO_INCREMENT,
    student_id VARCHAR(20) NOT NULL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    course VARCHAR(100) NOT NULL,
    phone VARCHAR(15) NOT NULL
);

INSERT INTO students
(student_id, name, email, course, phone)
VALUES
('S001', 'Vani', 'vani@gmail.com', 'Computer Science', '9876543210');

INSERT INTO students
(student_id, name, email, course, phone)
VALUES
('S002', 'Priya', 'priya@gmail.com', 'Information Technology', '9876543211');

SELECT * FROM students;
