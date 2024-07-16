import { Component, OnInit } from '@angular/core';
import { DatabaseService, Lecciones } from '../services/database.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-resultado-test',
  templateUrl: './resultado-test.page.html',
  styleUrls: ['./resultado-test.page.scss'],
})
export class ResultadoTestPage implements OnInit {

  idLeccion: number = this.route.snapshot.params['idLeccion'];
  progreso: number = this.route.snapshot.params['progreso'];

  leccion?: Lecciones;

  titulo: string = '';
  texto: string = '';

  constructor(private route: ActivatedRoute, private db: DatabaseService) { }

  ngOnInit() {
    this.db.getDatabaseState().subscribe(ready => {
      if (ready) {
        this.db.getLeccionById(this.idLeccion).then(leccion => {
          this.leccion = leccion;

          this.textoResultado();

        });
      }
    })
  }

  textoResultado(){
    if(this.progreso < 50){
      this.titulo = '¡No te desanimes!';
      this.texto = '¡Continúa trabajando y la próxima vez lograrás una mayor puntuación!';
    }
    else if(this.progreso >=50 && this.progreso <80) {
      this.titulo = '¡Buen trabajo!';
      this.texto = 'Vas por el buen camino. Continúa como hasta ahora y lograrás resultados aún mejores.';
    }
    else if(this.progreso >= 80 && this.progreso <= 100) {
      this.titulo = '¡Enhorabuena!';
      this.texto = 'Esta lección no ha supuesto ningún reto para ti, ¡ahora a por la siguiente!';
    }
  }
}
