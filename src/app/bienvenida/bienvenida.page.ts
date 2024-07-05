import { Component, OnInit } from '@angular/core';
import { InicioPage } from '../inicio/inicio.page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.page.html',
  styleUrls: ['./bienvenida.page.scss'],
})
export class BienvenidaPage implements OnInit {

  component = InicioPage;

  constructor(private router: Router) { 

  }

  ngOnInit() {
  }

  mostrarPagina(){
    this.router.navigate(['inicio']);
  }
}
