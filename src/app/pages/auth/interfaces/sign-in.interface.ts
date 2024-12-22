import { User } from "./user.interface";

export interface SignInResponse extends User {
  token: string;
}