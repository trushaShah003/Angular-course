import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild('f') signupForm: NgForm;
  defaultQue = 'pet';
  answerIn: string = '';
  genders = ['male', 'female', 'other'];
  user = {
    username: '',
    email: '',
    secretQ: '',
    answer: '',
    gender: '',
  };
  submitted = false;

  suggestUserName() {
    const suggestedName = 'Superuser';
    // this.signupForm.setValue({
    //   userData: { username: suggestedName, email: 'example@abc.com' },
    //   secret: 'pet',
    //   answer: '',
    //   gender: 'female',
    // });
    this.signupForm.form.patchValue({
      userData: { username: suggestedName },
    });
  }

  // onSubmit(form: NgForm) {
  //   console.log(form);
  // }

  onSubmit() {
    this.submitted = true;
    this.user.username = this.signupForm.value.userData.username;
    this.user.email = this.signupForm.value.userData.email;
    this.user.secretQ = this.signupForm.value.secret;
    this.user.answer = this.signupForm.value.answer;
    this.user.gender = this.signupForm.value.gender;
    this.signupForm.reset();
  }
}
