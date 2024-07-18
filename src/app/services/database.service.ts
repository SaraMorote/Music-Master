import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { SQLitePorter } from '@awesome-cordova-plugins/sqlite-porter/ngx';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, from, lastValueFrom, Observable } from 'rxjs';

export interface Cursos {
  idCurso: number,
  nombre: string,
  imagen: string,
  progreso: number,
  seleccionado: number
}

export interface Lecciones {
  idLeccion: number,
  numLeccion: number,
  curso: number,
  imagen: string,
  progreso: number,
  nombre: string
}

export interface Ejercicios {
  idEjercicio: number,
  nombre: string,
  idLeccion: number
}

export interface EjerciciosSeleccion {
  idEjercicio: number,
  tipoPregunta: string,
  enunciado: string,
  recursoMultimedia: string,
  tipoRecurso: number
}

export interface EjerciciosParejas {
  idEjercicio: number,
  tipoPregunta: string,
  enunciado: string,
}

export interface RespuestasSeleccion {
  idRespuesta: number,
  idEjercicio: number,
  recursoMultimedia: string,
  valorRespuesta: string,
  esCorrecto: number
}

export interface RespuestasParejas {
  idRespuesta: number,
  idEjercicio: number,
  valorRespuesta1: string,
  valorRespuesta2: string,
  esCorrecto1: number,
  esCorrecto2: number,
  visible1: boolean,
  visible2: boolean
  select1: boolean,
  select2: boolean
}

