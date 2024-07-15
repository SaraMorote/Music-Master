import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { Cursos, DatabaseService, Lecciones } from 'src/app/services/database.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  idCurso: number = this.route.snapshot.params['idCurso'];
  curso?: Cursos;
  lecciones?: Lecciones[];

  @ViewChild('modal') modal?: IonModal;
  idLeccion: number = 0;
  
  constructor(
    private route: ActivatedRoute, private db: DatabaseService
  ) { }

  ngOnInit() {

    this.db.getDatabaseState().subscribe(ready => {
      if (ready) {
        this.db.getCurso(this.idCurso).then(cursos => {
          this.curso = cursos;
        });
        
        this.db.getLeccionByCurso(this.idCurso).then(lecciones => {
          this.lecciones = lecciones;
          console.log(lecciones);
        });
      }
    })
  }

  mostrarModal(leccion: Lecciones) {
    this.idLeccion = leccion.idLeccion;

    this.modal?.present();
  }
}
