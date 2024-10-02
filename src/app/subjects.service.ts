import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {

  constructor(private http:HttpClient) { }
  getsubjects(){
    return this.http.get(`${environment.APIURL}subject`)
  }
  getdatawithid(id:any){
    return this.http.get(`${environment.APIURL}subject/${id}`)
  }
  deletquestion(id:any,model:any){
    return this.http.put(`${environment.APIURL}subject/${id}`,model)
  }
  getrole(){
    return this.http.get(`${environment.APIURL}login`)
  }
  getuserid(){
   return this.http.get(`${environment.APIURL}login`)
  }
  getuserdata(id:any){
    return this.http.get(`${environment.APIURL}students/${id}`)
  }
  updateuserdata(id:any,model:any){
    return this.http.put(`${environment.APIURL}students/${id}`,model)
  }
  search(filter:any):Observable<any[]>{
   let params = new HttpParams()
   Object.entries(filter).forEach(([key,value]:any)=>{
    if(value){
      params = params.append(key,value)
    }
   })
   return this.http.get<any[]>(`${environment.APIURL}students`,{ params })
  }
}
 