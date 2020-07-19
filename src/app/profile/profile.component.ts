import { Component, OnInit } from '@angular/core';
import { UserLoginService } from './user-login.service';
import { User } from './dto/user';
import { FormControl } from '@angular/forms';
import { AdditionalData } from './dto/AdditionalData.1';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public msg = '';
  constructor(private userLoginService: UserLoginService) { }

  firstName = new FormControl('');
  lastName  = new FormControl('');
  userName  = new FormControl('');
  email     = new FormControl('');

  ngOnInit(): void {
  }

  register(): string{
    const user = new User();
    user.userName = this.userName.value;
    user.email = this.email.value;
    const additionalData: AdditionalData = { firstName: this.firstName.value, lastName: this.lastName.value };
    user.additionalData = additionalData;
    this.userLoginService.register(user)
    .subscribe(
      data => {
         // this.router.navigate([this.returnUrl]);
         this.msg = 'Hello id'  + data.id;
         this.userName.setValue(data.userName);
         this.email.setValue(data.email);
         this.firstName.setValue(data.additionalData.firstName);
         this.lastName.setValue(data.additionalData.lastName);
      },
      error => {
         // this.alertService.error(error);
        //  this.loading = false;
        this.msg = 'oops';
      });
    return this.msg;
    this.msg = 'register is Clicked';
    return this.msg;
  }

  getUser(): string{
    this.msg = 'getUser is Clicked';
    this.userLoginService.getById(1)
    .subscribe(
      data => {
         // this.router.navigate([this.returnUrl]);
         this.msg = 'Hello '  + data.userName;
         this.userName.setValue(data.userName);
         this.email.setValue(data.email);
         this.firstName.setValue(data.additionalData.firstName);
         this.lastName.setValue(data.additionalData.lastName);
      },
      error => {
         // this.alertService.error(error);
        //  this.loading = false;
        this.msg = 'oops';
      });
    return this.msg;
  }
}
