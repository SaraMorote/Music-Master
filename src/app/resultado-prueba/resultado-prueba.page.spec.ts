import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResultadoPruebaPage } from './resultado-prueba.page';

describe('ResultadoPruebaPage', () => {
  let component: ResultadoPruebaPage;
  let fixture: ComponentFixture<ResultadoPruebaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultadoPruebaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
