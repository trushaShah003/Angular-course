import {
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';

import { ShoppingListEditComponent } from './shopping-list-edit/shopping-list-edit.component';
import { Ingredient } from '../shared/ingredient.model';
import { NgFor } from '@angular/common';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-shopping',
  standalone: true,
  imports: [ShoppingListEditComponent, NgFor, FormsModule],
  // providers: [ShoppingListService],
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css',
})
export class ShoppingListComponent implements OnInit, OnChanges, OnDestroy {
  items: Ingredient[];
  changeSub: Subscription;
  removeSub: Subscription;

  constructor(private slSer: ShoppingListService) {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log('change detected');
  }

  ngOnInit(): void {
    this.items = this.slSer.getItems();

    // // if any new ingredient is added using forms
    this.changeSub = this.slSer.onIngChanged.subscribe((ings: Ingredient[]) => {
      this.items = ings;
    });
  }

  onEditItem(index: number) {
    this.slSer.indexOfEdit.next(index);
  }

  ngOnDestroy(): void {
    console.log('ondestroy');
    this.changeSub.unsubscribe();
    // this.removeSub.unsubscribe();
  }
}
