import { Recipe } from './recipe.model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  recipes: Recipe[] = [];
  recipeChanged = new Subject<Recipe[]>();
  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'Potato Stew',
  //     "My Mom's recipe for North Indian style mixed vegetable recipe is a family favorite, and I'm certain",
  //     'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQefZ0QRXNBXYVhTxpo7B7G0IP2toIhalm2Qg&usqp=CAU',
  //     [new Ingredient('Potato', 4), new Ingredient('Peas', 10)]
  //   ),
  //   new Recipe(
  //     'Cheesy Pasta',
  //     'it is a pasta recipe with loads of cheese !!!',
  //     'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS54lM5CcJR8v35nxeZinRE6cAt7JABt0RfdA&usqp=CAU',
  //     [new Ingredient('Pasta', 1), new Ingredient('Cheese', 100)]
  //   ),
  // ];

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipeChanged.next(recipes);
  }

  getRecipes() {
    return this.recipes;
  }

  getRecipeById(index: number) {
    return this.recipes[index];
  }

  addNewRecipe(newrecipe: Recipe) {
    console.log(this.recipes);
    console.log(newrecipe);
    this.recipes.push(newrecipe);
    this.recipeChanged.next(this.recipes);
  }

  updateRecipe(index: number, newrecipe: Recipe) {
    this.recipes[index] = newrecipe;
    this.recipeChanged.next(this.recipes);
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes);
  }
}
