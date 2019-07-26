import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { HttpHeaders } from '@angular/common/http';
import { Users } from '../users/users';
import { tokenName } from '@angular/compiler';
import { Url } from 'src/app/URL/url';
import { Router } from '@angular/router';


export class LoginUser {
  username:string;
  password:string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  constructor(private http: HttpClient,private router: Router) { }

  private baseUrl=Url.baseURL+Url.loginURL;
  

  loginUserBoolean(users:LoginUser) {
      var s=false;
     
     return this.http.post<any>(this.baseUrl, users);
      
    }



  }

/*
this.http.post<any>(this.baseUrl, users).subscribe(     
  data => {   
    //alert(data);      
    localStorage.setItem('token',data.token);   
     console.log(localStorage.getItem('token'));
        if(data!=null)  
        {
          this.router.navigate(['/admin/users']);
        }         
  },
  error => {        
  // alert(JSON.stringify(error.error));        
  return true; 
  });
  return null;*/