import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RandomPokemonService } from './random-pokemon.service';
import { RandomPokemon } from './random-pokemon.model';
import { NgOptimizedImage, CommonModule} from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, NgOptimizedImage],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Guess the Pokemon';
  currentPokemon: RandomPokemon | null = null;
  loading = false;
  result: any | null = null;
  resultLoading: any | null = null;
  score: number = 0
  scoreArray: string[] = [" ⬜️ "," ⬜️" ," ⬜️ "," ⬜️ "," ⬜️ "," ⬜️ "," ⬜️ "," ⬜️ "," ⬜️ "," ⬜️ "];
  attempts: number = 0;
  constructor(private randomPokemonService: RandomPokemonService) {}

  ngOnInit() {
   this.initialiseScore();
    this.getRandomPokemon()
  }
  initialiseScore() {
    this.score = 0;
    this.attempts = 0;
    this.scoreArray= [" ⬜️ "," ⬜️" ," ⬜️ "," ⬜️ "," ⬜️ "," ⬜️ "," ⬜️ "," ⬜️ "," ⬜️ "," ⬜️ "];

  }
  getRandomPokemon() {
    this.result = null;
    this.loading = true;
    this.randomPokemonService.getRandomPokemon().subscribe({
      next: (data) => {
        console.log(data)
        this.currentPokemon = data;
        this.loading = false;
      },
      error: (err) => {
        console.error("error", err)
        this.loading = false;
      }
    })
  }
  checkPokemon(id: number, name: string) {
    this.resultLoading = true;
    this.randomPokemonService.checkPokemon(id, name).subscribe({
      next: (data) => {
        this.attempts++;
        this.result = data;
        this.resultLoading = false;
        if (this.result.is_correct) {
          this.score++;
          this.scoreArray[this.attempts-1]=(" ✅ ")
        } else {
          this.scoreArray[this.attempts-1]=(" ❌ ")
        }
        if (this.score == 7) {
          this.initialiseScore();
          alert('You won! 🥳')
        }
        if (this.attempts == 10) {
          this.initialiseScore();
          alert("You lost 🥹")
        }
      },
      error: (err) => {
        console.error("error", err)
        this.resultLoading = false;
      }
    })
  }
}
