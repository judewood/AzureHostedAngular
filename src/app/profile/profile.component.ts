import { Component, OnInit } from '@angular/core';
import { UserLoginService } from './user-login.service';
import { User } from './dto/user';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import {FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  angForm!: FormGroup;
  public msg = '';

  
  //public firstName = new FormControl('');
  //public lastName  = new FormControl('');
  public username  = new FormControl('', [Validators.required]);
  public password     = new FormControl('', [Validators.required]);
  public message: string = ' my messgae';
 
  
  matcher = new MyErrorStateMatcher();
  
  constructor(private userLoginService: UserLoginService, private fb: FormBuilder) {
    this.createForm();
   }

  
   createForm() {
    this.angForm = this.fb.group({
      password: [''],
      username: ['']
    });
  }

  onClickRegister(password: string, username: string) {
    alert('R Your username is : ' + username);
  }
  onClickLogin(password: string, username: string) {
    alert('L Your username is : ' + username);
  }

  ngOnInit(): void {
  
  }

  register(): string{
    const user = new User();
    user.username = this.username.value;
    user.password = this.password.value;
    this.userLoginService.register(user)
    .subscribe(
      data => {
         this.msg = 'Hello '  + data.userProfile.username;
         this.username.setValue(data.userProfile.username);
         this.password.setValue(data.userProfile.email);
      },
      error => {
        this.msg = error.error.apiFeedback.explanation;
      });
    return this.msg;
  }

  login(): string{
    const user = new User();
    user.username = this.username.value;
    user.password = this.password.value;
    this.userLoginService.login(user)
    .subscribe(
      data => {
         this.msg = 'Welcome back '  + data.userProfile.username;
         this.username.setValue(data.userProfile.username);
      },
      error => {
        this.msg = error.error.apiFeedback.explanation;
      });
    return this.msg;
  }
}
