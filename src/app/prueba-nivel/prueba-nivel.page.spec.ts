import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PruebaNivelPage } from './prueba-nivel.page';

describe('PruebaNivelPage', () => {
  let component: PruebaNivelPage;
  let fixture: ComponentFixture<PruebaNivelPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PruebaNivelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
