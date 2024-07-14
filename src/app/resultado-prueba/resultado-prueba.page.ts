import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cursos, DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-resultado-prueba',
  templateUrl: './resultado-prueba.page.html',
  styleUrls: ['./resultado-prueba.page.scss'],
})
export class ResultadoPruebaPage implements OnInit {

  idCurso: number = this.route.snapshot.params['idCurso'];
  numAciertos: number = this.route.snapshot.params['numAciertos'];

  curso?: Cursos;

  constructor(private route: ActivatedRoute, private db: DatabaseService) { }

  ngOnInit() {
    this.db.getDatabaseState().subscribe(ready => {
      if (ready) {
        this.db.getCurso(this.idCurso).then(cursos => {
          this.curso = cursos;
        });
      }
    })
  }

}
