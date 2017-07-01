import { TestBed, inject } from '@angular/core/testing';

import { DatabaseApiService } from './database-api.service';

describe('DatabaseApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DatabaseApiService]
    });
  });

  it('should be created', inject([DatabaseApiService], (service: DatabaseApiService) => {
    expect(service).toBeTruthy();
  }));
});
