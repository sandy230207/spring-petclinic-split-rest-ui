import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';

const userRoutes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
        { path: 'signin', component: SigninComponent },
        { path: 'signup', component: SignupComponent }
    ]
}
  // {path:'signin', component: SigninComponent},
  // {path:'signup', component: SignupComponent}
];

@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
