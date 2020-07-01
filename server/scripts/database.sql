-- Database: bolsa_trabajo

-- DROP DATABASE bolsa_trabajo;

CREATE DATABASE bolsa_trabajo;



INSERT INTO category (id_category, desc_category)
VALUES 
(1, 'SALUD'),
(2, 'TECNOLOGÍA'),
(3, 'ABARROTES'),
(4, 'ENTRETENIMIENTO'),
(5, 'DEPORTES'),
(6, 'SERVICIOS'),
(7, 'EDUCACIÓN'),
(8, 'VENTA DE ROPA'),
(9, 'TRANSPORTES'),
(10, 'VIVIENDA');

INSERT INTO sub_category (id_sub_category, _id_category, desc_sub_category) VALUES (1,2,'PROGRAMACIÓN');

INSERT INTO combo_type (id_group, value, desc_combo)
values
(1, '3', 'Pasaporte'),
(1, '4', 'PTP'),
(1, '1', 'Carné de extranjería'),
(1, '2', 'Dni');

INSERT INTO combo_type (id_group, value, desc_combo) values(2,'1','Desarrollador Web');