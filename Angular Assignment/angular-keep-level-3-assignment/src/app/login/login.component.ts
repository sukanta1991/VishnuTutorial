import { Component, OnInit } from '@angular/core';
import { FormControl , Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);

  public bearerToken: any;
  public submitMessage: string;

  constructor(private _authService: AuthenticationService,private routerService: RouterService) { }

  getUserNameErrorMessage() {
    return this.username.hasError('required') ? 'You must enter a value of username' : ' ';
  }
  getPasswordErrorMessage() {
    return this.password.hasError('required') ? 'You must enter a value of password' : ' ';
  }

    loginSubmit() {
      const user= {username:this.username.value, password:this.password.value};
        this._authService.authenticateUser(user).subscribe(
        res => {
          this.bearerToken = res['token'];
          this._authService.setBearerToken(this.bearerToken);
          this.routerService.routeToDashboard();
        },
        err => {
          this.submitMessage = err.error ? err.error.message : err.message;
        });
    }
}
