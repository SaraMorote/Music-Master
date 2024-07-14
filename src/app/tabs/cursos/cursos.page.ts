import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  
  constructor(private db: DatabaseService, private router: Router) {
  }

  ngOnInit() {
    console.log('aaaaaa');
    this.db.getDatabaseState().subscribe(ready => {
      if (ready) {
        this.db.getCursos().then(cursos => {
          this.cursos = cursos;
          console.log(this.cursos);
        });
        
      }
    })
  }

  async cambiarCurso(idCurso: number){
    await this.db.updateCurso(1, idCurso);
    this.router.navigateByUrl(`/tabs/inicio/${idCurso}`);
  }
}
