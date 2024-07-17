import { Component, OnInit, ViewChild } from '@angular/core';
import { DatabaseService, Ejercicios, RespuestasSeleccion, RespuestasParejas, EjerciciosSeleccion, EjerciciosParejas } from '../services/database.service';
import { Router } from '@angular/router';
import { IonModal, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-prueba-nivel',
  templateUrl: './prueba-nivel.page.html',
  styleUrls: ['./prueba-nivel.page.scss'],
})
export class PruebaNivelPage implements OnInit {

  @ViewChild('modalAcierto') modalAcierto?: IonModal;
  @ViewChild('modalError') modalError?: IonModal;

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

  selectedValue: any;
  selectedValue2: any;

  constructor(private db: DatabaseService, private router: Router, private toastController: ToastController) { }

  ngOnInit() {
    this.db.getDatabaseState().subscribe(async ready => {
      if (ready) {

        this.ejercicios = await this.db.getEjerciciosByLeccion(0);

        this.getEjercicioByNombre();
      }
    })
  }

  async getEjercicioByNombre(){
    if( this.ejercicios[this.numEjercicio].nombre === 'Seleccion' ){
      this.ejercicioSeleccion = await this.db.getEjerciciosSeleccion(this.ejercicios[this.numEjercicio].idEjercicio);
    }
    else{
      this.ejercicioParejas = await this.db.getEjerciciosParejas(this.ejercicios[this.numEjercicio].idEjercicio);
    }

    this.getRespuestaByEjercicio(this.ejercicios[this.numEjercicio].idEjercicio);
  }

  async getRespuestaByEjercicio(idEjercicio: number){

    if(this.ejercicios[this.numEjercicio].nombre == "Seleccion"){
      this.respuestasSeleccion = await this.db.getRespuestasSeleccionByEjercicio(idEjercicio)
    }
    else {
      this.respuestasParejas = await this.db.getRespuestasParejasByEjercicio(idEjercicio)

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

        this.modalAcierto?.present();
      }
      else{
        // Mostrar modal rojo
        this.modalError?.present();
      }
    }
    else {
      this.numAciertos++;
      this.numParejas = 0;
      this.confirm();
    }

    
  }

  async confirm() {
    if((this.numEjercicio +1) >= this.ejercicios.length) {
      //Calcular curso
      if(this.numAciertos <= 2){
        await this.db.updateCurso(1, 1);
        this.router.navigateByUrl(`/resultado-prueba/${this.numAciertos}/1`);
        return
      }
      else if(this.numAciertos >2 && this.numAciertos <= 4) {
        await this.db.updateCurso(1, 2);
        this.router.navigateByUrl(`/resultado-prueba/${this.numAciertos}/2`);
        return
      }
      else if(this.numAciertos >4 && this.numAciertos <= 6) {
        await this.db.updateCurso(1, 3);
        this.router.navigateByUrl(`/resultado-prueba/${this.numAciertos}/3`);
        return
      }
      else if(this.numAciertos >6 && this.numAciertos <= 8) {
        await this.db.updateCurso(1, 4);
        this.router.navigateByUrl(`/resultado-prueba/${this.numAciertos}/4`);
        return
      }
      else if(this.numAciertos == 9) {
        await this.db.updateCurso(1, 5);
        this.router.navigateByUrl(`/resultado-prueba/${this.numAciertos}/5`);
        return
      }
      else if(this.numAciertos == 10) {
        await this.db.updateCurso(1, 6);
        this.router.navigateByUrl(`/resultado-prueba/${this.numAciertos}/6`);
        return
      }
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

      this.presentToastAcierto('bottom');

    }
    else {
      this.deselectRadios();
      this.presentToastError('bottom');
    }
  }

  async presentToastAcierto(position: 'bottom') {
    console.log('hola')
    const toast = await this.toastController.create({
      message: 'Correcto',
      duration: 1500,
      position: position,
      cssClass: 'toastAcierto'
    });

    await toast.present();
  }

  async presentToastError(position: 'bottom') {
    console.log('adios')
    const toast = await this.toastController.create({
      message: 'Inténtalo de nuevo',
      duration: 1500,
      position: position,
      cssClass: 'toastError'
    });

    await toast.present();
  }

  deselectRadios() {
    this.selectedValue = null;
    this.selectedValue2 = null;
  }
  
}