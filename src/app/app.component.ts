import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RandomPokemonService } from './random-pokemon.service';
import { RandomPokemon } from './random-pokemon.model';
import { NgClass, NgIf, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIf, NgClass, TitleCasePipe],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Guess the Pokemon';
  currentPokemon: RandomPokemon | null = null;
  loading = false;
  result: any | null = null;
  resultLoading: any | null = null;
  constructor(private randomPokemonService: RandomPokemonService) {}

  ngOnInit() {
    this.getRandomPokemon()
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
    console.log(id, name)
    this.randomPokemonService.checkPokemon(id, name).subscribe({
      next: (data) => {
        console.log(data)
        this.result = data;
        this.resultLoading = false;
      },
      error: (err) => {
        console.error("error", err)
        this.resultLoading = false;
      }
    })
  }
}
