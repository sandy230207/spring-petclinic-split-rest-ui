import { Injectable } from '@angular/core';
import { Appointment } from './appointment';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {HandleError, HttpErrorHandler} from '../error.service';


@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  // Fetch API URL
  entityUrl = environment.APPOINTMENT_URL;
  private readonly handlerError: HandleError;


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
}
