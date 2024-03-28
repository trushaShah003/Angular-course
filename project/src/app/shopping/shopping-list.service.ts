import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ShoppingListService {
  indexOfEdit = new Subject<number>();
  onIngChanged = new Subject<Ingredient[]>();
  // removedIng = new Subject<Ingredient[]>();

  private items: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Avacados', 3),
  ];

  getItems() {
    return this.items.slice();
  }

  updateIng(index: number, name: string, amount: number) {
    this.items[index].name = name;
    this.items[index].amount = amount;
  }

  deleteIng(index: number) {
    this.items.splice(index, 1);
    this.onIngChanged.next(this.items);
  }

  pushIngToDisplay(ing: Ingredient) {
    this.items.push(ing);
    this.onIngChanged.next(this.items);
  }

  pushIngArrayToDisplay(ings: Ingredient[]) {
    this.items.unshift(...ings);
    this.onIngChanged.next(this.items);
  }

  getIndex(id: string) {
    // this.indexOfDeleted = this.items.findIndex(
    //   (element) => element.name === id
    // );
    // if (this.indexOfDeleted !== -1) {
    //   this.items.splice(this.indexOfDeleted, 1);
    //   return this.items;
    // } else return [];
  }

  alertMsg() {
    // if (this.indexOfDeleted === -1) {
    //   if (this.items.length === 0) {
    //     alert('list is already empty!!');
    //   } else {
    //     alert('Cannot find the Ingredient! Please check the name..');
    //   }
    // }
    // if (Number.isNaN(this.indexOfDeleted)) {
    //   alert('ing already deleted');
    // }
  }
}
