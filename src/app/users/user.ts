import {Role} from '../users/role';
export class User {
    enabled: boolean;
    password: string;
    roles: Role[];
    username: string;
    // id: number;
    // identityid: string;
    // password: string;
    // token: string;
}