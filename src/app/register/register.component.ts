import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from '../register.service';
import { Route, Router } from '@angular/router';
import { emitDistinctChangesOnlyDefaultValue } from '@angular/compiler';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',

  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
formgroup!:FormGroup
emails:any[]=[]
id:any=0
  constructor(private fb:FormBuilder,private registerservice:RegisterService,private router:Router,private toaster:ToastrService){

  }
  ngOnInit(): void {
 this.formgroup = this.fb.group({
  name:new FormControl('',Validators.required),
  email:new FormControl('',[Validators.required,Validators.email]),
  password:new FormControl('',[Validators.required,Validators.minLength(3)]),
  confirmpassword:new FormControl('',[Validators.required,Validators.minLength(3)])
 })
 this.getallemails()
   }

createaccount(){
  
  const model = {
  name:this.formgroup.value.name,
  email:this.formgroup.value.email,
  password:this.formgroup.value.password,
  
  }
  
  let index =  this.emails.findIndex((item)=> item.email == this.formgroup.value.email )
if(index !== -1){

  this.toaster.error('الايمال موجود بالفعل ')
}else{
  this.toaster.success('تم التسجيل بنجاح')
  this.registerservice.createaccount(model).subscribe(res=>{

   this.router.navigate(['subject'])
 })
}

}
getallemails(){
  this.registerservice.getemails().subscribe((res:any)=>{
this.emails  = res

   })
}
 
}
