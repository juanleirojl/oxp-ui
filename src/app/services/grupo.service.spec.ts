import { TestBed, inject } from '@angular/core/testing';

import { GrupoService } from './grupo.service';

describe('GrupoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GrupoService]
    });
  });

  it('should be created', inject([GrupoService], (service: GrupoService) => {
    expect(service).toBeTruthy();
  }));
});
