/* CREATES */
/* CURSOS */
CREATE TABLE IF NOT EXISTS cursos (
	idCurso INTEGER PRIMARY KEY AUTOINCREMENT,
	nombre TEXT,
	imagen TEXT, /* url imagen en assets/images/... */
	progreso INTEGER CHECK(progreso >= 0 AND progreso <= 100),
	seleccionado INTEGER /* 0 no seleccionado - 1 seleccionado */
);

/* LECCIONES */
CREATE TABLE IF NOT EXISTS lecciones (
	idLeccion INTEGER PRIMARY KEY AUTOINCREMENT,
	numLeccion INTEGER, /* cada curso tendrá X lecciones */
	curso	INTEGER, /* el mismo que el id de cursos */
	nombre	TEXT,
	imagen	TEXT,
	progreso INTEGER CHECK(progreso >= 0 AND progreso <= 100),
	FOREIGN KEY(curso) REFERENCES cursos(idCurso)
);

/* EJERCICIOS SELECCION */
CREATE TABLE IF NOT EXISTS ejerciciosSeleccion (
	idEjercicio INTEGER PRIMARY KEY AUTOINCREMENT,
	tipoPregunta TEXT,
	enunciado TEXT,
	recursoMultimedia TEXT,
	idLeccion INTEGER,
	FOREIGN KEY(idLeccion) REFERENCES lecciones(idLeccion)
);

/* EJERCICIOS COLUMNAS */

/* RESPUESTAS */
CREATE TABLE IF NOT EXISTS respuestas (
	idRespuesta INTEGER PRIMARY KEY AUTOINCREMENT,
	idEjercicio INTEGER,
	recursoMultimedia TEXT,
	valorRespuesta TEXT,
	imagen INTEGER, /* 0 no tiene foto - 1 tiene foto */
	audio INTEGER, /* 0 no tiene audio - 1 tiene audio */
	esCorrecto INTEGER, /* 0 no tiene foto - 1 tiene foto */
	FOREIGN KEY(idEjercicio) REFERENCES ejerciciosSeleccion(idEjercicio)
);

/* APUNTES */

/* INSERTS */
/* CURSOS */
INSERT or IGNORE INTO cursos VALUES (1, '1º Enseñanzas Elementales', 'assets/images/icono 1º ee-ee.png', 0, 0);
INSERT or IGNORE INTO cursos VALUES (2, '2º Enseñanzas Elementales', 'assets/images/icono 2º ee-ee.png', 0, 0);
INSERT or IGNORE INTO cursos VALUES (3, '3º Enseñanzas Elementales', 'assets/images/icono 3º ee-ee.png', 0, 1); 
INSERT or IGNORE INTO cursos VALUES (4, '4º Enseñanzas Elementales', 'assets/images/icono 4º ee-ee.png', 0, 0);
INSERT or IGNORE INTO cursos VALUES (5, '1º Enseñanzas Profesionales', 'assets/images/icono 1º ee-pp.png', 0, 0);
INSERT or IGNORE INTO cursos VALUES (6, '2º Enseñanzas Profesionales', 'assets/images/icono 2º ee-pp.png', 0, 0);

