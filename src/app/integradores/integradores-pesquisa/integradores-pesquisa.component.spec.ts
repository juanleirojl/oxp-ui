import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntegradoresPesquisaComponent } from './integradores-pesquisa.component';

describe('IntegradoresPesquisaComponent', () => {
  let component: IntegradoresPesquisaComponent;
  let fixture: ComponentFixture<IntegradoresPesquisaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntegradoresPesquisaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntegradoresPesquisaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
