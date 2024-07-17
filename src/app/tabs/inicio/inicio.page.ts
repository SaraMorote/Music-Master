import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { Cursos, DatabaseService, Lecciones } from 'src/app/services/database.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage {

  idCurso: number = this.route.snapshot.params['idCurso'];
  nombreLeccion: string = '';
  curso?: Cursos;
  lecciones: Lecciones[] = [];

  @ViewChild('modal') modal?: IonModal;
  idLeccion: number = 0;
  
  constructor(
    private route: ActivatedRoute, private db: DatabaseService,
    private router: Router
  ) { }

  ionViewWillEnter() {

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
          this.cargarDatos()
      }
    });

    this.cargarDatos();
  }

  cargarDatos(){
    this.db.getDatabaseState().subscribe(ready => {
      if (ready) {
        this.db.getCurso(this.idCurso).then(cursos => {
          this.curso = cursos;
        });
        
        this.db.getLeccionByCurso(this.idCurso).then(lecciones => {
          this.lecciones = lecciones;
          this.calcularProgresoCurso();
          console.log(lecciones);
        });
      }
    })
  }

  mostrarModal(leccion: Lecciones) {
    this.idLeccion = leccion.idLeccion;
    this.nombreLeccion = leccion.nombre;

    this.modal?.present();
  }

  calcularProgresoCurso(){
    let suma = 0;

    for(let i=0; i < this.lecciones.length; i++){
      suma += this.lecciones[i].progreso;  
    }

    let media = suma / this.lecciones.length;

    this.curso!.progreso = Number(media.toFixed(2));

    this.db.updateProgresoCurso(media, this.curso!.idCurso);
  }
}
