import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { Subscription } from 'rxjs';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-shopping-list-edit',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './shopping-list-edit.component.html',
  styleUrl: './shopping-list-edit.component.css',
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') form: NgForm;
  subscription: Subscription;
  editMode = false;
  editedIng: number;

  constructor(private slSer: ShoppingListService) {}
  ngOnInit(): void {
    this.subscription = this.slSer.indexOfEdit.subscribe((index: number) => {
      this.editMode = true;
      this.editedIng = index;
      this.form.setValue({
        ing: this.slSer.getItems()[index].name,
        amount: this.slSer.getItems()[index].amount,
      });
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSubmit() {
    const value = this.form.value;
    if (!this.editMode) {
      this.slSer.pushIngToDisplay(new Ingredient(value.ing, +value.amount));
    }
    if (this.editMode) {
      this.slSer.updateIng(this.editedIng, value.ing, +value.amount);
    }

    this.onClear();
  }

  onClear() {
    this.form.reset();
    this.editMode = false;
  }

  onDelete() {
    //////before forms:::::
    //   const nameId = this.nameInputRef.nativeElement.value;
    //   this.slSer.removedIng.next(this.slSer.getIndex(nameId));
    //   this.onClear();

    this.slSer.deleteIng(this.editedIng);
    this.onClear();
  }
}
