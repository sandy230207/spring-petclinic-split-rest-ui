import {Role, RoleOwner} from '../users/role';
export interface User {
    enabled: boolean;
    password: string;
    roles: Role[];
    username: string;   
}

export interface UserOwner {
    enabled: boolean;
    password: string;
    uid: number;
    roles: RoleOwner[];
    username: string;
}