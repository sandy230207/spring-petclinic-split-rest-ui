import { Injectable } from '@angular/core';
import { Appointment } from './appointment';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {HandleError, HttpErrorHandler} from '../error.service';
import { Owner } from 'app/owners/owner';


@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  // Fetch API URL
  entityUrl = environment.USERS_OWNER_API_URL;
  entityUrlOwner = environment.OWNER_API_URL;
  private readonly handlerError: HandleError;

  // public httpOptions = {
  //   headers: new HttpHeaders({
  //     'Access-Control-Allow-Origin': ,
  //     'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
  //     'Access-Control-Max-Age': '86400'
  //   })
  // };


  constructor(private http: HttpClient, private httpErrorHandler: HttpErrorHandler) { 
    this.handlerError = httpErrorHandler.createHandleError('OwnerService');
  }
 

  getAppointment(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(this.entityUrl)
      .pipe(
        catchError(this.handlerError('getAppointment', []))
      );
  }
  getAppointmentById(appointmentId: string): Observable<Appointment> {
    return this.http.get<Appointment>((this.entityUrl + '/' + appointmentId))
      .pipe(
        catchError(this.handlerError('getAppointmentById', {} as Appointment))
      );
  }

  updateAppointment(appointmentId: string, appointment: Appointment): Observable<Appointment> {
    return this.http.put<Appointment>(this.entityUrl + '/' + appointmentId, appointment)
      .pipe(
        catchError(this.handlerError('updateAppointment', appointment))
      );
  }

  addAppointment(appointment: Appointment): Observable<Appointment> {
    return this.http.post<Appointment>(this.entityUrl, appointment)
      .pipe(
        catchError(this.handlerError('addAppointment', appointment))
      );
  }

  deleteAppointment(appointmentId: string): Observable<number> {
    return this.http.delete<number>(this.entityUrl + '/' + appointmentId)
      .pipe(
        catchError(this.handlerError('deleteAppointment', 0))
      );
  }
  // OWNER TEST API
  getOwners(): Observable<Owner[]> {
    return this.http.get<Owner[]>(this.entityUrlOwner)
      .pipe(
        catchError(this.handlerError('getOwners', []))
      );
  }

  getOwnerById(ownerId: string): Observable<Owner> {
    return this.http.get<Owner>(this.entityUrlOwner + '/' + ownerId)
      .pipe(
          catchError(this.handlerError('getOwnerById', {} as Owner))
      );
  }

  addOwner(owner: Owner): Observable<Owner> {
    return this.http.post<Owner>(this.entityUrlOwner, owner)
      .pipe(
        catchError(this.handlerError('addOwner', owner))
      );
  }

  updateOwner(ownerId: string, owner: Owner): Observable<{}> {
    return this.http.put<Owner>(this.entityUrlOwner + '/' + ownerId, owner)
      .pipe(
        catchError(this.handlerError('updateOwner', owner))
      );
  }

  deleteOwner(ownerId: string): Observable<{}> {
    return this.http.delete<Owner>(this.entityUrlOwner + '/' + ownerId)
      .pipe(
         catchError(this.handlerError('deleteOwner', [ownerId]))
      );
  }

  
  getOwnersList(lastName: string): Observable<Owner> {
    return this.http.get<Owner>(this.entityUrlOwner + '/*/lastname'+'/' + lastName)
      .pipe(
          catchError(this.handlerError('getOwnersList', {} as Owner))
      );
  }

  getAllAppointmentByDate(date: Appointment): Observable<Appointment> {
    return this.http.get<Appointment>(this.entityUrlOwner + '/appointments/' + date)
      .pipe(
          catchError(this.handlerError('getAllAppointmentByDate', {} as Appointment))
      );
  }
  getAppointmentByDate(ownerId: number, date: string): Observable<Owner> {
    return this.http.get<Owner>(this.entityUrlOwner + '/appointments/' + ownerId + '/' + date)
      .pipe(
          catchError(this.handlerError('getAppointmentByDate', {} as Owner))
      );
  }
}
