import { TestBed, inject } from '@angular/core/testing';

import { OperadoraService } from './operadora.service';

describe('OperadoraService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OperadoraService]
    });
  });

  it('should be created', inject([OperadoraService], (service: OperadoraService) => {
    expect(service).toBeTruthy();
  }));
});
