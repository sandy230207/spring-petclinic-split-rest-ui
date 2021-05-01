import { Component, OnInit } from '@angular/core';
import { Router } from 'app/testing/router-stubs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthService } from 'app/auth/auth.service';

// This component might delete after testing
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
  
  identityid: string;

  //signup
  // enabled = true;
  // username: string;
  // password: string;
  // id = 0;
  // name = 'OWNER';

  profileForm1 = this.formBuilder.group({
    enabled: true,
    password: [''],
    identityid: [''],
    roles: this.formBuilder.group({
      id: ['0'],
      name: ['OWNER']
    }),
  });

  

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
    // this means it will verificate the input of the form
    this.registerForm = this.formBuilder.group({
      identityId: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      enabled: true,
      roles: ({
        id:['0'],
        name: ['OWNER'],
      })
  });
  console.log(this.registerForm);
  }
  gotoMain() {
    this.router.navigate(['/']);
  }

  onSubmit(): void{
    
    console.log('Form Data: ');
    console.log(this.registerForm);
    console.log();


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
