import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RandomPokemon {
  name: string,
  id: number,
  image: URL,
  guesses: Array<string>
}
export interface ValidatedAnswer {
  is_correct: boolean;
  correct_name: string;
  image: string;
}
@Injectable({
  providedIn: 'root'
})
export class RandomPokemonService {
  private randomPokemonAPIURL = "http://localhost:8000/random-pokemon"
  private checkPokemonAPIURL = "http://localhost:8000/validate-answer"
  constructor(private http: HttpClient) { }
  getRandomPokemon(): Observable<RandomPokemon> {
    return this.http.get<RandomPokemon>(this.randomPokemonAPIURL)
  }

  checkPokemon(id: number, name: string): Observable<any> {
    return this.http.get<ValidatedAnswer>(this.checkPokemonAPIURL + `?id=${id}&name=${name}`)
  }
}
