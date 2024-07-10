import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Cursos, DatabaseService, Lecciones } from 'src/app/services/database.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.page.html',
  styleUrls: ['./cursos.page.scss'],
})
export class CursosPage implements OnInit {

  cursos: Cursos[] = [];
  lecciones!: Observable<any[]>;
  
  constructor(private db: DatabaseService) {
  }

  ngOnInit() {
    this.db.getDatabaseState().subscribe(ready => {
      if (ready) {
        this.db.getCursos().subscribe(cursos => {
          console.log('cursos: ', cursos);
          this.cursos = cursos;
        });
        /* this.lecciones = this.db.getLecciones(); */
      }
    })
  }

 
}
