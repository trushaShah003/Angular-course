import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { DataStorageService } from '../shared/dataStrorage.service';
import { Recipe } from './recipe.model';
import { Resolve } from '../shared/resolve-interface.model';

@Injectable({ providedIn: 'root' })
export class RecipeResolverService implements Resolve<Recipe[]> {
  constructor(private dataSer: DataStorageService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    console.log('Called Get Product in resolver...', route);
    return this.dataSer.onFetchRecipes();
  }
}

//  const recipeResolver: ResolveFn<Recipe[]> = (
//   route: ActivatedRouteSnapshot,
//   state: RouterStateSnapshot
// ) => {
//   return inject(RecipeResolverService)
// };
