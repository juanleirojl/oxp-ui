import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntegradoresCadastroComponent } from './integradores-cadastro.component';

describe('IntegradoresCadastroComponent', () => {
  let component: IntegradoresCadastroComponent;
  let fixture: ComponentFixture<IntegradoresCadastroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntegradoresCadastroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntegradoresCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
