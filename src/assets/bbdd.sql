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
INSERT or IGNORE INTO cursos VALUES (1, '1º Enseñanzas Elementales', 'assets/images/imagenesCursos/icono 1º ee-ee.png', 0, 0);
INSERT or IGNORE INTO cursos VALUES (2, '2º Enseñanzas Elementales', 'assets/images/imagenesCursos/icono 2º ee-ee.png', 0, 0);
INSERT or IGNORE INTO cursos VALUES (3, '3º Enseñanzas Elementales', 'assets/images/imagenesCursos/icono 3º ee-ee.png', 0, 0); 
INSERT or IGNORE INTO cursos VALUES (4, '4º Enseñanzas Elementales', 'assets/images/imagenesCursos/icono 4º ee-ee.png', 0, 1);
INSERT or IGNORE INTO cursos VALUES (5, '1º Enseñanzas Profesionales', 'assets/images/imagenesCursos/icono 1º ee-pp.png', 0, 0);
INSERT or IGNORE INTO cursos VALUES (6, '2º Enseñanzas Profesionales', 'assets/images/imagenesCursos/icono 2º ee-pp.png', 0, 0);

/* LECCIONES DE CADA CURSO */
/* 1º ee.ee */

INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (1, 1, 'assets/images/imagenesLecciones/pentagrama.png', 'Pentagrama', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (2, 1, 'assets/images/imagenesLecciones/.png', 'Clave de Sol', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (3, 1, 'assets/images/imagenesLecciones/.png', 'Notas (DO3 a DO4)', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (4, 1, 'assets/images/imagenesLecciones/calderon.png', 'Calderón', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (5, 1, 'assets/images/imagenesLecciones/.png', 'Líneas adicionales', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (6, 1, 'assets/images/imagenesLecciones/.png', 'Pulso', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (7, 1, 'assets/images/imagenesLecciones/.png', 'Figuras', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (8, 1, 'assets/images/imagenesLecciones/.png', 'Colocación de la plica', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (9, 1, 'assets/images/imagenesLecciones/.png', 'Silencios', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (10, 1, 'assets/images/imagenesLecciones/.png', 'Compás 2/4 y 3/4', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (11, 1, 'assets/images/imagenesLecciones/.png', 'Acento (fuerte y débil)', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (12, 1, 'assets/images/imagenesLecciones/.png', 'Binario y ternario', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (13, 1, 'assets/images/imagenesLecciones/.png', 'Unidad de tiempo', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (14, 1, 'assets/images/imagenesLecciones/.png', 'Unidad de compás', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (15, 1, 'assets/images/imagenesLecciones/.png', 'Líneas divisorias', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (16, 1, 'assets/images/imagenesLecciones/doble barra final.png', 'Doble barra final', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (17, 1, 'assets/images/imagenesLecciones/.png', 'Ligadura', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (18, 1, 'assets/images/imagenesLecciones/puntillo.png', 'Puntillo', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (19, 1, 'assets/images/imagenesLecciones/signo de repeticion.png', 'Signos de repetición', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (20, 1, 'assets/images/imagenesLecciones/.png', 'Notas (RE4 y SI2)', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (21, 1, 'assets/images/imagenesLecciones/compas 4 por 4.png', 'Compás 4/4', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (22, 1, 'assets/images/imagenesLecciones/.png', 'Cuaternario', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (23, 1, 'assets/images/imagenesLecciones/.png', 'Escala diatónica de DO', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (24, 1, 'assets/images/imagenesLecciones/.png', 'Tono y semitono', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (25, 1, 'assets/images/imagenesLecciones/.png', 'Alteraciones', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (26, 1, 'assets/images/imagenesLecciones/.png', 'Da capo al fine', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (27, 1, 'assets/images/imagenesLecciones/.png', 'Síncopa larga', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (28, 1, 'assets/images/imagenesLecciones/.png', 'Tempo', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (29, 1, 'assets/images/imagenesLecciones/.png', 'Dinámica', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (30, 1, 'assets/images/imagenesLecciones/clave de fa.png', 'Clave de Fa (4ª línea)', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (31, 1, 'assets/images/imagenesLecciones/.png', 'Semicorcheas', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (32, 1, 'assets/images/imagenesLecciones/.png', 'Notas (MI2 a DO5)', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (33, 1, 'assets/images/imagenesLecciones/.png', 'Nota a contratiempo', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (34, 1, 'assets/images/imagenesLecciones/.png', 'Síncopa breve', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (35, 1, 'assets/images/imagenesLecciones/.png', 'Anacrusa', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (36, 1, 'assets/images/imagenesLecciones/.png', 'Escalas', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (37, 1, 'assets/images/imagenesLecciones/.png', 'Definición de intervalo', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (38, 1, 'assets/images/imagenesLecciones/.png', 'Intervalos con tonos y semitonos', 0);

/* 2º ee.ee */
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (1, 2, 'assets/images/imagenesLecciones/.png', 'Síncopa doble', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (2, 2, 'assets/images/imagenesLecciones/.png', 'Clasificación de intervalos', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (3, 2, 'assets/images/imagenesLecciones/.png', 'Intervalos con alteraciones', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (4, 2, 'assets/images/imagenesLecciones/.png', 'Unísono', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (5, 2, 'assets/images/imagenesLecciones/.png', 'Enarmonía', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (6, 2, 'assets/images/imagenesLecciones/.png', 'Escala DO mayor', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (7, 2, 'assets/images/imagenesLecciones/.png', 'Escala LA menor', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (8, 2, 'assets/images/imagenesLecciones/.png', 'Líneas adicionales (MI2 a DO5)', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (9, 2, 'assets/images/imagenesLecciones/.png', 'Compás 6/8 y 9/8', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (10, 2, 'assets/images/imagenesLecciones/.png', 'Clasificación de intervalos', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (11, 2, 'assets/images/imagenesLecciones/.png', 'Tipos de alteraciones', 0); /* propias, accidentales y precaución */
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (12, 2, 'assets/images/imagenesLecciones/.png', 'Matices agógicos', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (13, 2, 'assets/images/imagenesLecciones/.png', 'Semitonos', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (14, 2, 'assets/images/imagenesLecciones/.png', 'Tresillo', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (15, 2, 'assets/images/imagenesLecciones/.png', 'Compás 12/8', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (16, 2, 'assets/images/imagenesLecciones/.png', 'Compases simples y compuestos', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (17, 2, 'assets/images/imagenesLecciones/.png', 'Dobles alteraciones', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (18, 2, 'assets/images/imagenesLecciones/.png', 'Armadura', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (19, 2, 'assets/images/imagenesLecciones/.png', 'Nombre grados de la escala', 0);

/* 3º ee.ee */
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (1, 3, 'assets/images/imagenesLecciones/.png', 'Intervalos aumentados y disminuidos', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (2, 3, 'assets/images/imagenesLecciones/.png', 'Tonalidades relativas', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (3, 3, 'assets/images/imagenesLecciones/.png', 'Escritura de la armadura', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (4, 3, 'assets/images/imagenesLecciones/.png', 'Orden de los sostenidos y bemoles', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (5, 3, 'assets/images/imagenesLecciones/.png', 'Tonalidad a partir de la armadura', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (6, 3, 'assets/images/imagenesLecciones/.png', 'Armadura de una tonalidad', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (7, 3, 'assets/images/imagenesLecciones/.png', 'Armadura de todas las tonalidades', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (8, 3, 'assets/images/imagenesLecciones/.png', 'Clave de Do (3ª línea)', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (9, 3, 'assets/images/imagenesLecciones/.png', 'Compás 3/8', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (10, 3, 'assets/images/imagenesLecciones/.png', 'Inversión', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (11, 3, 'assets/images/imagenesLecciones/.png', 'Escala mayor natural', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (12, 3, 'assets/images/imagenesLecciones/.png', 'Escala menor y sus tipos', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (13, 3, 'assets/images/imagenesLecciones/.png', 'Grados tonales', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (14, 3, 'assets/images/imagenesLecciones/.png', 'Grados modales', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (15, 3, 'assets/images/imagenesLecciones/.png', 'Tonalidades homónimas', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (16, 3, 'assets/images/imagenesLecciones/.png', 'Compás 2/8', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (17, 3, 'assets/images/imagenesLecciones/.png', 'Tonalidades vecinas', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (18, 3, 'assets/images/imagenesLecciones/.png', 'Seisillo', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (19, 3, 'assets/images/imagenesLecciones/.png', 'Síncopa', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (20, 3, 'assets/images/imagenesLecciones/.png', 'Matices agógicos', 0);

/* 4º ee.ee */
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (1, 4, 'assets/images/imagenesLecciones/.png', 'Escalas mayores y sus tipos', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (2, 4, 'assets/images/imagenesLecciones/.png', 'Calificación de intervalos simples', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (3, 4, 'assets/images/imagenesLecciones/.png', 'Escala exátona', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (4, 4, 'assets/images/imagenesLecciones/.png', 'Clave de Do (4ª línea)', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (5, 4, 'assets/images/imagenesLecciones/.png', 'Análisis de cualquier compás', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (6, 4, 'assets/images/imagenesLecciones/.png', 'Grupos artificiales (12 notas)', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (7, 4, 'assets/images/imagenesLecciones/.png', 'Escala mayor y menor cromática', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (8, 4, 'assets/images/imagenesLecciones/.png', 'Índices acústicos', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (9, 4, 'assets/images/imagenesLecciones/.png', 'Unísonos con claves', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (10, 4, 'assets/images/imagenesLecciones/.png', 'Doble puntillo', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (11, 4, 'assets/images/imagenesLecciones/.png', 'Compás 5/4 y 5/8', 0);

/* 1º ee.pp */
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (1, 5, 'assets/images/imagenesLecciones/.png', 'Intervalos armónicos', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (2, 5, 'assets/images/imagenesLecciones/.png', 'Tonalidades enarmónicas', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (3, 5, 'assets/images/imagenesLecciones/.png', 'Cadencia', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (4, 5, 'assets/images/imagenesLecciones/.png', 'Cadencias conclusivas', 0); /* auténtica y plagal */
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (5, 5, 'assets/images/imagenesLecciones/.png', 'Cadencias suspensivas', 0); /* rota */
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (6, 5, 'assets/images/imagenesLecciones/.png', 'Otros tipos de escalas', 0); /* pentáfona, menor oriental e hispano-árabe */
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (7, 5, 'assets/images/imagenesLecciones/.png', 'Modalidad', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (8, 5, 'assets/images/imagenesLecciones/.png', 'Tetracordo', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (9, 5, 'assets/images/imagenesLecciones/.png', 'Modos griegos', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (10, 5, 'assets/images/imagenesLecciones/.png', 'Modos eclesiásticos', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (11, 5, 'assets/images/imagenesLecciones/.png', 'Instrumentos musicales', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (12, 5, 'assets/images/imagenesLecciones/.png', 'La voz', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (13, 5, 'assets/images/imagenesLecciones/.png', 'Abreviaturas y repeticiones', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (14, 5, 'assets/images/imagenesLecciones/.png', 'Ritmo y métrica', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (15, 5, 'assets/images/imagenesLecciones/.png', 'Adornos', 0);

/* 2º ee.pp */
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (1, 6, 'assets/images/imagenesLecciones/.png', 'Acordes tríadas', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (2, 6, 'assets/images/imagenesLecciones/.png', 'Escalas con acordes tríadas', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (3, 6, 'assets/images/imagenesLecciones/.png', 'Acordes cuatríadas', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (4, 6, 'assets/images/imagenesLecciones/.png', 'Acorde de 9ª dominante', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (5, 6, 'assets/images/imagenesLecciones/.png', 'Acústica', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (6, 6, 'assets/images/imagenesLecciones/.png', 'Serie armónica', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (7, 6, 'assets/images/imagenesLecciones/.png', 'Transporte', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (8, 6, 'assets/images/imagenesLecciones/.png', 'Instrumentos transpositores', 0);
INSERT or IGNORE INTO lecciones (numLeccion, curso, imagen, nombre, progreso) VALUES (9, 6, 'assets/images/imagenesLecciones/.png', 'La notación musical', 0);






INSERT or IGNORE INTO ejerciciosSeleccion (tipoPregunta, enunciado, recursoMultimedia, idLeccion) VALUES ('Selecciona la opción correcta', '¿Cuál es esta nota? 1', 'assets/images/logo.png', 4);
INSERT or IGNORE INTO ejerciciosSeleccion (tipoPregunta, enunciado, recursoMultimedia, idLeccion) VALUES ('Selecciona la opción correcta', '¿Cuál es esta nota? 2', 'assets/images/logo.png', 4);

INSERT or IGNORE INTO respuestas (valorRespuesta, recursoMultimedia, imagen, audio, esCorrecto, idEjercicio) VALUES ('Sol', '', 0, 0, 1, 1);
INSERT or IGNORE INTO respuestas (valorRespuesta, recursoMultimedia, imagen, audio, esCorrecto, idEjercicio) VALUES ('Do', '', 0, 0, 0, 1);
INSERT or IGNORE INTO respuestas (valorRespuesta, recursoMultimedia, imagen, audio, esCorrecto, idEjercicio) VALUES ('Mi', '', 0, 0, 0, 1);
INSERT or IGNORE INTO respuestas (valorRespuesta, recursoMultimedia, imagen, audio, esCorrecto, idEjercicio) VALUES ('La', '', 0, 0, 0, 1);

INSERT or IGNORE INTO respuestas (valorRespuesta, recursoMultimedia, imagen, audio, esCorrecto, idEjercicio) VALUES ('Sol2', '', 0, 0, 1, 2);
INSERT or IGNORE INTO respuestas (valorRespuesta, recursoMultimedia, imagen, audio, esCorrecto, idEjercicio) VALUES ('Do2', '', 0, 0, 0, 2);
INSERT or IGNORE INTO respuestas (valorRespuesta, recursoMultimedia, imagen, audio, esCorrecto, idEjercicio) VALUES ('Mi2', '', 0, 0, 0, 2);
INSERT or IGNORE INTO respuestas (valorRespuesta, recursoMultimedia, imagen, audio, esCorrecto, idEjercicio) VALUES ('La2', '', 0, 0, 0, 2);