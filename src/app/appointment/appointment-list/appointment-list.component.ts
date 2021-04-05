import { Component, OnInit } from '@angular/core';
import { Router } from 'app/testing/router-stubs';
import { Appointment } from '../appointment';
import { AppointmentService } from '../appointment.service';


@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {

  appointment: Appointment[];
  errorMessage: string;
  responseStatus: number;

  constructor(private appointmentService: AppointmentService, private router: Router) { 
    this.appointment = [];
  }

  ngOnInit() {
    this.appointmentService.getAppointment().subscribe(
      appointment => this.appointment = appointment,
      error => this.errorMessage = error as any);
  }

  editAppointment(appointment: Appointment) {
    this.router.navigate(['/appointment', appointment.id, 'edit']);
  }

  deleteAppointment(appointment: Appointment) {
    this.appointmentService.deleteAppointment(appointment.id.toString()).subscribe(
      response => {
        this.responseStatus = response;
        this.appointment = this.appointment.filter(currentItem => !(currentItem.id === appointment.id));      },
      error => this.errorMessage = error as any);
  }
  //this one might delete after
  addVisit(appointment: Appointment) {
    this.router.navigate(['/pets', appointment.id, 'visits', 'add']);
  }

  addAppointment() {
    this.router.navigate(['/appointment/add']);
  }
  gotoHome() {
    this.router.navigate(['/welcome']);
  }

}
