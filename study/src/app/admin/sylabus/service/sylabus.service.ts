import { Injectable } from '@angular/core';
import { Url } from 'src/app/URL/url';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constants } from 'src/app/constants/constants';
import { Sylabus } from '../model/sylabus';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SylabusService {

 
   
  private baseURL=Url.baseURL+Url.restUrl+Url.sylabusUrl;
 
  constructor(private http: HttpClient) {
    
   }

  ngOnint(){
     
  }
 
  getSylabus(id: number){
    var token= Constants.token_prefix+ localStorage.getItem('token');
    const headers = new HttpHeaders({Authorization:token});       
     return this.http.get<Sylabus>(`${this.baseURL}/${id}`,{headers});
  }

  createSylabus(sylabus: any): Observable<any> {
    var token= Constants.token_prefix+ localStorage.getItem('token');
    const headers = new HttpHeaders({Authorization:token});    
    return this.http.post(this.baseURL, sylabus,{headers});
  }

  

  getSylabusListBySubject(id:any) {
   var token= Constants.token_prefix+ localStorage.getItem('token');
   const headers = new HttpHeaders({Authorization:token});
    return this.http.get<Sylabus[]>(this.baseURL+'/subject/'+id,{headers});
  }
  getSylabusList() {
    var token= Constants.token_prefix+ localStorage.getItem('token');
    const headers = new HttpHeaders({Authorization:token});
     return this.http.get<Sylabus[]>(this.baseURL,{headers});
   }

  deleteSylabus(id: number){   
   var token= Constants.token_prefix+ localStorage.getItem('token');
   const headers = new HttpHeaders({Authorization:token});   
    return this.http.delete(this.baseURL+'/'+id,{headers});  
     
  
  }

}
