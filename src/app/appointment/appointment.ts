import {Pet} from '../pets/pet';
import {Vet} from '../vets/vet';

export interface Appointment {
  id: number;
  firstName: string;
  lastName: string;
  telephone: string;
  pets: Pet[];
  vets: Vet[];
}