import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './dto/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserLoginService {

 // private baseUrl = '/api/';
  // private baseUrl = 'http://168.61.98.172/api';
  private baseUrl = 'http://localhost:44360/';
  constructor(private http: HttpClient) { }

  register(user: User): Observable<User>{
    return this.http.post<User>(`${this.baseUrl}user`, user);
  }


  getById(id: number): Observable<User>{
    return this.http.get<User>(`${this.baseUrl}user/${id}`);
  }
}
