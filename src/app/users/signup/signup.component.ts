import { Component, OnInit, ResolvedReflectiveFactory } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'app/auth/auth.service';
import { Router } from 'app/testing/router-stubs';
import { first } from 'rxjs/operators';
import { Role } from '../role';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user: User;
  roles: Role[];
  selectedRole: Role;
  errorMessage: string;

  signupForm: FormGroup;

  loading = false;
  submmitted = false;
  newForm: FormGroup;


  constructor(
    private userService: UserService, 
    // private authService: AuthService,
    private router: Router, 
    private formBuilder: FormBuilder
  ) { 
    this.user = {} as User;
    this.selectedRole = {} as Role;
    this.roles = [];
     
  }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required, Validators.minLength(6)]

    })

    
  }

  gotoMain() {
    this.router.navigate(['/']);
  }

  onSubmit2(user: User) {
    user.enabled = true;
    user.roles = [];
    user.password ="test";
    user.username = "test";
    this.selectedRole.id = 0;
    this.selectedRole.name = "OWNER"
    
    // this.vetService.addVet(vet).subscribe(
    //   newVet => {
    //     this.vet = newVet;
    //     this.gotoVetList();
    //   },
    //   error => this.errorMessage = error as any
    // );
    this.userService.signUp(user)
    .pipe(first())
    .subscribe(
      data => {
        this.router.navigate(['/signin']);
      },
      error =>{
        this.loading = false;
      });
  }

  

  onSubmit(data: any){    
    // let serializedForm= JSON.parse(data);
    // console.log(serializedForm)

    // console.log(data)
    // let parsedData = JSON.parse(data);
    // console.log('///////////////////')
    // console.log(parsedData.name);
    // console.log(parsedData.name);


    let newForm =({
      username: String(data.username),
      password: String(data.password),
      enabled: true,
      roles:[{
        id: 0,
        name: "OWNER"
      }]
    });

    

    let newsigninForm: any = newForm;

    console.log('newForm')
    console.log(newsigninForm)


    this.submmitted = true,

    this.userService.signUp(newsigninForm)
    .pipe(first())
    .subscribe(
      data => {
        this.router.navigate(['/signin']);
      },
      error =>{
        this.loading = false;
      });

    
  }



  

}
