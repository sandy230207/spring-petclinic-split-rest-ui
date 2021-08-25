import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'app/auth/auth.service';
import { ActivatedRoute, Router } from 'app/testing/router-stubs';
import { first } from 'rxjs/operators';
import { UserService } from '../user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup;
  private errorMessage: string;
  username: string;
  password: string;
  authrole: number;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService) {
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.signinForm = new FormGroup({
      username: new FormControl("admin"),
      password: new FormControl("admin"),
      auth: new FormControl("admin"),

    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';


  }


  onSubmit(data: any) {
    this.username = data.username;
    this.password = data.password;
    this.authrole = data.auth;

    console.log(data)
    console.log("This is the radio value:!!!!!!!!!!!!!" + this.authrole)

    console.log("Login page: " + this.username);
    console.log("Login page: " + this.password);

    if (this.authrole == 1) {
      this.authService.signIn(data)
        .pipe(first())
        .subscribe(data => {
          this.refreshPage()
          this.router.navigate(['/']);
        });
    
    } else {
      this.authService.signInUser(data)
        .pipe(first())
        .subscribe(data => {
          this.refreshPage()
          // this.router.navigate(['owners/appointments', 12, 'now']);

       

        });
   

    }

  }
  gotoRegister() {
    this.router.navigate(['/signup']);
  }

  gotoMain() {
    this.router.navigate(['/']);
  }
  refreshPage() {
    window.location.replace('/');
  }


}
