import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperadoraPesquisaComponent } from './operadora-pesquisa.component';

describe('OperadoraPesquisaComponent', () => {
  let component: OperadoraPesquisaComponent;
  let fixture: ComponentFixture<OperadoraPesquisaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperadoraPesquisaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperadoraPesquisaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
