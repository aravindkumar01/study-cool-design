import { Injectable } from '@angular/core';
import { Url } from 'src/app/URL/url';
import { Constants } from 'src/app/constants/constants';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Subject } from '../model/subject';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

   
  private baseURL=Url.baseURL+Url.restUrl+Url.subjectUrl;
 
  constructor(private http: HttpClient) {
    
   }

  ngOnint(){
     
  }
 
  getSubject(id: number){
    var token= Constants.token_prefix+ localStorage.getItem('token');
    const headers = new HttpHeaders({Authorization:token});       
     return this.http.get<Subject>(`${this.baseURL}/${id}`,{headers});
  }

  createSubject(user: any): Observable<any> {
    var token= Constants.token_prefix+ localStorage.getItem('token');
    const headers = new HttpHeaders({Authorization:token});    
    return this.http.post(this.baseURL, user,{headers});
  }

  signupSubject(user: any): Observable<any> {
    var url=Url.baseURL+Url.registerURL;      
    return this.http.post(url, user);
  }


  getSubjectListByCourse(id:any) {
   var token= Constants.token_prefix+ localStorage.getItem('token');
   const headers = new HttpHeaders({Authorization:token});
    return this.http.get<Subject[]>(this.baseURL+'/course/'+id,{headers});
  }
  getSubjectListByCourseDash(id:any) {
    var token= Constants.token_prefix+ localStorage.getItem('token');
    const headers = new HttpHeaders({Authorization:token});
     return this.http.get<any>(this.baseURL+'/course/dash/'+id,{headers});
   }
  getSubjectList() {
    var token= Constants.token_prefix+ localStorage.getItem('token');
    const headers = new HttpHeaders({Authorization:token});
     return this.http.get<Subject[]>(this.baseURL,{headers});
   }

  deleteSubject(username: number){   
   var token= Constants.token_prefix+ localStorage.getItem('token');
   const headers = new HttpHeaders({Authorization:token});   
    return this.http.delete(this.baseURL+'/'+username,{headers});  
     
  
  }

}
