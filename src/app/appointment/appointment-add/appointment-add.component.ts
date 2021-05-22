import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from 'app/testing/router-stubs';
import { Visit } from 'app/visits/visit';
import { VisitService } from 'app/visits/visit.service';
import * as moment from 'moment';
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
  visitForm: FormGroup;
  date: Date;
  

  visit: Visit;
  addedSuccess = false;
  currentOwner: Owner;

  constructor(private appointmentService: AppointmentService, private router: Router, private visitService: VisitService) { 
    this.appointment = {} as Appointment;
    this.currentOwner = {} as Owner;

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
  }

  gotoAppointmentList() {
    this.router.navigate(['/appointment/add']);
  }
  gotoMain(){
    this.router.navigate(['/appointment']);
  }

  onSubmitOrigin(appointment: Appointment) {
    this.router.navigate(['/owners', appointment.date]);
    
  }

  onSubmit(visit: Visit) {
    visit.id = null;
    const that = this;

    // format output from datepicker to short string yyyy/mm/dd format
    visit.date = moment(visit.date).format('YYYY/MM/DD');


    this.visitService.addVisit(visit).subscribe(
      newVisit => {
        this.visit = newVisit;
        this.addedSuccess = true;
        that.gotoAppointmentDetail();
      },
      error => this.errorMessage = error as any
    );    
  }
  gotoAppointmentDetail() {
    this.router.navigate(['/appointment', this.currentOwner.id]);
  }
  


}
