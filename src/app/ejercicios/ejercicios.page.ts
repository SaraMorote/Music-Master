import { Component, OnInit, ViewChild } from '@angular/core';
import { DatabaseService, Ejercicios, EjerciciosParejas, EjerciciosSeleccion, Lecciones, RespuestasParejas, RespuestasSeleccion } from '../services/database.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { IonModal, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-ejercicios',
  templateUrl: './ejercicios.page.html',
  styleUrls: ['./ejercicios.page.scss'],
})
export class EjerciciosPage implements OnInit {

  @ViewChild('modalAcierto') modalAcierto?: IonModal;
  @ViewChild('modalError') modalError?: IonModal;

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

  selectedValue: any;
  selectedValue2: any;

  constructor(private db: DatabaseService, private router: Router, private route: ActivatedRoute,  private toastController: ToastController) { }

  ngOnInit() {
    this.db.getDatabaseState().subscribe(async ready => {
      if (ready) {

        this.leccion = await this.db.getLeccionById(this.idLeccion);
        this.ejercicios = (await this.db.getEjerciciosByLeccion(this.idLeccion))
          .map( value => ({ value, sort: Math.random() } ))
          .sort((a, b) => a.sort - b.sort )
          .map(({value}) => value);

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
    if((this.numEjercicio +1) >= 5) {

      let progreso = (this.numAciertos/5)*100;

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

  guardarSeleccion(id: number){
    this.opcionSeleccionada = id;
  }

  guardarPareja1(id: number){
    this.pareja1 = id;
    this.respuestasParejas.find( (respuesta: RespuestasParejas) => respuesta.idRespuesta === id)!.select1 = true;
  }

  guardarPareja2(id: number){

    if(this.numParejas === 4){
      return
    }
    this.pareja2 = id;

    //Comprobamos que la pareja1 es la correcta con la pareja2

    let resp1 = this.respuestasParejas.find( (respuesta: RespuestasParejas) => respuesta.idRespuesta === this.pareja1);
    let resp2 = this.respuestasParejas.find( (respuesta: RespuestasParejas) => respuesta.idRespuesta === this.pareja2);

    resp2!.select2 = false;

    if(resp1?.esCorrecto1 === resp2?.esCorrecto2) {
      this.numParejas++;

      resp1!.visible1 = false;
      resp2!.visible2 = false;

      this.presentToastAcierto('bottom');

    }
    else {
      this.deselectRadios(resp1!, resp2!);
      this.presentToastError('bottom');
    }
  }

  async presentToastAcierto(position: 'bottom') {
    const toast = await this.toastController.create({
      message: 'Correcto',
      duration: 1500,
      position: position,
      cssClass: 'toastAcierto'
    });

    await toast.present();
  }

  async presentToastError(position: 'bottom') {
    const toast = await this.toastController.create({
      message: 'Inténtalo de nuevo',
      duration: 1500,
      position: position,
      cssClass: 'toastError'
    });

    await toast.present();
  }

  deselectRadios(resp1: RespuestasParejas, resp2: RespuestasParejas) {
    resp1.select1 = false;
    resp2.select2 = false;
  }

}