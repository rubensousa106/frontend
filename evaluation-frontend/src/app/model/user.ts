import {UserRole} from "./userRole";

export class User {

  id : number;
  username :string;
  password:string;
  email:string;
  role: UserRole;
  dateOfRegistration : Date;

  constructor( id : number, username :string, password:string, email:string, role : UserRole, dateOfRegistration : Date)
  {
    this.id = id;
    this.username = username;
    this.password = password;
    this.email = email;
    this.role = role;
    this.dateOfRegistration = dateOfRegistration;
  }
}
