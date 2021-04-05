import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppointmentAddComponent } from './appointment-add/appointment-add.component';
import { AppointmentEditComponent } from './appointment-edit/appointment-edit.component';
import { AppointmentListComponent } from './appointment-list/appointment-list.component';

const appointRoutes: Routes = [
  {path: 'appointment', component: AppointmentListComponent},
  {path: 'appointment/add', component: AppointmentAddComponent},
  {path: 'appointment/:id/edit', component:AppointmentEditComponent}
];

@NgModule({
  imports: [RouterModule.forChild(appointRoutes)],
  exports: [RouterModule]
})
export class AppointmentRoutingModule { }
