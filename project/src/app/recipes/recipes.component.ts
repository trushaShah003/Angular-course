import { Component, OnInit } from '@angular/core';

import { RecipeDeatilsComponent } from './recipe-detail/recipe-detail.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { CommonModule, NgFor } from '@angular/common';

import { DropDownDirective } from '../shared/dropdown.directive';

import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [
    RecipeDeatilsComponent,
    RecipeListComponent,
    CommonModule,
    NgFor,
    DropDownDirective,
    RouterOutlet,
  ],
  providers: [RouterLink, RouterLinkActive],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css',
})
export class RecipesComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
