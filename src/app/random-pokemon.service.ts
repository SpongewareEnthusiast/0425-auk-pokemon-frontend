import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
// export interface RandomPokemon {
//   name: string,
//   id: number,
//   image: URL,
//   guesses: Array<string>
// }
export class RandomPokemonService {
  private randomPokemonAPIURL = "http://localhost:8000/random-pokemon"
  private checkPokemonAPIURL = "http://localhost:8000/validate-answer"
  constructor(private http: HttpClient) { }
  getRandomPokemon(): Observable<any> {
    return this.http.get(this.randomPokemonAPIURL)
  }

  checkPokemon(id: number, name: string): Observable<any> {
    return this.http.get(this.checkPokemonAPIURL + `?id=${id}&name=${name}`)
  }
}
