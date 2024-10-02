import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../register.service';

@Component({
  selector: 'app-navbar',

  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  user:any = null 
  constructor(private registerservice:RegisterService){}
  ngOnInit(): void {

 this.registerservice.user.subscribe(res=>{
  if(res.role){
    this.user = res
    console.log(this.user)
  }
 })
  }
  logout(){
    let model ={}
    this.registerservice.login(model).subscribe(res=>{
      //window.location.reload()
      this.user = null
      this.registerservice.subject.next(res)
    })
  }
}
