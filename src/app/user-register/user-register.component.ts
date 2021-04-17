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
  private errorMessage: string;
  username: string;
  password: string;
  identityid: string;
  formData: FormGroup;

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

  onSubmit(form: any): void{
    console.log('Form Data: ');
    console.log(form);
    // get the form value
  }
//   onSubmit1(form: any): void{
//     this.submitted = true;
//     console.log('Form Data: ');
//     console.log(form);

//     reset alerts on submit
//     this.alertService.clear();

//     stop here if form is invalid
//     if (this.registerForm.invalid) {
//         return;
//     }

//     this.loading = true;
//     this.userService.register(this.registerForm.value)
//         .pipe(first())
//         .subscribe(
//             data => {
//                 this.alertService.success('Registration successful', true);
//                 this.router.navigate(['/login']);
//             },
//             error => {
//                 this.alertService.error(error);
//                 this.loading = false;
//             });
// }

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
