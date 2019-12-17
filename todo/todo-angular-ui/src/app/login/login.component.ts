import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HardcodedAuthenticationService } from '../service/hardcoded-authentication.service';
import { BasicAuthService } from '../service/security/basic-auth.service';
import { AuthAPIService } from '../service/security/auth-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = ""
  password = ""
  errorMessage = "invalid credentials"
  invalidLogin = false

  // Dependency Injection
  constructor(
    private router: Router,
    private authAPIService : AuthAPIService
  ) { }

  ngOnInit() {
  }

  handelLogin() {
    this.authAPIService.doJwtAuth(this.username, this.password).subscribe(
      data =>{
        console.log(data)
        this.router.navigate(["welcome", this.username])
        this.invalidLogin = false
      }, 
      error => {
        console.log(error)
        this.invalidLogin = true
      }
    )
    
  }
}
