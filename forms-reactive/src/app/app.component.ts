import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

interface UserData {
  username: string;
  email: string;
  gender: 'male' | 'other' | 'female';
  hobbies: string[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  genders = ['male', 'female', 'other'];
  form: FormGroup;
  invalidNames = ['Chris', 'Anna'];
  data: UserData[] = [];

  ngOnInit(): void {
    this.form = new FormGroup({
      userData: new FormGroup({
        username: new FormControl(null, [
          Validators.required,
          this.forbiddenNames.bind(this),
        ]),
        email: new FormControl(
          null,
          [Validators.required, Validators.email],
          this.forbiddenEmail
        ),
      }),
      gender: new FormControl('female'),
      hobbies: new FormArray([]),
    });
    this.form.patchValue({ userData: { email: 'example@abc.com' } });
  }

  onAddHobbies() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.form.get('hobbies')).push(control);
    // console.log(this.form.get('hobbies'));
  }

  onSubmit() {
    console.log(this.form);
    this.data.push({
      username: this.form.get('userData.username').value,
      email: this.form.get('userData.email').value,
      gender: this.form.get('gender').value,
      hobbies: this.form.get('hobbies').value,
    });
    this.form.reset({
      username: '',
      email: 'example@abc.com',
      gender: 'female',
      hobbies: [],
    });
    this.getControls('hobbies').pop();
    // console.log(this.form.get('userData.username').errors.required);
  }

  getControls(control: string) {
    return (<FormArray>this.form.get(control)).controls;
  }

  forbiddenNames(control: FormControl): { [s: string]: boolean } {
    if (this.invalidNames.indexOf(control.value) !== -1) {
      return { forbiddenNames: true };
    } else return null;
  }

  forbiddenEmail(control: FormControl): Promise<any> | Observable<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'example@abc.com') {
          resolve({ emailIsForbidden: true });
        } else {
          resolve(null);
        }
      }, 1500);
    });
  }
}
