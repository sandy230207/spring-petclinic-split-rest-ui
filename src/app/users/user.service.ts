import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HandleError, HttpErrorHandler } from 'app/error.service';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User, UserOwner,} from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private entityUrl = environment.USERS_API_URL;
  private entityUrlOwner = environment.USERS_OWNER_API_URL;

  private handlerError: HandleError;

  constructor(private http: HttpClient, private httpErrorHandler: HttpErrorHandler) {
    this.handlerError = httpErrorHandler.createHandleError('UserService');
  }

  signIn(user: User): Observable<User>{
    return this.http.post<User>(this.entityUrl+'/signin', user)
      .pipe(
        catchError(this.handlerError('signin', user))
      );

  }

  signUp(user: User): Observable<User>{
    return this.http.post<User>(this.entityUrl+'/signup', user)
      .pipe(
        catchError(this.handlerError('signup', user))
      );
  }
  
  deleteUser(username: string){
    return this.http.delete<number>((this.entityUrl + '/' + username))
      .pipe(
        catchError(this.handlerError('deleteUser', 0))
      );

  }

  signupUser(user: UserOwner): Observable<UserOwner>{
    return this.http.post<UserOwner>(this.entityUrlOwner+'/signup', user)
      .pipe(
        catchError(this.handlerError('signup', user))
      );
  }

  signInUser(user: UserOwner): Observable<UserOwner>{
    return this.http.post<UserOwner>(this.entityUrlOwner+'/signin', user)
      .pipe(
        catchError(this.handlerError('signin', user))
      );
  }

}
