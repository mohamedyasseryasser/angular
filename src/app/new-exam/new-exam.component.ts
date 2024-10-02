import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ExamservicesService } from '../examservices.service';

@Component({
  selector: 'app-new-exam',

  templateUrl: './new-exam.component.html',
  styleUrl: './new-exam.component.css'
})
export class NewExamComponent implements OnInit{
name = new FormControl('',Validators.required)
questionform!:FormGroup
question:any[]=[]
correctid:any 
startadd:boolean = false
stepperindex = 0
subjectname:any
subjectid:any

  constructor(private fb:FormBuilder,private toaster:ToastrService,private examservies:ExamservicesService){}

  ngOnInit(): void {
    this.questionform = this.fb.group({
      question:[''],
      answer1:[''],
      answer2:[''],
      answer3:[''],
      answer4:[''],
     })
     console.log(this.stepperindex)
   }
start(){
  if(!this.name.value || this.name.value.trim() === ""){
this.toaster.error('write subject name')
  }else{
    this.startadd = true
    this.subjectname = this.name.value
    this.stepperindex = 1
  }
}
createquestion(){
  
  if(this.correctid){
    const model = {
      name:this.name.value,
      question: this.questionform.get('question')?.value,
      answer1:this.questionform.get('answer1')?.value,
      answer2:this.questionform.get('answer2')?.value,
      answer3:this.questionform.get('answer3')?.value,
      answer4:this.questionform.get('answer4')?.value,
      correctanswer:this.questionform.get(this.correctid)?.value,
    }
    this.question.push(model)
    this.questionform.reset()
    console.log(this.question)
    this.toaster.success('valid data')
  }else{
    this.toaster.error('invalid answer')
  }
}
getcorrectanswer(event:any){
this.correctid = event.value
console.log(event.value)
}
cleardata(){
  this.questionform.reset()
}
cansel(){
  this.questionform.reset()
  this.question = []
  this.subjectname = ""
  this.name.reset()
  this.stepperindex = 0
  this.startadd = false
}
finsh(){
  
  const model = {
 name:this.subjectname,
 question:this.question,
 
  }
this.examservies.createsubject(model).subscribe((res:any)=>{
  this.subjectid = res.id
  console.log(res)
})
this.stepperindex = 2
}
delet(event:any){
this.question.splice(event,1)
const model={
  name:this.subjectname,
  question:this.question
}
this.examservies.updatedata(model,this.subjectid).subscribe(res=>{
  console.log(res)
})
}
put(){
  if(this.stepperindex == 2){
   this.stepperindex = 1
  }
  else{ this.stepperindex = 0
  }
console.log(this.stepperindex)
}
}
 