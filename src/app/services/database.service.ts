import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { SQLitePorter } from '@awesome-cordova-plugins/sqlite-porter/ngx';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, from, Observable } from 'rxjs';

export interface Cursos {
  idCurso: number,
  nombre: string,
  imagen: string,
  progreso: number,
  seleccionado: number
}

export interface Lecciones {
  idLeccion: number,
  curso: number,
  imagen: string,
  progreso: number,
  nombre: string
}

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private database!: SQLiteObject;
  private dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
  
  //declaracion tablas bbdd
  cursos = new BehaviorSubject<Cursos[]>([]);
  lecciones = new BehaviorSubject<Lecciones[]>([]);

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

   seedDatabase() {
    this.http.get('assets/bbdd.sql', { responseType: 'text'})
    .subscribe(sql => {
      this.sqlitePorter.importSqlToDb(this.database, sql)
      .then(_ => {
        this.loadCursos();
        this.loadLecciones();
        this.dbReady.next(true);
      })
      .catch(e => console.error(e));
    });
   }

   getDatabaseState() {
    return this.dbReady.asObservable();
   }

   getCursos(): Observable<Cursos[]> {
    return this.cursos.asObservable();
   }

   getLecciones(): Observable<Lecciones[]> {
    return this.lecciones.asObservable();
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
      this.cursos.next(cursos);
    });
   }

   getCurso(idCurso: number): Observable<Cursos> {
    return from( this.database.executeSql('SELECT * FROM cursos where idCurso = ?', [idCurso]).then((data: any) => {

    return {
      idCurso: data.rows.item(0).idCurso,
      nombre: data.rows.item(0).nombre,
      imagen: data.rows.item(0).imagen,
      progreso: data.rows.item(0).progreso,
      seleccionado: data.rows.item(0).seleccionado
    }

    }));
   }
    
   loadLecciones() {
    let query = 'SELECT * FROM lecciones JOIN cursos ON cursos.idCurso = lecciones.idLeccion';
    return this.database.executeSql(query, []).then(data => {
      let lecciones: Lecciones[] = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          lecciones.push({
            idLeccion: data.rows.item(i).idLeccion,
            curso: data.rows.item(i).curso,
            imagen: data.rows.item(i).imagen,
            progreso: data.rows.item(i).progreso,
            nombre: data.rows.item(i).nombre
          });
        }
      }
      this.lecciones.next(lecciones);
    })
   }
}
