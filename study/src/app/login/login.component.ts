import { Component, OnInit } from '@angular/core';
import { LoginService, LoginUser } from './service/login.service';

import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../admin/users/service/user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Users } from './users/users';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  
  users:LoginUser=new LoginUser();
   //users:Users=new Users();
   response:boolean=false;
   credentials = {username: '', password: ''};
  constructor(private service:LoginService,private router: Router,private userService:UserService,
     private http: HttpClient) {      
     }

  ngOnInit() {
    var res= localStorage.getItem('login');    
    if(res!=null)
    {
      this.response=true;
    } 
    localStorage.removeItem('token');   
    localStorage.removeItem('login');       
  }
  

  login()
  {    
   this.service.loginUserBoolean(this.users).subscribe(     
    data => {   
      //alert(data);      
      localStorage.setItem('token',data.token);   
       //console.log(localStorage.getItem('token'));
          if(data!=null)  
          {
            this.router.navigate(['/admin/users']);
          }     
    },
    error => {
        window.location.reload();
        localStorage.setItem('login',"true");   
        this.router.navigate(['/login']);     
   
    }); 
  }
  somethingChanged()
  {  
    this.response=false;
  }
}
