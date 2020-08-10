import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './dto/user';
import { Observable } from 'rxjs';
import { UserProfileResponse } from './dto/userProfile-response';

@Injectable({
  providedIn: 'root'
})
export class UserLoginService {

 // private baseUrl = '/api/';
  // private baseUrl = 'http://168.61.98.172/api';
  private baseUrl = 'http://localhost:44360/';
  constructor(private http: HttpClient) { }

  register(user: User): Observable<UserProfileResponse>{
    return this.http.post<UserProfileResponse>(`${this.baseUrl}user`, user);
  }

  login(user: User): Observable<UserProfileResponse>{
    return this.http.put<UserProfileResponse>(`${this.baseUrl}user`, user);
  }


  getById(id: number): Observable<UserProfileResponse>{
    return this.http.get<UserProfileResponse>(`${this.baseUrl}user/${id}`);
  }
}