/* LECCIONES DE CADA CURSO */
/* 1º ee.ee */
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (1, 1, 'assets/images/cambiar.png', 'Pentagrama', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (2, 1, 'assets/images/cambiar.png', 'Clave de SOL', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (3, 1, 'assets/images/cambiar.png', 'Notas (DO3 a DO4)', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (4, 1, 'assets/images/cambiar.png', 'Calderón', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (5, 1, 'assets/images/cambiar.png', 'Líneas adicionales', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (6, 1, 'assets/images/cambiar.png', 'Pulso', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (7, 1, 'assets/images/cambiar.png', 'Figuras', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (8, 1, 'assets/images/cambiar.png', 'Colocación de la plica', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (9, 1, 'assets/images/cambiar.png', 'Silencios', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (10, 1, 'assets/images/cambiar.png', 'Compás 2/4 y 3/4', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (11, 1, 'assets/images/cambiar.png', 'Acento (fuerte y débil)', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (12, 1, 'assets/images/cambiar.png', 'Binario y ternario', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (13, 1, 'assets/images/cambiar.png', 'Unidad de tiempo', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (14, 1, 'assets/images/cambiar.png', 'Unidad de compás', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (15, 1, 'assets/images/cambiar.png', 'Líneas divisorias', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (16, 1, 'assets/images/cambiar.png', 'Doble barra final', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (17, 1, 'assets/images/cambiar.png', 'Ligadura', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (18, 1, 'assets/images/cambiar.png', 'Puntillo', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (19, 1, 'assets/images/cambiar.png', 'Signo de repetición', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (20, 1, 'assets/images/cambiar.png', 'Notas (RE4 y SI2)', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (21, 1, 'assets/images/cambiar.png', 'Compás 4/4', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (22, 1, 'assets/images/cambiar.png', 'Cuaternario', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (23, 1, 'assets/images/cambiar.png', 'Escala diatónica de DO', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (24, 1, 'assets/images/cambiar.png', 'Tono y semitono', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (25, 1, 'assets/images/cambiar.png', 'Alteraciones', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (26, 1, 'assets/images/cambiar.png', 'Da capo al fine', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (27, 1, 'assets/images/cambiar.png', 'Síncopa larga', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (28, 1, 'assets/images/cambiar.png', 'Tempo', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (29, 1, 'assets/images/cambiar.png', 'Dinámica', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (30, 1, 'assets/images/cambiar.png', 'Clave de FA (4ª línea)', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (31, 1, 'assets/images/cambiar.png', 'Semicorcheas', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (32, 1, 'assets/images/cambiar.png', 'Notas (MI2 a DO5)', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (33, 1, 'assets/images/cambiar.png', 'Nota a contratiempo', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (34, 1, 'assets/images/cambiar.png', 'Síncopa breve', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (35, 1, 'assets/images/cambiar.png', 'Anacrusa', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (36, 1, 'assets/images/cambiar.png', 'Escalas', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (37, 1, 'assets/images/cambiar.png', 'Definición de intervalo', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (38, 1, 'assets/images/cambiar.png', 'Intervalos con tonos y semitonos', 0);

/* 2º ee.ee */
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (1, 2, 'assets/images/cambiar.png', 'Síncopa doble', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (2, 2, 'assets/images/cambiar.png', 'Clasificación de intervalos', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (3, 2, 'assets/images/cambiar.png', 'Intervalos con alteraciones', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (4, 2, 'assets/images/cambiar.png', 'Unísono', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (5, 2, 'assets/images/cambiar.png', 'Enarmonía', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (6, 2, 'assets/images/cambiar.png', 'Escala DO mayor', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (7, 2, 'assets/images/cambiar.png', 'Escala LA menor', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (8, 2, 'assets/images/cambiar.png', 'Líneas adicionales (MI2 a DO5)', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (9, 2, 'assets/images/cambiar.png', 'Compás 6/8 y 9/8', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (10, 2, 'assets/images/cambiar.png', 'Clasificación de intervalos', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (11, 2, 'assets/images/cambiar.png', 'Tipos de alteraciones', 0); /* propias, accidentales y precaución */
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (12, 2, 'assets/images/cambiar.png', 'Matices agógicos', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (13, 2, 'assets/images/cambiar.png', 'Semitonos', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (14, 2, 'assets/images/cambiar.png', 'Tresillo', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (15, 2, 'assets/images/cambiar.png', 'Compás 12/8', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (16, 2, 'assets/images/cambiar.png', 'Compases simples y compuestos', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (17, 2, 'assets/images/cambiar.png', 'Dobles alteraciones', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (18, 2, 'assets/images/cambiar.png', 'Armadura', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (19, 2, 'assets/images/cambiar.png', 'Nombre grados de la escala', 0);

/* 3º ee.ee */
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (1, 3, 'assets/images/cambiar.png', 'Intervalos aumentados y disminuidos', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (2, 3, 'assets/images/cambiar.png', 'Tonalidades relativas', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (3, 3, 'assets/images/cambiar.png', 'Escritura de la armadura', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (4, 3, 'assets/images/cambiar.png', 'Orden de los sostenidos y bemoles', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (5, 3, 'assets/images/cambiar.png', 'Tonalidad a partir de la armadura', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (6, 3, 'assets/images/cambiar.png', 'Armadura de una tonalidad', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (7, 3, 'assets/images/cambiar.png', 'Armadura de todas las tonalidades', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (8, 3, 'assets/images/cambiar.png', 'Clave de DO (3ª línea)', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (9, 3, 'assets/images/cambiar.png', 'Compás 3/8', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (10, 3, 'assets/images/cambiar.png', 'Inversión', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (11, 3, 'assets/images/cambiar.png', 'Escala mayor natural', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (12, 3, 'assets/images/cambiar.png', 'Escala menor y sus tipos', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (13, 3, 'assets/images/cambiar.png', 'Grados tonales', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (14, 3, 'assets/images/cambiar.png', 'Grados modales', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (15, 3, 'assets/images/cambiar.png', 'Tonalidades homónimas', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (16, 3, 'assets/images/cambiar.png', 'Compás 2/8', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (17, 3, 'assets/images/cambiar.png', 'Tonalidades vecinas', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (18, 3, 'assets/images/cambiar.png', 'Seisillo', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (19, 3, 'assets/images/cambiar.png', 'Síncopa', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (20, 3, 'assets/images/cambiar.png', 'Matices agógicos', 0);

/* 4º ee.ee */
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (1, 4, 'assets/images/cambiar.png', 'Escalas mayores y sus tipos', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (2, 4, 'assets/images/cambiar.png', 'Calificación de intervalos simples', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (3, 4, 'assets/images/cambiar.png', 'Escala exátona', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (4, 4, 'assets/images/cambiar.png', 'Clave de DO (4ª línea)', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (5, 4, 'assets/images/cambiar.png', 'Análisis de cualquier compás', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (6, 4, 'assets/images/cambiar.png', 'Grupos artificiales (12 notas)', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (7, 4, 'assets/images/cambiar.png', 'Escala mayor y menor cromática', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (8, 4, 'assets/images/cambiar.png', 'Índices acústicos', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (9, 4, 'assets/images/cambiar.png', 'Unísonos con claves', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (10, 4, 'assets/images/cambiar.png', 'Doble puntillo', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (11, 4, 'assets/images/cambiar.png', 'Compás 5/4 y 5/8', 0);

/* 1º ee.pp */
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (1, 5, 'assets/images/cambiar.png', 'Intervalos armónicos', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (2, 5, 'assets/images/cambiar.png', 'Tonalidades enarmónicas', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (3, 5, 'assets/images/cambiar.png', 'Cadencia', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (4, 5, 'assets/images/cambiar.png', 'Cadencias conclusivas', 0); /* auténtica y plagal */
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (5, 5, 'assets/images/cambiar.png', 'Cadencias suspensivas', 0); /* rota */
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (6, 5, 'assets/images/cambiar.png', 'Otros tipos de escalas', 0); /* pentáfona, menor oriental e hispano-árabe */
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (7, 5, 'assets/images/cambiar.png', 'Modalidad', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (8, 5, 'assets/images/cambiar.png', 'Tetracordo', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (9, 5, 'assets/images/cambiar.png', 'Modos griegos', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (10, 5, 'assets/images/cambiar.png', 'Modos eclesiásticos', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (11, 5, 'assets/images/cambiar.png', 'Instrumentos musicales', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (12, 5, 'assets/images/cambiar.png', 'La voz', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (13, 5, 'assets/images/cambiar.png', 'Abreviaturas y repeticiones', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (14, 5, 'assets/images/cambiar.png', 'Ritmo y métrica', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (15, 5, 'assets/images/cambiar.png', 'Adornos', 0);

/* 2º ee.pp */
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (1, 6, 'assets/images/cambiar.png', 'Acordes tríadas', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (2, 6, 'assets/images/cambiar.png', 'Escalas con acordes tríadas', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (3, 6, 'assets/images/cambiar.png', 'Acordes cuatríadas', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (4, 6, 'assets/images/cambiar.png', 'Acorde de 9ª dominante', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (5, 6, 'assets/images/cambiar.png', 'Acústica', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (6, 6, 'assets/images/cambiar.png', 'Serie armónica', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (7, 6, 'assets/images/cambiar.png', 'Transporte', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (8, 6, 'assets/images/cambiar.png', 'Instrumentos transpositores', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (9, 6, 'assets/images/cambiar.png', 'La notación musical', 0);



INSERT or IGNORE INTO ejerciciosSeleccion (tipoPregunta, enunciado, recursoMultimedia, idLeccion) VALUES ('Selecciona la opción correcta', '¿Cuál es esta nota?', 'assets/images/logo.png', 4);

INSERT or IGNORE INTO respuestas (valorRespuesta, recursoMultimedia, imagen, audio, esCorrecto, idEjercicio) VALUES ('Sol', '', 0, 0, 1, 1);
INSERT or IGNORE INTO respuestas (valorRespuesta, recursoMultimedia, imagen, audio, esCorrecto, idEjercicio) VALUES ('Do', '', 0, 0, 0, 1);
INSERT or IGNORE INTO respuestas (valorRespuesta, recursoMultimedia, imagen, audio, esCorrecto, idEjercicio) VALUES ('Mi', '', 0, 0, 0, 1);
INSERT or IGNORE INTO respuestas (valorRespuesta, recursoMultimedia, imagen, audio, esCorrecto, idEjercicio) VALUES ('La', '', 0, 0, 0, 1);
