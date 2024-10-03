import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../register.service';
import { SubjectsService } from '../subjects.service';
import { registerLocaleData } from '@angular/common';
import { ExamservicesService } from '../examservices.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-subject',

  templateUrl: './subject.component.html',
  styleUrl: './subject.component.css'
})
export class SubjectComponent implements OnInit{
  user:any = null
  subject:any[]=[]
  id:any=0 
  currentuserid:any
  usersubjects:any[]=[]
  currentsubjectid:any
  index:any
  constructor( private toaster:ToastrService,private router:Router,private examservices:ExamservicesService,private registerservices:RegisterService,private services:SubjectsService){}
  ngOnInit(): void {
this.registerservices.user.subscribe((res: any) => {
this.user = res.role
});
this.services.getsubjects().subscribe((res:any) => {
  this.subject = res;
}); 
}  
delet(index:any,id:any){
console.log(index)
this.subject.splice(index  ,1)
console.log(this.subject)
this.examservices.deletdata(id).subscribe((res:any)=>{
  console.log(this.subject)
})

}
show(index:any){
this.index = index  
this.currentsubjectid = this.subject[index - 1].id
this.services.getuserid().subscribe((res:any)=>{
this.currentuserid = res[0].userid
this.getuserdata()
})
//this.router.navigate(['/text',this.index])
}
getuserdata(){
  this.services.getuserdata(this.currentuserid).subscribe((res:any)=>{
 this.usersubjects = res?.subjects ? res?.subjects : []
 console.log(this.usersubjects)
 let index =  this.usersubjects.findIndex((ele)=> ele.id == this.currentsubjectid )
 if(index == -1){
this.router.navigate(['/text',this.index])

 }else{
  this.toaster.error('this exam disabled')
 }
  })
}
showwithdoctor(index:any){
console.log(index)
this.router.navigate(['/text',index])
}
}
 