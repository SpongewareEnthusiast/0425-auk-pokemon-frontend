import { TestBed } from '@angular/core/testing';

import { RandomPokemonService } from './random-pokemon.service';

describe('RandomPokemonService', () => {
  let service: RandomPokemonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RandomPokemonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
