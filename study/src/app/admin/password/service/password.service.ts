import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from 'src/app/constants/constants';
import { Url } from 'src/app/URL/url';
import { Password } from '../model/password';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  private baseURL=Url.baseURL+Url.restUrl+Url.passwordUrl;
  constructor(private http: HttpClient) {

  
   }

  getUser(id: number){
    var token= Constants.token_prefix+ localStorage.getItem('token');
    const headers = new HttpHeaders({Authorization:token});
    return this.http.get<Password>(`${this.baseURL}/${id}`,{headers});
  }



  getUserList(){
    var token= Constants.token_prefix+ localStorage.getItem('token');
    const headers = new HttpHeaders({Authorization:token});
    return this.http.get<Password[]>(`${this.baseURL}`,{headers});
  }

  updateUser(password: any) {
    var token= Constants.token_prefix+ localStorage.getItem('token');
    const headers = new HttpHeaders({Authorization:token});    
    return this.http.post(this.baseURL, password,{headers});
  }



  deleteUser(username:string){
    var token= Constants.token_prefix+ localStorage.getItem('token');
    const headers = new HttpHeaders({Authorization:token});       
    return this.http.delete(`${this.baseURL}/${username}`,{headers});
  }
}
