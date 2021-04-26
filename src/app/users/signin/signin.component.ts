import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'app/auth/auth.service';
import { Router } from 'app/testing/router-stubs';
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

  constructor(private router: Router,private userService: UserService,private authService: AuthService) { }

  ngOnInit() {
    this.signinForm = new FormGroup({
      username: new FormControl("admin"),
      password: new FormControl("admin"),
    });
  //   this.signinForm = this.formBuilder.group({
  //     identityId: ['', Validators.required],
  //     password: ['', [Validators.required, Validators.minLength(6)]],
  // });
  }
  onSubmit(data: any) {
    this.username = data.username;
    this.password = data.password;
    console.log(data)

    console.log("Login page: " + this.username);
    console.log("Login page: " + this.password);

    this.userService.signIn(data)
       .subscribe( data => { 
          console.log("Is Login Success: " + data);
          if(data)
            this.router.navigate(['/appointment']);
          else
            this.router.navigate(['/']);
          
        });
  }
 
  // onSubmit(data: any) {
  //   this.userName = data.userName;
  //   this.password = data.password;

  //   console.log("Login page: " + this.userName);
  //   console.log("Login page: " + this.password);

  //   this.authService.signin(this.userName, this.password)
  //      .subscribe( data => { 
  //         console.log("Is Login Success: " + data);
  //         if(data)
  //           this.router.navigate(['/']);
  //         else
  //           this.router.navigate(['/appointment']);
          
  //       });
  // }
  gotoRegister(){
    this.router.navigate(['/signup']);
  }

  gotoMain() {
    this.router.navigate(['/']);
  }


}
