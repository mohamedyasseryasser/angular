import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
model:any
 subject = new BehaviorSubject<any>('')
user = this.subject.asObservable()
 constructor(private http:HttpClient) { }

  createaccount(model:any){
    return this.http.post(`${environment.APIURL}students`,model)
  }
  getemails(){
    return this.http.get(`${environment.APIURL}students`)
  }
  getuser(type:any){
    return this.http.get(`${environment.APIURL}${type}`)
  }
  login(model:any){
  return this.http.put(`${environment.APIURL}login/1`,model)
  }
  getrole(){
    return this.http.get(`${environment.APIURL}login`)
  }
  add(model:any){
  return this.http.post(`http://localhost:3000/login`,model)
  }
}
