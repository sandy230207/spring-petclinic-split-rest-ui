import { PetType } from 'app/pettypes/pettype';
import { Visit } from 'app/visits/visit';
import {Pet} from '../pets/pet';
import {Vet} from '../vets/vet';

export interface Appointment {
  date: string;
  description: string;
  id: number;
  // firstName: string;
  // lastName: string;
  // telephone: string;
  // petsname: string;
  // appointDate: string;
  // type: PetType[];
  pet: Pet;
  // vets: Vet[];
}
export interface Owner {
  id: number;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  telephone: string;
  pets: Pet[];
  // visits: Visit;
  // date: Date;
}
