import { Component, OnInit } from '@angular/core';
import { DatabaseService, EjerciciosSeleccion, Respuestas } from '../services/database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prueba-nivel',
  templateUrl: './prueba-nivel.page.html',
  styleUrls: ['./prueba-nivel.page.scss'],
})
export class PruebaNivelPage implements OnInit {

  ejercicios: EjerciciosSeleccion[] = [];
  numEjercicio: number = 0;
  respuestas: Respuestas[] = [];

  constructor(private db: DatabaseService, private router: Router) { }

  ngOnInit() {
    this.db.getDatabaseState().subscribe(ready => {
      if (ready) {
        this.db.getEjercicios().then(ejercicios => {
          this.ejercicios = ejercicios;
          this.getRespuestaByEjercicio(this.ejercicios[this.numEjercicio].idEjercicio);
          console.log(ejercicios)
        });
      }
    })
  }
  
  getRespuestaByEjercicio(idEjercicio: number){

    this.db.getRespuestasByEjercicio(idEjercicio)
      .then(respuestas => {
        this.respuestas = respuestas;
        console.log(respuestas);
      })
  }

  nextEjercicio() {
    this.numEjercicio++;

    if(this.numEjercicio >= this.ejercicios.length) {
      this.router.navigateByUrl('/tabs/inicio/1');
      return
    }

    this.getRespuestaByEjercicio(this.ejercicios[this.numEjercicio].idEjercicio);
  }
}
