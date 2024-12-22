import { User } from "./user.interface";

export interface SignUpResponse extends User {
  token: string;
}