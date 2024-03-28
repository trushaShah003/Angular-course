import { Component, OnDestroy, OnInit } from '@angular/core';
import { DropDownDirective } from '../shared/dropdown.directive';
import { HolderService } from '../shared/holder.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { RecipeService } from '../recipes/recipe.service';
import { DataStorageService } from '../shared/dataStrorage.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth/auth.service';
import { NgIf } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [DropDownDirective, RouterLink, RouterLinkActive, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  subscription: Subscription;

  constructor(
    private dataSer: DataStorageService,
    private authSer: AuthService
  ) {}

  ngOnInit(): void {
    this.subscription = this.authSer.user.subscribe((user) => {
      this.isAuthenticated = !!user;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSave() {
    this.dataSer.onSaveRecipeToData();
  }

  onFetch() {
    this.dataSer.onFetchRecipes().subscribe();
  }

  onLogout() {
    this.authSer.logout();
  }
}
