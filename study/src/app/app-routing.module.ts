import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { MenuComponent } from './menu/menu.component';
import { LoginlayoutComponent } from './loginlayout/loginlayout.component';
import { HomeLayoutComponent } from './home-layout/home-layout.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { UnivercityComponent } from './admin/univercity/univercity.component';
import { UsersComponent } from './admin/users/users.component';
import { SylabusComponent } from './admin/sylabus/sylabus.component';
import { AdduserComponent } from './admin/users/adduser/adduser.component';

import { 
  RoleGuardService as RoleGuard 
} from './auth/role-guard.service';
import { AddunivercityComponent } from './admin/univercity/addunivercity/addunivercity.component';
import { CourseComponent } from './admin/course/course.component';
import { AddcourseComponent } from './admin/course/addcourse/addcourse.component';
import { SubjectComponent } from './admin/subject/subject.component';
import { AddsubjectComponent } from './admin/subject/addsubject/addsubject.component';
import { AddsylabusComponent } from './admin/sylabus/addsylabus/addsylabus.component';

const routes: Routes = [

  { path: '', redirectTo: 'login', data: { title: 'First Component' }, pathMatch: 'full' },
  {
    path: 'login', component: LoginlayoutComponent, data: {title: 'First Component'},
    children: [
      {path: '', component: LoginComponent}
    ]
  },
  {
    path: 'register', component: LoginlayoutComponent, data: {title: 'First Component'},
    children: [
      {path: '', component: RegisterComponent}
    ]
  },

  { path: 'admin', component: HomeLayoutComponent,  
  children: [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'users', component: UsersComponent  },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'adduser', component: AdduserComponent },
    { path: 'univercity', component: UnivercityComponent },
    { path: 'addunivercity', component: AddunivercityComponent },
    { path: 'course', component: CourseComponent },
    { path: 'addcourse', component: AddcourseComponent},
    { path: 'subject', component: SubjectComponent},
    { path: 'addsubject', component: AddsubjectComponent},
    { path: 'sylabus', component: SylabusComponent },
    { path: 'addsylabus', component: AddsylabusComponent }
   
  ], canActivate: [RoleGuard], 
  runGuardsAndResolvers: "always",
  data: { 
    expectedRole: 'ROLE_ADMIN',
    
  }
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 







}
