import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HandleError, HttpErrorHandler } from 'app/error.service';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private entityUrl = environment.USERS_API_URL;

  private handlerError: HandleError;

  constructor(private http: HttpClient, private httpErrorHandler: HttpErrorHandler) {
    this.handlerError = httpErrorHandler.createHandleError('UserService');
  }

  signIn(user: User): Observable<User>{
    return this.http.post<User>(this.entityUrl+'/signIn', user)
      .pipe(
        catchError(this.handlerError('signIn', user))
      );

  }

  signUp(user: User): Observable<User>{
    return this.http.post<User>(this.entityUrl+'/signUp', user)
      .pipe(
        catchError(this.handlerError('signUp', user))
      );
  }
  
  deleteUser(username: string){
    return this.http.delete<number>((this.entityUrl + '/' + username))
      .pipe(
        catchError(this.handlerError('deleteUser', 0))
      );

  }

}
