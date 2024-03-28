import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authSer: AuthService
  ) {}

  ngOnInit() {
    // this.router.navigate(['/']);
  }

  onLogin() {
    this.authSer.login();
    this.selectBtn('login');
  }

  onLogout() {
    this.authSer.logout();
    this.selectBtn('logout');
  }

  selectBtn(classname: string) {
    const btn = document.querySelector(`.${classname}`)! as HTMLButtonElement;
    const btnOpp = document.querySelector(
      `.${classname === 'login' ? 'logout' : 'login'}`
    )! as HTMLButtonElement;
    btn.classList.remove('btn-default');
    btn.classList.add('btn-primary');
    btnOpp.classList.remove('btn-primary');
  }
}
