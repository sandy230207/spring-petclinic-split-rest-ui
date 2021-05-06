import { Component, OnInit } from '@angular/core';
import { OwnerService } from 'app/owners/owner.service';
import { ActivatedRoute, Router } from 'app/testing/router-stubs';
import { Owner } from '../appointment';
import { AppointmentService } from '../appointment.service';

@Component({
  selector: 'app-appointment-detail',
  templateUrl: './appointment-detail.component.html',
  styleUrls: ['./appointment-detail.component.css']
})
export class AppointmentDetailComponent implements OnInit {
  errorMessage: string;
  owner: Owner;

  constructor(private appointmentService: AppointmentService, private route: ActivatedRoute, private router: Router,private ownerService: OwnerService) { 
    this.owner = <Owner>{};
  }

  ngOnInit() {
    // const ownerId = this.route.snapshot.params['id'];
    // this.ownerService.getOwnerById(ownerId).subscribe(
    //   owner => this.owner = owner,
    //   error => this.errorMessage = <any> error);

    const ownerlastName = this.route.snapshot.params['lastName'];
    this.appointmentService.getOwnersList(ownerlastName).subscribe(
      owner => this.owner = owner,
      error => this.errorMessage = <any> error);

  }
  gotoOwnersList() {
    this.router.navigate(['/appointment']);
  }

  editOwner() {
    this.router.navigate(['/appointment', this.owner.lastName, 'edit']);
  }

  addPet(owner: Owner) {
    this.router.navigate(['/appointment', owner.id, 'pets', 'add']);
  }

}
