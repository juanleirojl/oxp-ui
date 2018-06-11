import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperadoraCadastroComponent } from './operadora-cadastro.component';

describe('OperadoraCadastroComponent', () => {
  let component: OperadoraCadastroComponent;
  let fixture: ComponentFixture<OperadoraCadastroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperadoraCadastroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperadoraCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
