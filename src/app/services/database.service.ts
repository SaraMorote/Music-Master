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

export interface EjerciciosSeleccion {
  idEjercicio: number,
  tipoPregunta: string,
  enunciado: string,
  recursoMultimedia: string,
  idLeccion: number
}

export interface Respuestas {
  idRespuesta: number,
  idEjercicio: number,
  recursoMultimedia: string,
  valorRespuesta: string,
  imagen: number,
  audio: number,
  esCorrecto: number
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
    console.log(plt);
    this.plt.ready().then(() => {
      console.log('He llegao');
      this.sqlite.create({
        name: 'musicMaster.db',
        location: 'default'
      })
      .then((db: SQLiteObject) => {
        this.database = db;
        console.log('Database created!');
        this.seedDatabase();
      })
      .catch(e => {
        console.error('Error creating database', e);
      });
    });
   }

   async seedDatabase() {
    try {
      const sql = await lastValueFrom(this.http.get('assets/bbdd.sql', { responseType: 'text'}));
      await this.sqlitePorter.importSqlToDb(this.database, sql);

      await this.loadCursos();
      // this.loadLecciones();
      // this.loadEjercicios();

      this.dbReady.next(true);

      console.log("LISTO");

    } catch (error) {
      console.log('Error inicializando la base de datos: ', error);
      throw error;
    }
   }

   getDatabaseState() {
    return this.dbReady.asObservable();
   }

   getCursos() {
    return this.cursos;
   }

   loadCursos() {
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
      this.cursos = cursos;
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

   getLeccionByCurso(idCurso: number): Promise<Lecciones[]> {
    let query = 'SELECT * FROM lecciones  where curso = ?';

    return this.database.executeSql(query, [idCurso]).then((data: any) => {

      let lecciones: Lecciones[] = [];

      if(data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
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
    
   getEjercicios(): Promise<EjerciciosSeleccion[]> {
    let query = 'SELECT * FROM ejerciciosSeleccion';

    return this.database.executeSql(query, []).then((data: any) => {

      let ejercicios: EjerciciosSeleccion[] = [];

      if(data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          ejercicios.push({
            idEjercicio: data.rows.item(i).idEjercicio,
            tipoPregunta: data.rows.item(i).tipoPregunta,
            enunciado: data.rows.item(i).enunciado,
            recursoMultimedia: data.rows.item(i).recursoMultimedia,
            idLeccion: data.rows.item(i).idLeccion
          });
        }
      }

     return ejercicios
  
      });
   }

   getRespuestasByEjercicio(idEjercicio: number){
    let query = 'SELECT * FROM respuestas where idEjercicio = ?';

    return this.database.executeSql(query, [idEjercicio]).then((data: any) => {

      let respuestas: Respuestas[] = [];

      if(data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          respuestas.push({
            idRespuesta: data.rows.item(i).idRespuesta,
            audio: data.rows.item(i).audio,
            imagen: data.rows.item(i).imagen,
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

}
