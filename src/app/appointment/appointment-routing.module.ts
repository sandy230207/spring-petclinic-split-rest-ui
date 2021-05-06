import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OwnerDetailComponent } from 'app/owners/owner-detail/owner-detail.component';
import { OwnerListComponent } from 'app/owners/owner-list/owner-list.component';
import { AppointmentAddComponent } from './appointment-add/appointment-add.component';
import { AppointmentDetailComponent } from './appointment-detail/appointment-detail.component';
import { AppointmentEditComponent } from './appointment-edit/appointment-edit.component';
import { AppointmentListComponent } from './appointment-list/appointment-list.component';

const appointRoutes: Routes = [
  {path: 'owners/:id', component: OwnerDetailComponent},
  {path: 'appointment', component: AppointmentListComponent},
  {path: 'appointment/add', component: AppointmentAddComponent},
  {path: 'appointment/:lastName', component: AppointmentDetailComponent},
  {path: 'appointment/:id/edit', component:AppointmentEditComponent},
  // {path: 'owners/appointments/:id/:date', component: OwnerListComponent}
  {path: 'owners/appointments/:id/:date', component: AppointmentListComponent}


];

@NgModule({
  imports: [RouterModule.forChild(appointRoutes)],
  exports: [RouterModule]
})
export class AppointmentRoutingModule { }
