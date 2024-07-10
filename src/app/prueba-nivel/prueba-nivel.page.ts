import { Component, OnInit } from '@angular/core';
import { DatabaseService, EjerciciosSeleccion } from '../services/database.service';

@Component({
  selector: 'app-prueba-nivel',
  templateUrl: './prueba-nivel.page.html',
  styleUrls: ['./prueba-nivel.page.scss'],
})
export class PruebaNivelPage implements OnInit {

  ejercicios: EjerciciosSeleccion[] = [];
  constructor(private db: DatabaseService) { }

  ngOnInit() {
    this.db.getDatabaseState().subscribe(ready => {
      if (ready) {
        this.db.getEjercicios().then(ejercicios => {
          this.ejercicios = ejercicios;
          console.log(ejercicios)
        });
      }
    })
  }

}
