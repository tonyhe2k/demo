import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
  returnUrl: string

  // Dependency Injection
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authAPIService : AuthAPIService
  ) { }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  handelLogin() {
    this.authAPIService.doJwtAuth(this.username, this.password).subscribe(
      data =>{
        console.log(this.returnUrl)
        
        if(this.returnUrl === '/') {
          this.router.navigate(["welcome", this.username])
        } else {
          this.router.navigateByUrl(this.returnUrl);
        }
        this.invalidLogin = false
      }, 
      error => {
        console.log(error)
        this.invalidLogin = true
      }
    )
    
  }
}
