import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from 'app/testing/router-stubs';
import { Appointment } from '../appointment';
import { AppointmentService } from '../appointment.service';

@Component({
  selector: 'app-appointment-edit',
  templateUrl: './appointment-edit.component.html',
  styleUrls: ['./appointment-edit.component.css']
})
export class AppointmentEditComponent implements OnInit {
  appointment: Appointment;
  errorMessage: string; // server error message  

  constructor(private appointmentService: AppointmentService, private route: ActivatedRoute, private router: Router) {
    this.appointment = {} as Appointment;
   }

  ngOnInit() {
    const appointmentId = this.route.snapshot.params.id;
    this.appointmentService.getAppointmentById(appointmentId).subscribe(
      appointment => this.appointment = appointment,
      error => this.errorMessage = error as any);
  }
  onSubmit(appointment: Appointment) {
    const that = this;
    this.appointmentService.updateAppointment(appointment.id.toString(), appointment).subscribe(
      res => this.gotoAppointmentDetail(appointment),
      error => this.errorMessage = error as any
    );
  }

  gotoAppointmentDetail(appointment: Appointment) {
    this.errorMessage = null;
    this.router.navigate(['/appointment', appointment.id]);
  }


}
