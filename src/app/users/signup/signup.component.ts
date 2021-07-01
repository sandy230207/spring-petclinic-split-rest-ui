import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ResolvedReflectiveFactory } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Owner } from 'app/appointment/appointment';
import { AuthService } from 'app/auth/auth.service';
import { OwnerService } from 'app/owners/owner.service';
import { ActivatedRoute, Router } from 'app/testing/router-stubs';
import { map } from 'rxjs/operators';
import { Role } from '../role';
import { User, UserOwner,} from '../user';
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
  owner: Owner;

  signupForm: FormGroup;

  loading = false;
  submmitted = false;
  newForm: FormGroup;
  ownerId: unknown;


  constructor(
    private userService: UserService, 
    // private authService: AuthService,
    private ownerService: OwnerService,
    private router: Router, 
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private http: HttpClient
  ) { 
    this.user = {} as User;
    this.owner = {} as Owner;
    this.selectedRole = {} as Role;
    this.roles = [];
     
  }

  ngOnInit() {
    
  }

  gotoMain() {
    this.router.navigate(['signin']);
  }  

  onSubmit(data: any) {
    // Step1. addowner
    // Step2. 取addowner response的ownerid，放到signup的roles.id
    // this.owner.firstName =String(data.firstName)
    // this.owner.lastName =String(data.lastName)

    this.http.post("http://localhost:9966/petclinic/api/owners", this.owner)
    .pipe(map((res:any) => {
      // Step3. signup
      let newForm =({
        enabled: true,
        password: String(data.password),
        username: String(data.username),
        uid: res.id,
        roles:[{
          name: "OWNER"
        }]
      });
      let ownersigninForm: UserOwner = newForm;    
      this.submmitted = true,
  
      this.userService.signupUser(ownersigninForm).pipe().subscribe(
        data => {
          this.router.navigate(['/signin']);
        },
        error =>{
          this.loading = false;
        })
    })).subscribe();
  
  }

}
