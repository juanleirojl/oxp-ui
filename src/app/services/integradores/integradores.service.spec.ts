import { TestBed, inject } from '@angular/core/testing';

import { IntegradoresService } from './integradores.service';

describe('IntegradoresService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IntegradoresService]
    });
  });

  it('should be created', inject([IntegradoresService], (service: IntegradoresService) => {
    expect(service).toBeTruthy();
  }));
});
