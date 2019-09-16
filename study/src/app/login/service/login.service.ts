import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

    resetPassword(username:string) {  
      var url=  Url.baseURL+Url.restUrl+'/'+'forgetpassword/'+username;
      alert(url);
        return this.http.get<any>(url);
          
        }



  }
