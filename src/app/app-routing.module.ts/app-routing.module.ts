import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { SubjectComponent } from '../subject/subject.component';
import { NewExamComponent } from '../new-exam/new-exam.component';
import { TextComponent } from '../text/text.component';
import { StudentsComponent } from '../students/students.component';


const routes: Routes = [
  {path:'',component:RegisterComponent},
 {path:'login',component:LoginComponent},
 {path:'register',component:RegisterComponent},
 {path:'subject',component:SubjectComponent},
 {path:'new-exam',component:NewExamComponent},
 {path:'text/:id',component:TextComponent},
 {path:'students',component:StudentsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
