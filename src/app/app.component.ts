import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RegisterService } from './register.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{


  constructor(private registerservice:RegisterService){

  }

  ngOnInit(): void {
    this.getrole()

   }
getrole(){
this.registerservice.getrole().subscribe((res:any)=>{
  console.log(res[0].role)
  this.registerservice.subject.next(res[0])
})
}
  title = 'quiz';
}
