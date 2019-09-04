import { Injectable } from '@angular/core';
import { Url } from 'src/app/URL/url';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constants } from 'src/app/constants/constants';
import { Role } from '../model/role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
 
  

  private baseURL=Url.baseURL+Url.restUrl+Url.roleUrl;
  constructor(private http: HttpClient) { }


  
  getRole(id: number){
    var token= Constants.token_prefix+ localStorage.getItem('token');
    const headers = new HttpHeaders({Authorization:token});
    return this.http.get<Role>(`${this.baseURL}/${id}`,{headers});
  }

  createRole(role: any){   
    var token= Constants.token_prefix+ localStorage.getItem('token');
    const headers = new HttpHeaders({Authorization:token});    
    return this.http.post(this.baseURL, role,{headers});
  }

  updateRole(role: any) {
    var token= Constants.token_prefix+ localStorage.getItem('token');
    const headers = new HttpHeaders({Authorization:token});    
    return this.http.post(this.baseURL, role,{headers});
  }


  getRoleList() {
    var token= Constants.token_prefix+ localStorage.getItem('token');
    const headers = new HttpHeaders({Authorization:token});       
    return this.http.get<Role[]>(this.baseURL,{headers});
  }

  getRoleListRegs() {
    var token= Constants.token_prefix+ localStorage.getItem('token');
    const headers = new HttpHeaders({Authorization:token});       
    return this.http.get<Role[]>(this.baseURL+'/regs');
  }

  deleteRole(id: number){
    var token= Constants.token_prefix+ localStorage.getItem('token');
    const headers = new HttpHeaders({Authorization:token});       
    return this.http.delete(`${this.baseURL}/${id}`,{headers});
  }

}
