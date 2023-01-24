import { TestBed } from '@angular/core/testing';

import { rolesService } from './roles.service';

describe('RolesService', () => {
  let service: rolesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(rolesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
