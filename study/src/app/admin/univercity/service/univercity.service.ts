import { Injectable } from '@angular/core';
import { Url } from 'src/app/URL/url';
import { Univercity } from '../model/univercity';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Constants } from 'src/app/constants/constants';

@Injectable({
  providedIn: 'root'
})
export class UnivercityService {

  private baseURL=Url.baseURL+Url.restUrl+Url.univercityUrl;
  constructor(private http: HttpClient) {

  
   }

  ngOnint(){
     
  }

  getUnivercity(id: number){
    var token= Constants.token_prefix+ localStorage.getItem('token');
    const headers = new HttpHeaders({Authorization:token});
    return this.http.get<Univercity>(`${this.baseURL}/${id}`,{headers});
  }

  createUnivercity(univercity: any){   
    var token= Constants.token_prefix+ localStorage.getItem('token');
    const headers = new HttpHeaders({Authorization:token});    
    return this.http.post(this.baseURL, univercity,{headers});
  }

  updateUnivericty(univercity: any) {
    var token= Constants.token_prefix+ localStorage.getItem('token');
    const headers = new HttpHeaders({Authorization:token});    
    return this.http.post(this.baseURL, univercity,{headers});
  }


  getUniverictyList() {
    var token= Constants.token_prefix+ localStorage.getItem('token');
    const headers = new HttpHeaders({Authorization:token});       
    return this.http.get<Univercity[]>(this.baseURL,{headers});
  }

  deleteUnivercity(id: number){
    var token= Constants.token_prefix+ localStorage.getItem('token');
    const headers = new HttpHeaders({Authorization:token});       
    return this.http.delete(`${this.baseURL}/${id}`,{headers});
  }
}
