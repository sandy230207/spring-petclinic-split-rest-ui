import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from 'app/testing/router-stubs';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user: User;
  errorMessage: string;
  registerForm: FormGroup;


  constructor(private userService: UserService, private router: Router, private formBuilder: FormBuilder) { 
    this.user = {} as User;
  }

  ngOnInit() {
    
  }
  gotoMain() {
    this.router.navigate(['/']);
  }



  

}
