import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { HttpHeaders } from '@angular/common/http';
import { User } from '../modal/user';
import { Url } from 'src/app/URL/url';
import { Constants } from 'src/app/constants/constants';



@Injectable({
  providedIn: 'root'
})
export class UserService {

   
  private baseURL=Url.baseURL+Url.restUrl+Url.userUrl;
 
  constructor(private http: HttpClient) {
    
   }

  ngOnint(){
     
  }
 
  getUser(id: number){
    var token= Constants.token_prefix+ localStorage.getItem('token');
    const headers = new HttpHeaders({Authorization:token});       
     return this.http.get<User>(`${this.baseURL}/${id}`,{headers});
  }

  getUserByUsername(username:string){
    var token= Constants.token_prefix+ localStorage.getItem('token');
    const headers = new HttpHeaders({Authorization:token});       
     return this.http.get<any>(`${this.baseURL}/get/${username}`,{headers});
  }

  createUser(user: any): Observable<any> {
    var token= Constants.token_prefix+ localStorage.getItem('token');
    const headers = new HttpHeaders({Authorization:token});    
    return this.http.post(this.baseURL, user,{headers});
  }

  signupUser(user: any): Observable<any> {
    var url=Url.baseURL+Url.registerURL;      
    return this.http.post(url, user);
  }

  passwordChange(user: any) {
    var token= Constants.token_prefix+ localStorage.getItem('token');
    const headers = new HttpHeaders({Authorization:token});    
    return this.http.post(this.baseURL+"/password", user,{headers});
  }


  getUsersList() {
   var token= Constants.token_prefix+ localStorage.getItem('token');
   const headers = new HttpHeaders({Authorization:token});
    return this.http.get<User[]>(this.baseURL,{headers});
  }

  deleteUser(username: string){   
   var token= Constants.token_prefix+ localStorage.getItem('token');
   const headers = new HttpHeaders({Authorization:token});   
    return this.http.delete(this.baseURL+'/'+username,{headers});  
  }
}
