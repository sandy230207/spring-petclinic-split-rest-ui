import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HandleError } from 'app/error.service';
import { Role, RoleOwner } from 'app/users/role';
import { User, UserOwner } from 'app/users/user';
import { environment } from 'environments/environment';
import { BehaviorSubject } from 'rxjs';
import { Observable, of } from 'rxjs';

// import { Observable, ObservableInput, of } from 'rxjs';
import { tap, delay, catchError, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isUserLoggedIn: boolean = false;

  roleAs: string;
  private entityUrlOwner = environment.USERS_OWNER_API_URL;
  private entityUrl = environment.USERS_API_URL;


  getRoleOwner: string;


  private handlerError: HandleError;
  private currentUserSubject: BehaviorSubject<UserOwner>;
  public currentUser: Observable<UserOwner>;

  constructor(private http: HttpClient) { 
    this.currentUserSubject = new BehaviorSubject<UserOwner>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();

  }

  public get currentUserValue(): UserOwner {
    return this.currentUserSubject.value;
  }

  signInUser(user: UserOwner): Observable<UserOwner>{
    this.isUserLoggedIn =true;
    console.log("isUSerLoggedIn!!!!!!!!!!!!"+ this.isUserLoggedIn)
    return this.http.post<UserOwner>(this.entityUrlOwner+'/signIn', user)
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.getRoleOwner = user.roles[0].name;
            console.log(this.getRoleOwner)
        }

        return user;
    }));
  }
  signIn(user: UserOwner): Observable<UserOwner>{
    this.isUserLoggedIn =true;
    console.log("isUSerLoggedIn!!!!!!!!!!!!"+ this.isUserLoggedIn)
    return this.http.post<UserOwner>(this.entityUrl+'/signIn', user)
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.getRoleOwner = user.roles[0].name;
            console.log(this.getRoleOwner)
        }

        return user;
    }));
  }
  
  isLoggedIn(){
    const loggedIn = localStorage.getItem('currentUser');
    if (loggedIn == 'true')
      this.isUserLoggedIn = true;
    else
      this.isUserLoggedIn = false;
    return this.isUserLoggedIn;

  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
}

  getRole() {
    this.roleAs = localStorage.getItem('currentUser.roles');
    console.log(this.roleAs)
    return this.roleAs;
  }

  
  
  // signin(userName: string, password: string): Observable<any>{
  //   console.log(userName);
  //   console.log(password);
  //   this.isUserLoggedIn = userName == 'admin' && password == 'admin';
  //   localStorage.setItem('isUserLoggedIn', this.isUserLoggedIn ? "true" : "false");

  //   return of(this.isUserLoggedIn).pipe(
  //     delay(1000),
  //     tap(val => { 
  //        console.log("Is User Authentication is successful: " + val); 
  //     })
  //  );
  //  }

  //  logout(): void {
  //   this.isUserLoggedIn = false;
  //      localStorage.removeItem('isUserLoggedIn'); 
  //   }

  
  // constructor() { }
  // private currentUserSubject: BehaviorSubject<User>;
  // public currentUser: Observable<User>;

  // public get currentUserValue(): User {
  //   return this.currentUserSubject.value;
  // }
  
}
