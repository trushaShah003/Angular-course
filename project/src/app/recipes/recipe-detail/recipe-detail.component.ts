import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { DropDownDirective } from '../../shared/dropdown.directive';
import { NgFor } from '@angular/common';
import { ShoppingListService } from '../../shopping/shopping-list.service';
import {
  ActivatedRoute,
  Params,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-details',
  standalone: true,
  imports: [DropDownDirective, NgFor, RouterLink, RouterLinkActive],
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css',
})
export class RecipeDeatilsComponent implements OnInit {
  recipe: Recipe;
  recipeId: number;

  constructor(
    private slSer: ShoppingListService,
    private route: ActivatedRoute,
    private recipeSer: RecipeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.recipeId = params['id'];
      this.recipe = this.recipeSer.getRecipeById(params['id']);
    });
    // this.route.data.subscribe((response: any) => {
    //   this.recipe = response.recipes[this.recipeId];
    // });
    // console.log(this.recipeId);
  }

  onToShopList() {
    // this.holderSer.holderSelected.emit('shopping');
    this.router.navigate(['/shopping-list']);
    this.slSer.pushIngArrayToDisplay(this.recipe.ingredients);
  }

  onDelete() {
    this.recipeSer.deleteRecipe(this.recipeId);
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
