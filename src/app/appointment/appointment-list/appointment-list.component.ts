import { Component, OnInit } from '@angular/core';
import { OwnerService } from 'app/owners/owner.service';
import { Visit } from 'app/visits/visit';
import { ActivatedRoute, Router } from 'app/testing/router-stubs';
import { Appointment, Owner } from '../appointment';
import { AppointmentService } from '../appointment.service';
import { Pet } from 'app/pets/pet';


@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {

  appointment: Appointment[];
  errorMessage: string;
  responseStatus: number;
  //Testing Owner API
  owner: Owner;
  owners: Owner[];
  visits: Visit;

  

  constructor(private appointmentService: AppointmentService, private router: Router, private ownerService: OwnerService, private route: ActivatedRoute) { 
    this.appointment = [];
  }

  ngOnInit() {
    // this.appointmentService.getOwners().subscribe(
      // owners => this.owners = owners,
      // error => this.errorMessage = <any> error);

    
    this.appointmentService.getAppointmentByDate(6,"2000-01-01").subscribe(
      visits => this.visits = visits,
      error => this.errorMessage = <any> error);
      console.log("test!!!", this.visits); 


   

    // const ownerlastName = this.route.snapshot.params['lastName'];
    // this.appointmentService.getOwnersList(ownerlastName).subscribe(
    //   owner => this.owner = owner,
    //   error => this.errorMessage = <any> error);
  }

  editAppointment(appointment: Appointment) {
    this.router.navigate(['/appointment', appointment.id, 'edit']);
  }

  // deleteAppointment(appointment: Appointment) {
  //   this.appointmentService.deleteAppointment(appointment.id.toString()).subscribe(
  //     response => {
  //       this.responseStatus = response;
  //       this.appointment = this.appointment.filter(currentItem => !(currentItem.id === appointment.id));      },
  //     error => this.errorMessage = error as any);
  // }
  //this one might delete after
  // addVisit(appointment: Appointment) {
  //   this.router.navigate(['/pets', appointment.id, 'visits', 'add']);
  // }

  addAppointment() {
    this.router.navigate(['/appointment/add']);
  }
  gotoHome() {
    this.router.navigate(['/welcome']);
  }
  addVisit(pet: Pet) {
    this.router.navigate(['/pets', pet.id, 'visits', 'add']);
  }
  //Select the owner
  // onSelect(owner: Owner) {
  //   this.router.navigate(['/owners', owner.lastName]);
  // }

  



}
