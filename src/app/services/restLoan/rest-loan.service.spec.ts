import { TestBed } from '@angular/core/testing';

import { RestLoanService } from './rest-loan.service';

describe('RestLoanService', () => {
  let service: RestLoanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestLoanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});