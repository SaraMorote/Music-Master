import { Component, OnInit } from '@angular/core';
import { Apuntes, DatabaseService, Lecciones } from '../services/database.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-apuntes',
  templateUrl: './apuntes.page.html',
  styleUrls: ['./apuntes.page.scss'],
})
export class ApuntesPage implements OnInit {

  apuntes?: Apuntes;
  leccion?: Lecciones;
  idLeccion: number = this.route.snapshot.params['idLeccion'];

  constructor(private db: DatabaseService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.db.getDatabaseState().subscribe(async ready => {
      if (ready) {

        this.apuntes = await this.db.getApuntesByLeccion(this.idLeccion);
        this.leccion = await this.db.getLeccionById(this.idLeccion);
      }
    })
  }

}
