import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
}
