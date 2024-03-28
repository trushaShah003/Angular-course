import { Component, OnInit } from '@angular/core';
import { RecipeItemComponent } from './recipe-item/recipe-item.component';
import { Recipe } from '../recipe.model';
import { CommonModule, NgFor } from '@angular/common';
import { RecipeService } from '../recipe.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [RecipeItemComponent, CommonModule, NgFor],
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css',
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[];

  constructor(private recipeSer: RecipeService, private router: Router) {}

  ngOnInit(): void {
    this.recipeSer.recipeChanged.subscribe((recipeArr: Recipe[]) => {
      this.recipes = recipeArr;
      // console.log(this.recipes);
    });
    this.recipes = this.recipeSer.getRecipes();
  }

  onNewRecipe() {
    this.router.navigate(['/recipes', 'new']);
  }
}
