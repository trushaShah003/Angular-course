import { Component, OnDestroy, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthResponseData, AuthService } from './auth.service';
import { NgIf } from '@angular/common';
import { LoadingSpinnerComponent } from '../../shared/loading-spinner/loading-spinner.component';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../../shared/alert/alert.component';
import { PlaceHolderDirective } from '../../shared/placeholder/placeholder.directive';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    LoadingSpinnerComponent,
    AlertComponent,
    PlaceHolderDirective,
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent implements OnDestroy {
  isInLoginMode = true;
  isLoading = false;
  error = null;
  @ViewChild(PlaceHolderDirective, { static: false })
  alertHost: PlaceHolderDirective;

  private closeSub: Subscription;

  constructor(private authSer: AuthService, private router: Router) {}

  switchModes() {
    this.isInLoginMode = !this.isInLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;
    this.isLoading = true;

    if (this.isInLoginMode) {
      // Sign in / Login Logic
      authObs = this.authSer.login(email, password);
    } else {
      // Sign Up Logic
      authObs = this.authSer.signUp(email, password);
    }

    // subscribing to the observable
    authObs.subscribe(
      (response) => {
        // console.log(response);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      (errorRes) => {
        console.log(errorRes);
        this.error = errorRes;
        this.showError(errorRes);
        this.isLoading = false;
      }
    );

    form.reset();
  }

  onHandleError() {
    this.error = null;
  }

  ngOnDestroy(): void {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }

  private showError(message: string) {
    const hostcontref = this.alertHost.viewCompRef;

    hostcontref.clear();
    const compRef = hostcontref.createComponent(AlertComponent);

    compRef.instance.message = message;
    this.closeSub = compRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostcontref.clear();
    });
  }
}
