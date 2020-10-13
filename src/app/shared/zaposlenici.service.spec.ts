import { TestBed } from '@angular/core/testing';

import { ZaposleniciService } from './zaposlenici.service';

describe('ZaposleniciService', () => {
  let service: ZaposleniciService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZaposleniciService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
