import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private router: Router,
    private authenticationService: AuthService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUser) {
        this.router.navigate(['/']);
    }

    this.loginForm = new FormGroup(
      {
        username: new FormControl("", [Validators.required]),
      }
    );
  }

  ngOnInit() {}

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.authenticationService.login(this.loginForm.value.username);
  }
}