import { User } from "./user.interface";

export interface RefreshToken extends User {
  token: string;
}