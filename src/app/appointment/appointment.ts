import { PetType } from 'app/pettypes/pettype';
import {Pet} from '../pets/pet';
import {Vet} from '../vets/vet';

export interface Appointment {
  id: number;
  // firstName: string;
  // lastName: string;
  // telephone: string;
  petsname: string;
  appointDate: string;
  type: PetType[];
  pets: Pet[];
  vets: Vet[];
}