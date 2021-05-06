import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from 'app/testing/router-stubs';
import { Appointment, Owner } from '../appointment';
import { AppointmentService } from '../appointment.service';

@Component({
  selector: 'app-appointment-add',
  templateUrl: './appointment-add.component.html',
  styleUrls: ['./appointment-add.component.css']
})
export class AppointmentAddComponent implements OnInit {

  appointment: Appointment;
  errorMessage: string;
  appointmentForm: FormGroup;
  date: Date;

  constructor(private appointmentService: AppointmentService, private router: Router) { 
    this.appointment = {} as Appointment;
  }

  ngOnInit() {
  }
  
  
  onSubmit1(date: any){
    this.appointmentService.getAllAppointmentByDate(date).subscribe(
      date => {
        // this.date = date;
        // this.gotoOwnersList();
        console.log(date)
      },
      error => this.errorMessage = <any>error
    );
    // appointment.id = null;
    // this.appointmentService.addAppointment(appointment).subscribe(
    //   newAppointment => {
    //     this.appointment = newAppointment;
    //     this.gotoAppointmentList();
    //   },
    //   error => this.errorMessage = error as any
    // );
    // this.appointmentService.getAllAppointmentByDate(date).subscribe(
    //   // date => this.date = date,
    //   error => this.errorMessage = <any> error);
      //  .subscribe( data => { 
      //     console.log("Get All Appointment " + data);
      //     // if(data)
      //     //   this.router.navigate(['/appointment']);
      //     // else
      //     //   this.router.navigate(['/']);
          
      //   });
  }

  gotoAppointmentList() {
    this.router.navigate(['/appointment/add']);
  }
  gotoMain(){
    this.router.navigate(['/appointment']);
  }

  onSubmit(appointment: Appointment) {
    this.router.navigate(['/owners', appointment.date]);
  }
  


}
