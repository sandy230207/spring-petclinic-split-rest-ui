import { Component, OnInit } from '@angular/core';
// import { Router } from 'app/testing/router-stubs';

import { FormGroup, FormControl } from '@angular/forms';
// import { AuthService} from '../auth.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private errorMessage: string;
  userName: string;
  password: string;
  formData: FormGroup;

  constructor(private router: Router) {//, private authService: AuthService

   }

  ngOnInit() {
    this.formData = new FormGroup({
      userName: new FormControl("admin"),
      password: new FormControl("admin"),
    });
  }

  onClickSubmit(data: any) {
    this.userName = data.userName;
    this.password = data.password;

    console.log("Login page: " + this.userName);
    console.log("Login page: " + this.password);

    // this.authService.login(this.userName, this.password)
    //    .subscribe( data => { 
    //       console.log("Is Login Success: " + data);
    //       if(data)
    //         this.router.navigate(['/']);
    //       if(!data)
    //         this.router.navigate(['/pets']);
          
    //     });
  }

  gotoMain() {
    this.router.navigate(['/']);
  }

  
}