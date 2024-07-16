import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResultadoTestPage } from './resultado-test.page';

describe('ResultadoTestPage', () => {
  let component: ResultadoTestPage;
  let fixture: ComponentFixture<ResultadoTestPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultadoTestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
