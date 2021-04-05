import { Component, OnInit } from '@angular/core';
import { Router } from 'app/testing/router-stubs';
import { Appointment } from '../appointment';
import { AppointmentService } from '../appointment.service';

@Component({
  selector: 'app-appointment-add',
  templateUrl: './appointment-add.component.html',
  styleUrls: ['./appointment-add.component.css']
})
export class AppointmentAddComponent implements OnInit {

  appointment: Appointment;
  errorMessage: string;

  constructor(private appointmentService: AppointmentService, private router: Router) { 
    this.appointment = {} as Appointment;
  }

  ngOnInit() {
  }
  onSubmit(appointment: Appointment) {
    appointment.id = null;
    this.appointmentService.addAppointment(appointment).subscribe(
      newAppointment => {
        this.appointment = newAppointment;
        this.gotoAppointmentList();
      },
      error => this.errorMessage = error as any
    );
  }

  gotoAppointmentList() {
    this.router.navigate(['/appointment/add']);
  }
  gotoMain(){
    this.router.navigate(['/appointment']);
  }


}
