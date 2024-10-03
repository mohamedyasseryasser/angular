import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../students.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SubjectsService } from '../subjects.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent implements OnInit{
 dataSource:any
 datatable:any
 formgroup!:FormGroup
 name:any
 array:any
 filteration:any={name:''}
 timeout:any
page:any=1
index:any
limit:number=5

  constructor(private fb:FormBuilder ,private subjectservice:SubjectsService ,private studentsservice:StudentsService){
  }
  ngOnInit(): void {
    this.formgroup = this.fb.group({
      name: new FormControl('',Validators.required),
      subject:new FormControl('',Validators.required)
    })
    console.log(this.page)
     this.getstudents()
  }
getstudents(){
this.studentsservice.getstudents().subscribe((res:any)=>{
  this.dataSource = res.map((student:any)=>{
    return student?.subjects?.map((sub:any)=>{
      return {
        student:student.name,
        subject:sub.subjectname,
        degree:sub.degree
      }
    }) || []
  })
  console.log(this.dataSource)
  this.datatable = []
 this.dataSource.forEach((element:any) => {
  element.forEach((ele:any)=>{
    this.datatable.push({
      student:ele.student,
      subject:ele.subject,
      degree:ele.degree
    })
  })
 });
})
}
submit(){
 this.name = this.formgroup.value.name
console.log(this.datatable)
this.array = this.datatable.filter((ele:any)=>{
  return ele.student === this.name
})
this.datatable = this.array
console.log(this.array)
}
changepage(event:any){
  this.page = event
  console.log(this.page)
}
}
 