export interface Apuntes {
  idApuntes: number,
	idLeccion: number,
	imagenGeneral: string,
	imagen1: string,
	imagen2: string,
	imagen3: string,
	textoImagen1: string,
	textoImagen2: string,
	texto1: string,
	texto2: string
}

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private database!: SQLiteObject;
  private dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  //declaracion tablas bbdd
  cursos: Cursos[] = [];

  /* lecciones: Lecciones[] = []; */
  /* ejercicios: EjerciciosSeleccion[] = []; */
  /* lecciones = new BehaviorSubject<Lecciones[]>([]); */

  constructor(private plt: Platform, private sqlitePorter: SQLitePorter, private sqlite: SQLite, private http: HttpClient) {
    this.plt.ready().then(() => {
      this.sqlite.create({
        name: 'musicMaster.db',
        location: 'default'
      })
      .then((db: SQLiteObject) => {
        this.database = db;
        /* this.seedDatabase(); */
        this.checkDatabaseReady();
      })
      .catch(e => {
        console.error('Error creating database', e);
      });
    });
   }
   
   async tablesExist(): Promise<boolean> {
    try {
      const result = await this.database.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name='ejercicios';", []);
      return result.rows.length > 0;
    } catch (error) {
      console.error('Error checking if tables exist', error);
      return false;
    }
  }

   async checkDatabaseReady() {
    try {
      const tablesExist = await this.tablesExist();
      if (!tablesExist) {
        await this.seedDatabase();
      } else {
        this.dbReady.next(true);
      }
    } catch (error) {
      console.error('Error checking database ready state', error);
    }
  }  

   async seedDatabase() {
    try {
      const sql = await lastValueFrom(this.http.get('assets/bbdd.sql', { responseType: 'text'}));
      await this.sqlitePorter.importSqlToDb(this.database, sql);

      this.dbReady.next(true);

    } catch (error) {
      throw error;
    }
   }

   getDatabaseState() {
    return this.dbReady.asObservable();
   }

   getCursos() {
    return this.database.executeSql('SELECT * FROM cursos', []).then(data => {
      let cursos: Cursos[] = [];

      if(data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          cursos.push({
            idCurso: data.rows.item(i).idCurso,
            nombre: data.rows.item(i).nombre,
            imagen: data.rows.item(i).imagen,
            progreso: data.rows.item(i).progreso,
            seleccionado: data.rows.item(i).seleccionado
          });
        }
      }
      return cursos;
    });
   }

   getCurso(idCurso: number): Promise<Cursos> {
    return this.database.executeSql('SELECT * FROM cursos where idCurso = ?', [idCurso]).then((data: any) => {

    return {
      idCurso: data.rows.item(0).idCurso,
      nombre: data.rows.item(0).nombre,
      imagen: data.rows.item(0).imagen,
      progreso: data.rows.item(0).progreso,
      seleccionado: data.rows.item(0).seleccionado
    }

    });
   }

   updateCurso(data: number, idCurso: number){
    let query = 'UPDATE cursos SET seleccionado = ? where idCurso = ?';

    return this.database.executeSql(query, [data, idCurso]).then((data: any) => {
    });
  }

  updateProgresoLeccion(data: number, idLeccion: number){
    let query = 'UPDATE lecciones SET progreso = ? where idLeccion = ?';

    return this.database.executeSql(query, [data, idLeccion]).then((data: any) => {
    });
  }

  updateProgresoCurso(data: number, idCurso: number){
    let query = 'UPDATE cursos SET progreso = ? where idCurso = ?';

    return this.database.executeSql(query, [data, idCurso]).then((data: any) => {
    });
  }

   getLeccionByCurso(idCurso: number): Promise<Lecciones[]> {
    let query = 'SELECT * FROM lecciones  where curso = ?';

    return this.database.executeSql(query, [idCurso]).then((data: any) => {


      let lecciones: Lecciones[] = [];

      if(data.rows.length > 0) {
        for (let i = 0; i < data.rows.length; i++) {
          lecciones.push({
            idLeccion: data.rows.item(i).idLeccion,
            numLeccion: data.rows.item(i).numLeccion,
            curso: data.rows.item(i).curso,
            imagen: data.rows.item(i).imagen,
            progreso: data.rows.item(i).progreso,
            nombre: data.rows.item(i).nombre
          });
        }
      }

      return lecciones

      });
   }

   getLeccionById(idLeccion: number): Promise<Lecciones> {
    let query = 'SELECT * FROM lecciones  where idLeccion = ?';

    return this.database.executeSql(query, [idLeccion]).then((data: any) => {

      return {
        idLeccion: data.rows.item(0).idLeccion,
        numLeccion: data.rows.item(0).numLeccion,
        curso: data.rows.item(0).curso,
        imagen: data.rows.item(0).imagen,
        progreso: data.rows.item(0).progreso,
        nombre: data.rows.item(0).nombre
      }

      });
   }

   getEjercicios(): Promise<Ejercicios[]> {
    let query = 'SELECT * FROM ejercicios';

    return this.database.executeSql(query, []).then((data: any) => {

      let ejercicios: Ejercicios[] = [];

      if(data.rows.length > 0) {
        for (let i = 0; i < data.rows.length; i++) {
          ejercicios.push({
            idEjercicio: data.rows.item(i).idEjercicio,
            nombre: data.rows.item(i).nombre,
            idLeccion: data.rows.item(i).idLeccion,
          });
        }
      }

     return ejercicios

      });
   }

   getEjerciciosByLeccion(idLeccion: number): Promise<Ejercicios[]> {
    let query = 'SELECT * FROM ejercicios WHERE idLeccion = ?';

    return this.database.executeSql(query, [idLeccion]).then((data: any) => {

      let ejercicios: Ejercicios[] = [];

      if(data.rows.length > 0) {
        for (let i = 0; i < data.rows.length; i++) {
          ejercicios.push({
            idEjercicio: data.rows.item(i).idEjercicio,
            nombre: data.rows.item(i).nombre,
            idLeccion: data.rows.item(i).idLeccion,
          });
        }
      }

     return ejercicios

      });
   }

   getEjerciciosSeleccion(idEjercicio: number): Promise<EjerciciosSeleccion> {
    let query = 'SELECT * FROM ejerciciosSeleccion WHERE idEjercicio = ?';

    return this.database.executeSql(query, [idEjercicio]).then((data: any) => {

      let ejercicios: EjerciciosSeleccion[] = [];

      if(data.rows.length > 0) {
        for (let i = 0; i < data.rows.length; i++) {
          ejercicios.push({
            idEjercicio: data.rows.item(i).idEjercicio,
            tipoPregunta: data.rows.item(i).tipoPregunta,
            enunciado: data.rows.item(i).enunciado,
            recursoMultimedia: data.rows.item(i).recursoMultimedia,
            tipoRecurso: data.rows.item(i).tipoRecurso
          });
        }
      }

     return ejercicios[0]

      });
   }

   getEjerciciosParejas(idEjercicio: number): Promise<EjerciciosParejas> {
    let query = 'SELECT * FROM ejerciciosParejas WHERE idEjercicio = ?';

    return this.database.executeSql(query, [idEjercicio]).then((data: any) => {

      let ejercicios: EjerciciosParejas[] = [];

      if(data.rows.length > 0) {
        for (let i = 0; i < data.rows.length; i++) {
          ejercicios.push({
            idEjercicio: data.rows.item(i).idEjercicio,
            tipoPregunta: data.rows.item(i).tipoPregunta,
            enunciado: data.rows.item(i).enunciado
          });
        }
      }

     return ejercicios[0]

      });
   }

   getRespuestasSeleccionByEjercicio(idEjercicio: number){
    let query = 'SELECT * FROM respuestasSeleccion where idEjercicio = ?';

    return this.database.executeSql(query, [idEjercicio]).then((data: any) => {

      let respuestas: RespuestasSeleccion[] = [];

      if(data.rows.length > 0) {
        for (let i = 0; i < data.rows.length; i++) {
          respuestas.push({
            idRespuesta: data.rows.item(i).idRespuesta,
            esCorrecto: data.rows.item(i).esCorrecto,
            valorRespuesta: data.rows.item(i).valorRespuesta,
            recursoMultimedia: data.rows.item(i).recursoMultimedia,
            idEjercicio: data.rows.item(i).idEjercicio
          });
        }
      }

      return respuestas;

    });
  }

  getRespuestasParejasByEjercicio(idEjercicio: number){
    let query = 'SELECT * FROM respuestasParejas where idEjercicio = ?';

    return this.database.executeSql(query, [idEjercicio]).then((data: any) => {

      let respuestas: RespuestasParejas[] = [];

      if(data.rows.length > 0) {
        for (let i = 0; i < data.rows.length; i++) {
          respuestas.push({
            idRespuesta: data.rows.item(i).idRespuesta,
            valorRespuesta1: data.rows.item(i).valorRespuesta1,
            valorRespuesta2: data.rows.item(i).valorRespuesta2,
            esCorrecto1: data.rows.item(i).esCorrecto1,
            esCorrecto2: data.rows.item(i).esCorrecto2,
            idEjercicio: data.rows.item(i).idEjercicio,
            visible1: true,
            visible2: true,
            select1: false,
            select2: false,
          });
        }
      }

      return respuestas;

    });
  }

  getApuntesByLeccion(idLeccion: number): Promise<Apuntes> {
    let query = 'SELECT * FROM apuntes  where idLeccion = ?';

    return this.database.executeSql(query, [idLeccion]).then((data: any) => {

      return {
        idApuntes: data.rows.item(0).idApuntes,
        idLeccion: data.rows.item(0).idLeccion,
        imagenGeneral: data.rows.item(0).imagenGeneral,
        imagen1: data.rows.item(0).imagen1,
        imagen2: data.rows.item(0).imagen2,
        imagen3: data.rows.item(0).imagen3,
        textoImagen1: data.rows.item(0).textoImagen1,
        textoImagen2: data.rows.item(0).textoImagen2,
        texto1: data.rows.item(0).texto1,
        texto2: data.rows.item(0).texto2
      }

      });
   }
}