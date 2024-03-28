import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { exhaustMap, map, take, tap } from 'rxjs';
import { AuthService } from '../auth/auth/auth.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeSer: RecipeService,
    private authSer: AuthService
  ) {}

  onSaveRecipeToData() {
    const recipes = this.recipeSer.getRecipes();
    this.http
      .put(
        'https://recipe-book-61d20-default-rtdb.firebaseio.com/recipes.json',
        recipes
      )
      .subscribe();
  }

  onFetchRecipes() {
    return this.authSer.user.pipe(
      take(1),
      exhaustMap((user) => {
        console.log(user, '🔴', user?.token, '🔴', user?.tokenExp);
        return this.http.get<Recipe[]>(
          'https://recipe-book-61d20-default-rtdb.firebaseio.com/recipes.json',
          {
            params: new HttpParams().append('auth', user?.token!),
          }
        );
      }),
      map((recipes) => {
        return recipes.map((recipe) => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : [],
          };
        });
      }),
      tap((recipes) => {
        this.recipeSer.setRecipes(recipes);
      })
    );
    // return this.authSer.user.pipe(
    //   take(1),
    //   exhaustMap((user) => {
    //     return this.http.get<Recipe[]>(
    //       `https://recipe-book-61d20-default-rtdb.firebaseio.com/recipes.json`,
    //       {
    //         params: new HttpParams().set('auth', user?.token!),
    //       }
    //     );
    //   }),
    //   map((recipes: Recipe[]) => {
    //     return recipes.map((recipe) => {
    //       return {
    //         ...recipe,
    //         ingredients: recipe.ingredients ? recipe.ingredients : [],
    //       };
    //     });
    //   }),
    //   tap((recipes) => {
    //     this.recipeSer.setRecipes(recipes);
    //   })
    // );
    /////////////////////////////////////////////////////////////////////////////
    // return this.http
    //   .get<Recipe[]>(
    //     'https://recipe-book-61d20-default-rtdb.firebaseio.com/recipes.json'
    //   )
    //   .pipe(
    //     map((recipes) => {
    //       return recipes.map((recipe) => {
    //         return {
    //           ...recipe,
    //           ingredients: recipe.ingredients ? recipe.ingredients : [],
    //         };
    //       });
    //     }),
    //     tap((recipes) => {
    //       this.recipeSer.setRecipes(recipes);
    //     })
    //   );
  }
}
