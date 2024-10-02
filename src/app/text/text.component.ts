import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubjectsService } from '../subjects.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-text',

  templateUrl: './text.component.html',
  styleUrl: './text.component.css'
})
export class TextComponent implements OnInit{
id:any
subjects:any
subjectname:any
subjectdata:any[]=[]
role:any
total:any = 0
results:boolean=false
userid:any
currentuser:any
subjectarray:any[]=[]
value:any
  constructor(private toaster:ToastrService,private route:ActivatedRoute,private subjectservice:SubjectsService){
    this.route.paramMap.subscribe((params:any)=>{
      this.id = params.get('id')
      this.getdatawithid()
      this.getrole()
       })
  }

  ngOnInit(): void {
    this.getuserid()
    
    
}
getdatawithid(){
this.subjectservice.getdatawithid(this.id).subscribe((res:any)=>{
  this.subjects = res
  this.subjectname = this.subjects.name
  this.subjectdata = this.subjects.question
  
 // console.log(this.subjectarray)

  console.log(this.subjects)
})
}
delet(index:any){

this.subjectdata.splice(index,1)
const model ={
  name:this.subjects.name,
  question:this.subjectdata
}
this.subjectservice.deletquestion(this.id,model).subscribe((res=>{

}))
}
getrole(){
  this.subjectservice.getrole().subscribe(((res:any)=>{
   this.role = res[0].role
   //console.log(this.role)
  }))
}
getvalue(event:any,index:any){
 let value = event.target.value
 let questionindex =  index
 this.subjects.question[questionindex].useranswer=value

}
result(){
  for(let i in this.subjects.question){
    if(this.subjects.question[i].useranswer == this.subjects.question[i].correctanswer){
      this.total++;
    }
  }
 let value={
  subjectname:this.subjects.name,
      id:this.id,
      degree:this.total
  }
  this.subjectarray.push(value)
  this.results = true 
  const model={
    name:this.currentuser.name,
    email:this.currentuser.email,
    password:this.currentuser.password,
    id:this.userid,
    subjects: this.subjectarray
  }
  this.subjectservice.updateuserdata(this.userid,model).subscribe((res:any)=>{
    this.toaster.success('successfully')
  })
  //console.log(model)
} 
getuserid(){
  this.subjectservice.getuserid().subscribe((res:any)=>{
    this.userid = res[0].userid
   // console.log(this.userid)
    this.getuserdata(this.userid)
  })
}
getuserdata(id:any){
this.subjectservice.getuserdata(id).subscribe((res:any)=>{
this.currentuser = res
this.subjectarray = res?.subjects ? res?.subjects : []

console.log(this.currentuser)
console.log(this.subjectarray)
})
}
}
 