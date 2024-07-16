import { Component, OnInit } from '@angular/core';
import { DatabaseService, Ejercicios, EjerciciosParejas, EjerciciosSeleccion, Lecciones, RespuestasParejas, RespuestasSeleccion } from '../services/database.service';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-ejercicios',
  templateUrl: './ejercicios.page.html',
  styleUrls: ['./ejercicios.page.scss'],
})
export class EjerciciosPage implements OnInit {

  idLeccion: number = this.route.snapshot.params['idLeccion'];
  leccion?: Lecciones;

  ejercicios: Ejercicios[] = [];
  ejercicioSeleccion?: EjerciciosSeleccion;
  ejercicioParejas?: EjerciciosParejas;

  numEjercicio: number = 0;
  respuestasSeleccion: RespuestasSeleccion[] = [];
  respuestasParejas: RespuestasParejas[] = [];

  opcionSeleccionada: number = 0;
  numAciertos: number = 0;

  pareja1: number = 0;
  pareja2: number = 0;
  numParejas: number = 0;

  constructor(private db: DatabaseService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.db.getDatabaseState().subscribe(async ready => {
      if (ready) {

        this.leccion = await this.db.getLeccionById(this.idLeccion);
        this.ejercicios = await this.db.getEjerciciosByLeccion(this.idLeccion);
        console.log( this.ejercicios)

        this.getEjercicioByNombre();
      }
    })
  }

  async getEjercicioByNombre(){
    if( this.ejercicios[this.numEjercicio].nombre === 'Seleccion' ){
      this.ejercicioSeleccion = await this.db.getEjerciciosSeleccion(this.ejercicios[this.numEjercicio].idEjercicio);
      console.log(this.ejercicios[this.numEjercicio].idEjercicio)
      console.log(this.ejercicioSeleccion)
    }
    else{
      this.ejercicioParejas = await this.db.getEjerciciosParejas(this.ejercicios[this.numEjercicio].idEjercicio);
      console.log(this.ejercicios[this.numEjercicio].idEjercicio)
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
        this.opcionSeleccionada = 0;
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

    if((this.numEjercicio +1) >= this.ejercicios.length) {
      
      let progreso = (this.numAciertos/this.ejercicios.length)*100;

      if(progreso > this.leccion!.progreso){
        await this.db.updateProgresoLeccion(progreso, this.idLeccion);
      }

      this.router.navigateByUrl(`/resultado-test/${this.idLeccion}/${progreso}`);
      return
    }
    else {
      this.numEjercicio++;
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

      resp1!.visible1 = false;
      resp2!.visible2 = false;
      console.log(this.numParejas)
      console.log('Pareja correcta')

    }
    else {
      console.log('Incorrecto')
    }
  }

}
