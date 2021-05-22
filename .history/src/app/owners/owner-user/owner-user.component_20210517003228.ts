import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Owner } from '../owner';
import { OwnerService } from '../owner.service';

@Component({
  selector: 'app-owner-user',
  templateUrl: './owner-user.component.html',
  styleUrls: ['./owner-user.component.css']
})
export class OwnerUserComponent implements OnInit {
  
  errorMessage: string;
  owner: Owner;
  id : Owner;

  constructor(private route: ActivatedRoute, private router: Router, private ownerService: OwnerService) { 
    this.owner = {} as Owner;

  }

  ngOnInit() {
    const ownerlastName = this.route.snapshot.params.lastName;
    console.log(ownerlastName)
    this.ownerService.getOwnersList('Coleman').subscribe(
      owner => this.owner = owner,
      error => this.errorMessage = error as any);
  }

  gotoOwnersList() {
    this.router.navigate(['/owners']);
  }


  editOwner() {
    this.ownerService.getOwnersList('Coleman').subscribe(
      id => this.owner.id,

    )
    
    this.router.navigate(['/owners', this.owner.id, 'edit']);
    console.log(this.owner.id)

  }

  addPet(owner: Owner) {
    this.router.navigate(['/owners', owner.id, 'pets', 'add']);
  }

}
