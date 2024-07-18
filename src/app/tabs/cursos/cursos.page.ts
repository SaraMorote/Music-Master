import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Cursos, DatabaseService, Lecciones } from 'src/app/services/database.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.page.html',
  styleUrls: ['./cursos.page.scss'],
})
export class CursosPage /* implements OnInit */ {

  cursos: Cursos[] = [];
  lecciones!: Observable<any[]>;

  cursoSeleccionado?: Cursos;
  
  constructor(private db: DatabaseService, private router: Router) {
  }

  /* En vez de ngOnInit() */
  ionViewWillEnter() {
    this.db.getDatabaseState().subscribe(ready => {
      if (ready) {
        this.db.getCursos().then(cursos => {
          this.cursos = cursos;
          this.cursoSeleccionado = this.cursos.find(curso => curso.seleccionado === 1);
        });
        
      }
    })
  }

  async cambiarCurso(idCurso: number){
    await this.db.updateCurso(0, this.cursoSeleccionado!.idCurso);
    await this.db.updateCurso(1, idCurso);
    this.router.navigateByUrl(`/tabs/inicio/${idCurso}`);
  }
}
