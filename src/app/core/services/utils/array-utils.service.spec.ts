import { TestBed } from '@angular/core/testing';

import { ArrayUtilsService } from './array-utils.service';

describe('ArrayUtilsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArrayUtilsService = TestBed.get(ArrayUtilsService);
    expect(service).toBeTruthy();
  });
});
