import { MyblogsComponent } from './blogs/myblogs/myblogs.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddcourseComponent } from './admin/course/addcourse/addcourse.component';
import { CourseComponent } from './admin/course/course.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AddfileComponent } from './admin/fileupload/addfile/addfile.component';
import { FileuploadComponent } from './admin/fileupload/fileupload.component';
import { EditpasswordComponent } from './admin/password/editpassword/editpassword.component';
import { PasswordComponent } from './admin/password/password.component';
import { AddroleComponent } from './admin/role/addrole/addrole.component';
import { RoleComponent } from './admin/role/role.component';
import { AddsubjectComponent } from './admin/subject/addsubject/addsubject.component';
import { SubjectComponent } from './admin/subject/subject.component';
import { AddsylabusComponent } from './admin/sylabus/addsylabus/addsylabus.component';
import { CreatecsylabusComponent } from './admin/sylabus/createcsylabus/createcsylabus.component';
import { SylabusComponent } from './admin/sylabus/sylabus.component';
import { AddunivercityComponent } from './admin/univercity/addunivercity/addunivercity.component';
import { UnivercityComponent } from './admin/univercity/univercity.component';
import { AdduserComponent } from './admin/users/adduser/adduser.component';
import { UsersComponent } from './admin/users/users.component';
import { RoleGuardService as RoleGuard } from './auth/role-guard.service';
import { BlogReaderComponent } from './blogs/blog-reader/blog-reader.component';
import { BlogWriterComponent } from './blogs/blog-writer/blog-writer.component';
import { BlogsComponent } from './blogs/blogs.component';
import { HomeLayoutComponent } from './home-layout/home-layout.component';
import { LoginComponent } from './login/login.component';
import { LoginlayoutComponent } from './loginlayout/loginlayout.component';
import { LogoutComponent } from './logout/logout/logout.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { StaffHomeComponent } from './staff/staff-home/staff-home.component';
import { StaffLayoutComponent } from './staff/staff-layout/staff-layout.component';
import { ContentComponent } from './user/content/content.component';
import { UserCourseComponent } from './user/user-course/user-course.component';
import { UserHomeComponent } from './user/user-home/user-home.component';
import { UserLayoutComponent } from './user/user-layout/user-layout.component';
import { RestpasswordComponent } from './restpassword/restpassword.component';


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
  {
    path: 'forget', component: LoginlayoutComponent, data: {title: 'First Component'},
    children: [
      {path: '', component: RestpasswordComponent}
    ]
  },
  
  { path: 'admin', component: HomeLayoutComponent,  
  children: [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },    
    { path: 'password', component: PasswordComponent  },   
    { path: 'password/:id', component: EditpasswordComponent  },    
    { path: 'users', component: UsersComponent  },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'adduser', component: AdduserComponent },
    { path: 'univercity', component: UnivercityComponent },
    { path: 'addunivercity', component: AddunivercityComponent },
    { path: 'course', component: CourseComponent },
    { path: 'addcourse/:id', component: AddcourseComponent},
    { path: 'subject/:cid', component: SubjectComponent},
    { path: 'addsubject/:cid/:sid', component: AddsubjectComponent},
    { path: 'sylabus/:sid', component: SylabusComponent },
    { path: 'addsylabus', component: AddsylabusComponent },
    { path: 'createsylabus/:sid/:id', component: CreatecsylabusComponent },
    { path: 'profile', component: ProfileComponent  },
    { path: 'role', component: RoleComponent  },    
    { path: 'role/:id', component: AddroleComponent  },
    { path: 'file', component: FileuploadComponent  },
    { path: 'addfile', component: AddfileComponent  },
    { path: 'blogs', component: BlogsComponent  },
    { path: 'blog/writer', component: BlogWriterComponent  },
    { path: 'myblogs', component:MyblogsComponent  },    
    { path: 'blog/:id', component: BlogReaderComponent  },
    {path:'logout',component:LogoutComponent}
   
  ], canActivate: [RoleGuard], 
  runGuardsAndResolvers: "always",
  data: { 
    expectedRole: 'ROLE_ADMIN',    
  }
  },

  { path: 'user', component: UserLayoutComponent,  
  children: [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: UserHomeComponent  },
    {path:"course",component:UserCourseComponent},
    { path: 'blogs', component: BlogsComponent  },
    { path: 'blog/writer', component: BlogWriterComponent  },
    { path: 'myblogs', component:MyblogsComponent  },    
    { path: 'blog/:id', component: BlogReaderComponent  },
    { path: 'profile', component: ProfileComponent  },
    { path: 'content/:id', component: ContentComponent  },
    {path:'logout',component:LogoutComponent}
    
  ], canActivate: [RoleGuard], 
  runGuardsAndResolvers: "always",
  data: { 
    expectedRole: 'ROLE_STUDENT' 
   
  }
}
  , { path: 'staff', component: StaffLayoutComponent,  
  children: [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: StaffHomeComponent  },
    { path: 'blogs', component: BlogsComponent  },
    { path: 'myblogs', component:MyblogsComponent},    
    { path: 'blog/writer', component: BlogWriterComponent  },
    { path: 'blog/:id', component: BlogReaderComponent  },
    { path: 'profile', component: ProfileComponent  },
    {path:'logout',component:LogoutComponent}
    
  ], canActivate: [RoleGuard], 
  runGuardsAndResolvers: "always",
  data: { 
    expectedRole: 'ROLE_STAFF' 
   
  }
}
  

];
/*{name:"Home",link:"/user/home",icon_name:"home"},
    {name:"Course",link:"/user/course",icon_name:"account_box"},
    {name:"Chats",link:"/user/chats",icon_name:"markunread_mailbox"},
    {name:"Blogs",link:"/user/blogs",icon_name:"file_copy"},
    {name:"Profile",link:"/user/profile",icon_name:"collections_bookmark "},
    {name:"Logout",link:"/user/logout",icon_name:"note_add"}    */

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 







}
