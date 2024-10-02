import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from '../register.service';
import { Route, Router } from '@angular/router';
import { emitDistinctChangesOnlyDefaultValue } from '@angular/compiler';
import { ToastrService } from 'ngx-toastr';
import { coerceStringArray } from '@angular/cdk/coercion';
import { SubjectsService } from '../subjects.service';


@Component({
  selector: 'app-login',

  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  formgroup!:FormGroup
  data:any[]=[]
  type:string = "students"
  id:number = 0
  constructor( private services:SubjectsService,private router:Router,private toaster :ToastrService, private registerservice:RegisterService,private loginservices:LoginService , private fb:FormBuilder){

}
  ngOnInit(): void {
    this.formgroup = this.fb.group({
      type:[this.type,Validators.required],
       email:new FormControl('',[Validators.required,Validators.email]),
      password:new FormControl('',[Validators.required,Validators.minLength(3)]),
      })

  }
  getuser(){
 this.registerservice.getuser(this.type).subscribe((res:any)=>{
  this.data = res

})

}
getrole(event:any){
this.type = event.value
this.getuser()
}
submit(){

  let index  = this.data.findIndex((ele) => ele.email == this.formgroup.value.email && ele.password == this.formgroup.value.password)
  if(index == -1){
    this.toaster.error('البيانات خاطاءه')
  }
  else{ 
    const model ={
      username:this.data[index].name,
      role:this.type,
      userid:this.data[index].id
    }
    this.registerservice.login(model).subscribe((res:any)=>{
     this.registerservice.subject.next(res)
     this.toaster.success('تمت العمليه بنجاح')
     
    })
    this.router.navigate(['subject'])
  }
}
 
}
