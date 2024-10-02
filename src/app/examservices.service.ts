import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExamservicesService {

  constructor(private http:HttpClient) { }
  createsubject(model:any){
return this.http.post(`${environment.APIURL}subject`,model)
  }
updatedata(model:any,id:any){
  return this.http.put(`${environment.APIURL}subject/${id}`,model)
}
deletdata(index:any){
  return this.http.delete(`${environment.APIURL}subject/${index}`)
}
}
