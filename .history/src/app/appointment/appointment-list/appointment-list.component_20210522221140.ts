import { Component, Input, OnInit } from '@angular/core';
import { OwnerService } from 'app/owners/owner.service';
import { Visit } from 'app/visits/visit';
import { ActivatedRoute, Router } from 'app/testing/router-stubs';
import { Appointment, Owner } from '../appointment';
import { AppointmentService } from '../appointment.service';
import { Pet } from 'app/pets/pet';
import { VisitService } from 'app/visits/visit.service';
import { Observable } from 'rxjs';
import { PetService } from 'app/pets/pet.service';
import { AuthService } from 'app/auth/auth.service';


@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {

  @Input() visits: Visit[];
  @Input() pet: Pet;

  responseStatus: number;
  noVisits = false;
  errorMessage: string;

  monthString: string;
  dayString: string;



  appointment: Appointment[];;
  //Testing Owner API
  owner: Owner;
  owners: Owner[];

  constructor(
    private appointmentService: AppointmentService,
    private router: Router,
    private ownerService: OwnerService,
    private route: ActivatedRoute,
    private petService: PetService,
    private visitService: VisitService,
    private authService: AuthService,
  ) {
    this.appointment = [];
    this.visits = [];
    this.pet = {} as Pet;
  }

  ngOnInit() {
    if (this.authService.currentUserValue.roles[0].name == 'ROLE_OWNER') {
      //Owner List
      this.appointmentService.getAppointmentByDate(this.authService.currentUserValue.uid, "now").subscribe(
        visits => visits = visits,
        error => this.errorMessage = <any>error);
      console.log("test!!!", this.visits);
    } else if (this.authService.currentUserValue.roles[0].name == 'ROLE_VET') {
      //Vet List 
      this.appointmentService.getAllAppointmentByDate("now").subscribe(
        visits => visits = visits,
        error => this.errorMessage = <any>error);
      console.log("test!!!", this.visits);
    }

  }

  editAppointment(appointment: Appointment) {
    this.router.navigate(['/appointment', appointment.id, 'edit']);
  }

  deleteVisit(visit: Visit) {
    this.visitService.deleteVisit(visit.id.toString()).subscribe(
      response => {
        this.responseStatus = response;
        console.log('delete success');
        this.visits.splice(this.visits.indexOf(visit), 1);
        if (this.visits.length === 0) {
          this.noVisits = true;
        }
      },
      error => this.errorMessage = error as any);
  }

  addAppointment(pet: Pet) {
    this.router.navigate(['/pets', pet.id, 'visits', 'add']);
  }
  gotoHome() {
    this.router.navigate(['/welcome']);
  }
  addVisit(pet: Pet) {
    this.router.navigate(['/pets', pet.id, 'visits', 'add']);
  }
  editVisit(visit: Visit) {
    this.router.navigate(['/visits', visit.id, 'edit']);
  }


}