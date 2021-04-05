import { Component, OnInit } from '@angular/core';
import { Router } from 'app/testing/router-stubs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  registerForm: FormGroup;
    loading = false;
    submitted = false;

    constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      
      // private authenticationService: AuthenticationService,
      // private userService: UserService,
      // private alertService: AlertService
  ) {
      // redirect to home if already logged in
      // if (this.authenticationService.currentUserValue) {
      //     this.router.navigate(['/']);
      // }
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      identityId: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
  });
  }
  gotoMain() {
    this.router.navigate(['/']);
  }

}
export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'YYYY/MM/DD',
  },
  display: {
    dateInput: 'YYYY/MM/DD',
    monthYearLabel: 'MM YYYY',
    dateA11yLabel: 'YYYY/MM/DD',
    monthYearA11yLabel: 'MM YYYY',
  },
};
