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

  opcionSeleccionada: number = 0;
  numAciertos: number = 0;

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
    // Comprobar si esta bien
    let resp = this.respuestas.find( (respuesta: Respuestas) => respuesta.idRespuesta === this.opcionSeleccionada);

    if(resp?.esCorrecto === 1){
      this.numAciertos++;
      // Mostrar modal verde
      console.log("BIEEEN")
    }
    else{
      // Mostrar modal rojo
      console.log("POBRE")
    }

    this.numEjercicio++;

    if(this.numEjercicio >= this.ejercicios.length) {
      //Calcular curso
      if(this.numAciertos <= 2){
        this.router.navigateByUrl('/tabs/inicio/1');
        return
      }
      else if(this.numAciertos >2 && this.numAciertos <= 4) {
        this.router.navigateByUrl('/tabs/inicio/2');
        return
      }
      else if(this.numAciertos >4 && this.numAciertos <= 6) {
        this.router.navigateByUrl('/tabs/inicio/3');
        return
      }
      else if(this.numAciertos >6 && this.numAciertos <= 8) {
        this.router.navigateByUrl('/tabs/inicio/4');
        return
      }
      else if(this.numAciertos == 9) {
        this.router.navigateByUrl('/tabs/inicio/5');
        return
      }
      else if(this.numAciertos == 10) {
        this.router.navigateByUrl('/tabs/inicio/6');
        return
      }
    }

    this.getRespuestaByEjercicio(this.ejercicios[this.numEjercicio].idEjercicio);
  }

  guardarSeleccion(event: any){
    this.opcionSeleccionada = event.target.value;
  }

}
