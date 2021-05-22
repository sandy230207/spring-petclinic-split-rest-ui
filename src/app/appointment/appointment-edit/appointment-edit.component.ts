import { Component, OnInit } from '@angular/core';
import { Pet } from 'app/pets/pet';
import { PetType } from 'app/pettypes/pettype';
import { ActivatedRoute, Router } from 'app/testing/router-stubs';
import { Visit } from 'app/visits/visit';
import { VisitService } from 'app/visits/visit.service';
import * as moment from 'moment';
import { Appointment, Owner } from '../appointment';
import { AppointmentService } from '../appointment.service';

@Component({
  selector: 'app-appointment-edit',
  templateUrl: './appointment-edit.component.html',
  styleUrls: ['./appointment-edit.component.css']
})
export class AppointmentEditComponent implements OnInit {
  appointment: Appointment;
  errorMessage: string; // server error message 
  visit: Visit;
  currentPet: Pet;
  currentOwner: Owner;
  currentPetType: PetType;
  updateSuccess = false;

  constructor(private appointmentService: AppointmentService, private route: ActivatedRoute, private router: Router, private visitService: VisitService) {
    this.appointment = {} as Appointment;
    this.visit = {} as Visit;
    this.currentPet = {} as Pet;
    this.currentOwner = {} as Owner;
    this.currentPetType = {} as PetType;
   }

  ngOnInit() {
    const visitId = this.route.snapshot.params.id;
    this.visitService.getVisitById(visitId).subscribe(
      response => {
        this.visit = response;

        this.currentPet = this.visit.pet;
        this.currentPetType = this.currentPet.type;
        // this.currentOwner = this.currentPet.owner;
      },
      error => this.errorMessage = error as any);

    const appointmentId = this.route.snapshot.params.id;
    this.appointmentService.getAppointmentById(appointmentId).subscribe(
      appointment => this.appointment = appointment,
      error => this.errorMessage = error as any);
  }

  onSubmit(visit: Visit) {
    visit.pet = this.currentPet;

    // format output from datepicker to short string yyyy/mm/dd format
    visit.date = moment(visit.date).format('YYYY/MM/DD');

    this.visitService.updateVisit(visit.id.toString(), visit).subscribe(
      res => this.gotoOwnerDetail(),
      error => this.errorMessage = error as any);

  }

  gotoOwnerDetail() {
    this.router.navigate(['/owners', this.currentOwner.id]);
  }

}
