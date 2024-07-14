import { Component, OnInit } from '@angular/core';
import { DatabaseService, Ejercicios, RespuestasSeleccion, RespuestasParejas, EjerciciosSeleccion, EjerciciosParejas } from '../services/database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prueba-nivel',
  templateUrl: './prueba-nivel.page.html',
  styleUrls: ['./prueba-nivel.page.scss'],
})
export class PruebaNivelPage implements OnInit {

  ejercicios: Ejercicios[] = [];
  ejercicioSeleccion: EjerciciosSeleccion[] = [];
  ejercicioParejas: EjerciciosParejas[] = [];

  numEjercicio: number = 0;
  respuestasSeleccion: RespuestasSeleccion[] = [];
  respuestasParejas: RespuestasParejas[] = [];

  opcionSeleccionada: number = 0;
  numAciertos: number = 0;

  pareja1: number = 0;
  pareja2: number = 0;
  numParejas: number = 0;

  constructor(private db: DatabaseService, private router: Router) { }

  ngOnInit() {
    this.db.getDatabaseState().subscribe(async ready => {
      if (ready) {

        this.ejercicios = await this.db.getEjercicios();
        console.log( this.ejercicios)


        this.getEjercicioByNombre();
      }
    })
  }

  async getEjercicioByNombre(){
    if( this.ejercicios[this.numEjercicio].nombre === 'Seleccion' ){
      this.ejercicioSeleccion = await this.db.getEjerciciosSeleccion(this.ejercicios[this.numEjercicio].idEjercicio);
      console.log(this.ejercicioSeleccion)
    }
    else{
      this.ejercicioParejas = await this.db.getEjerciciosParejas(this.ejercicios[this.numEjercicio].idEjercicio);
      console.log(this.ejercicioParejas);
    }

    this.getRespuestaByEjercicio(this.ejercicios[this.numEjercicio].idEjercicio);
  }

  async getRespuestaByEjercicio(idEjercicio: number){

    if(this.ejercicios[this.numEjercicio].nombre == "Seleccion"){
      this.respuestasSeleccion = await this.db.getRespuestasSeleccionByEjercicio(idEjercicio)
      console.log(this.respuestasSeleccion)
    }
    else {
      this.respuestasParejas = await this.db.getRespuestasParejasByEjercicio(idEjercicio)
      console.log(this.respuestasParejas)
    }

  }

   async nextEjercicio() {

    //Que tipo de ejercicio es

    if(this.ejercicios[this.numEjercicio].nombre === 'Seleccion') {
      //Comprobar si esta bien
      let resp = this.respuestasSeleccion.find( (respuesta: RespuestasSeleccion) => respuesta.idRespuesta === this.opcionSeleccionada);

      if(resp?.esCorrecto === 1){
        this.numAciertos++;
        // Mostrar modal verde
        console.log("BIEEEN")
        console.log(this.numAciertos)
      }
      else{
        // Mostrar modal rojo
        console.log("ERROR")
        console.log(this.numAciertos)
      }
    }
    else {
      this.numAciertos++;
      this.numParejas = 0;
      console.log(this.numAciertos)
    }

    this.numEjercicio++;

    if(this.numEjercicio >= this.ejercicios.length) {
      //Calcular curso
      if(this.numAciertos <= 2){
        await this.db.updateCurso(1, 1);
        this.router.navigateByUrl('/tabs/inicio/1');
        return
      }
      else if(this.numAciertos >2 && this.numAciertos <= 4) {
        await this.db.updateCurso(1, 2);
        this.router.navigateByUrl('/tabs/inicio/2');
        return
      }
      else if(this.numAciertos >4 && this.numAciertos <= 6) {
        await this.db.updateCurso(1, 3);
        this.router.navigateByUrl('/tabs/inicio/3');
        return
      }
      else if(this.numAciertos >6 && this.numAciertos <= 8) {
        await this.db.updateCurso(1, 4);
        this.router.navigateByUrl('/tabs/inicio/4');
        return
      }
      else if(this.numAciertos == 9) {
        await this.db.updateCurso(1, 5);
        this.router.navigateByUrl('/tabs/inicio/5');
        return
      }
      else if(this.numAciertos == 10) {
        await this.db.updateCurso(1, 6);
        this.router.navigateByUrl('/tabs/inicio/6');
        return
      }
    }

    this.getEjercicioByNombre();
  }

  guardarSeleccion(event: any){
    this.opcionSeleccionada = event.target.value;
  }

  guardarPareja1(event: any){
    this.pareja1 = event.target.value;
  }

  guardarPareja2(event: any){

    if(this.numParejas === 4){
      return
    }
    this.pareja2 = event.target.value;

    //Comprobamos que la pareja1 es la correcta con la pareja2

    let resp1 = this.respuestasParejas.find( (respuesta: RespuestasParejas) => respuesta.idRespuesta === this.pareja1);
    let resp2 = this.respuestasParejas.find( (respuesta: RespuestasParejas) => respuesta.idRespuesta === this.pareja2);

    if(resp1?.esCorrecto1 === resp2?.esCorrecto2) {
      this.numParejas++;
      console.log(this.numParejas)
      console.log('Pareja correcta')

    }
    else {
      console.log('Incorrecto')
    }
  }
}