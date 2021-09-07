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

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  APPOINTMENT_URL:'http://52.14.56.7:9966/petclinic/api/appointment',
  USERS_API_URL: 'http://52.14.56.7:9967/petclinic/api/users',
  USERS_OWNER_API_URL: 'http://52.14.56.7:9966/petclinic/api/users',
  OWNER_API_URL: 'http://52.14.56.7:9966/petclinic/api/owners',
  PET_API_URL: 'http://52.14.56.7:9966/petclinic/api/pets',
  PETTYPES_API_URL: 'http://52.14.56.7:9966/petclinic/api/pettypes',
  SPECIALTY_API_URL: 'http://52.14.56.7:9967/petclinic/api/specialties',
  VET_API_URL: 'http://52.14.56.7:9967/petclinic/api/vets',
  VISIT_API_URL: 'http://52.14.56.7:9966/petclinic/api/visits'
};
