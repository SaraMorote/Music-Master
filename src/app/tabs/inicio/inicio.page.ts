import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cursos, DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  idCurso: number = 0;
  curso?: Cursos;

  constructor(
    private route: ActivatedRoute, private db: DatabaseService
  ) { }

  ngOnInit() {
    this.idCurso = Number(this.route.snapshot.paramMap.get("idCurso"))
    console.log(this.idCurso)

    this.db.getDatabaseState().subscribe(ready => {
      if (ready) {
        this.db.getCurso(this.idCurso).subscribe(cursos => {
          console.log('curso: ', cursos);
          this.curso = cursos;
          console.log(this.curso);
        });
        
      }
    })
  }

}
