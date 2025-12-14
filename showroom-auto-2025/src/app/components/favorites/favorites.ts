import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Auto } from '../../interfaces/auto';
import { CommonModule, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-favorites',
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './favorites.html',
  styleUrl: './favorites.css'
})
export class Favorites {
  @Input() favoriteAutos: Auto[] = [];
  @Output() onRemoveFavorite = new EventEmitter<number>();
  @Output() onSelectAuto = new EventEmitter<Auto>();

  removeFavorite(id: number) {
    this.onRemoveFavorite.emit(id);
  }

  selectAuto(auto: Auto) {
    this.onSelectAuto.emit(auto);
  }
}
