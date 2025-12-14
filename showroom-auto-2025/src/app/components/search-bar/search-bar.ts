import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Auto } from '../../interfaces/auto';
import { CurrencyPipe, NgClass, NgStyle } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-search-bar',
  imports: [CurrencyPipe, NgClass, NgStyle, FormsModule],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.css'
})
export class SearchBar {
  @Input() autos: Auto[] = [];
  @Input() favoriteAutos: Auto[] = [];
  @Input() favoritesCount: number = 0;

  @Output() onSelectAuto = new EventEmitter<Auto>();
  @Output() onAddFavorite = new EventEmitter<Auto>();
  @Output() onToggleFavorites = new EventEmitter<void>();

  selectedAutos: Auto[] = [];
  showFilters = false;
  minPrice?: number;
  maxPrice?: number;
  minPower?: number;
  inStockOnly = false;

  selectAutoList(brand: string) {
    this.selectedAutos = this.autos.filter(x =>
      x.brand.toLowerCase().startsWith(brand.toLowerCase()));
    this.applyFilters();
  }

  showDetails(auto: Auto) {
    this.onSelectAuto.emit(auto);
  }

  addFavorite(auto: Auto) {
    this.onAddFavorite.emit(auto);
  }

  toggleFavorites() {
    this.onToggleFavorites.emit();
  }

  toggleFilters() {
    this.showFilters = !this.showFilters;
  }

  applyFilters() {
    let list = this.autos;
    if (this.minPrice != null) {
      list = list.filter(a => a.price >= (this.minPrice as number));
    }
    if (this.maxPrice != null) {
      list = list.filter(a => a.price <= (this.maxPrice as number));
    }
    if (this.minPower != null) {
      list = list.filter(a => a.power >= (this.minPower as number));
    }
    if (this.inStockOnly) {
      list = list.filter(a => a.availability > 0);
    }
    this.selectedAutos = list;
  }

  isFavorite(autoId: number): boolean {
    return this.favoriteAutos.some(fav => fav.id === autoId);
  }

  autoTitleStyle(auto: Auto) {
    if (auto.power >= 10)
      return { 'color': 'red' }
  else
    return {'color':'black'}
}
}
