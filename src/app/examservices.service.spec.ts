import { TestBed } from '@angular/core/testing';

import { ExamservicesService } from './examservices.service';

describe('ExamservicesService', () => {
  let service: ExamservicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExamservicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
