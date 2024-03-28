import { Component, Input } from '@angular/core';
import { Recipe } from '../../recipe.model';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';

@Component({
  selector: 'app-recipe-item',
  standalone: true,
  imports: [RouterLinkActive, RouterLink],
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.css',
})
export class RecipeItemComponent {
  @Input() recipeData: Recipe;
  @Input() index: number;

  constructor(private router: Router, private route: ActivatedRoute) {}

  onClickRecipe() {
    console.log(this.recipeData, this.index);
    this.router.navigate([this.index], { relativeTo: this.route });
  }
}
