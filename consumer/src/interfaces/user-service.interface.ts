import { IUser } from "./user.interface";
import {Observable} from "rxjs";

export interface IUserService {
  GetFilteredUsers(p: {}): Observable<{ users: IUser[] }>;
}
