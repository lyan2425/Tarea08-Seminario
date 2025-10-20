CREATE DATABASE mascotas_db;
use mascotas_db;
CREATE TABLE mascotas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  edad INT NOT NULL
);

INSERT INTO mascotas (nombre, edad) VALUES ('Fido', 3);

SELECT  * from mascotas;