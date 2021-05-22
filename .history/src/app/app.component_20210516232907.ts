/*
 *
 *  * Copyright 2016-2017 the original author or authors.
 *  *
 *  * Licensed under the Apache License, Version 2.0 (the "License");
 *  * you may not use this file except in compliance with the License.
 *  * You may obtain a copy of the License at
 *  *
 *  *      http://www.apache.org/licenses/LICENSE-2.0
 *  *
 *  * Unless required by applicable law or agreed to in writing, software
 *  * distributed under the License is distributed on an "AS IS" BASIS,
 *  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  * See the License for the specific language governing permissions and
 *  * limitations under the License.
 *
 */

/**
 * @author Vitaliy Fedoriv
 */

import {Component} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { User, UserOwner } from './users/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentUser: UserOwner;

  constructor(
    private router: Router,
    private authService: AuthService
) {
    this.authService.currentUser.subscribe(x => this.currentUser = x);
}
get isVet() {
  return this.currentUser && this.currentUser.roles[0].name == 'ROLE_VET';
}
get isOwner(){
  return this.currentUser && this.currentUser.roles[0].name == 'ROLE_OWNER';
}
// get isOwner(){
//   return this.
// }

  logout() {
    this.authService.logout();
    this.router.navigate(['/signin']);
}
refreshPage() {
  window.location.reload();
}
gotoRegister(){
  this.router.navigate(['/signup']);
}

//2020/0411
  // constructor(
  //     private router: Router,
  //     private authService: AuthService
  // ) {
  //     this.authService.isUserLoggedIn;
  // }

  // logout() {
  //     this.authService.logout();
  //     this.router.navigate(['/login']);
  // }
}
