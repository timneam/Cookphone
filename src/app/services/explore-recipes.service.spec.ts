import { TestBed } from '@angular/core/testing';

import { ExploreRecipesService } from './explore-recipes.service';

describe('ExploreRecipesService', () => {
  let service: ExploreRecipesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExploreRecipesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
