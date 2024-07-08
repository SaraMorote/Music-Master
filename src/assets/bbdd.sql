/* CURSOS */
CREATE TABLE IF NOT EXISTS cursos (
	idCurso	INTEGER PRIMARY KEY AUTOINCREMENT,
	nombre text, 
	imagen text, /* url imagen en assets/images/... */
	progreso INTEGER,
	seleccionado INTEGER /* 0 no seleccionado - 1 seleccionado */
)

INSERT or IGNORE INTO cursos VALUES (1, '1º Enseñanzas Elementales', 'assets/images/icono 1º ee-ee.png', 0, 0);
INSERT or IGNORE INTO cursos VALUES (2, '2º Enseñanzas Elementales', 'assets/images/icono 2º ee-ee.png', 0, 0);
INSERT or IGNORE INTO cursos VALUES (3, '3º Enseñanzas Elementales', 'assets/images/icono 3º ee-ee.png', 0, 1); 
INSERT or IGNORE INTO cursos VALUES (4, '4º Enseñanzas Elementales', 'assets/images/icono 4º ee-ee.png', 0, 0);
INSERT or IGNORE INTO cursos VALUES (5, '1º Enseñanzas Elementales', 'assets/images/icono 1º ee-pp.png', 0, 0);
INSERT or IGNORE INTO cursos VALUES (6, '2º Enseñanzas Elementales', 'assets/images/icono 2º ee-pp.png', 0, 0);

/* LECCIONES */
CREATE TABLE IF NOT EXISTS lecciones (
	idLeccion INTEGER PRIMARY KEY AUTOINCREMENT,
	curso	INTEGER,
	imagen	TEXT,
	progreso	INTEGER,
	nombre	TEXT,
	FOREIGN KEY(curso) REFERENCES cursos(idCurso)
)

INSERT or IGNORE INTO lecciones VALUES (1, 3, 'assets/images/logo.png', 0, 'Clave de Fa (4ª línea)');

/* PRUEBA DE NIVEL */
/* APUNTES */
/* EJERCICIOS */