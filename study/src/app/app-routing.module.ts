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
import { ContentComponent } from './admin/content/content.component';
import { AdduserComponent } from './admin/users/adduser/adduser.component';

import { 
  AuthGuardService as AuthGuard 
} from './auth/auth-guard.service';
import { 
  RoleGuardService as RoleGuard 
} from './auth/role-guard.service';
import { AddunivercityComponent } from './admin/univercity/addunivercity/addunivercity.component';

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
    { path: 'course', component: RegisterComponent },
    { path: 'sylabus', component: SylabusComponent },
    { path: 'content', component: ContentComponent }
  ], canActivate: [RoleGuard], 
  data: { 
    expectedRole: 'ROLE_ADMIN'
  }
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 







}
