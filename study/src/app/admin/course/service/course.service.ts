import { Injectable } from '@angular/core';
import { Url } from 'src/app/URL/url';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constants } from 'src/app/constants/constants';
import { Course } from '../model/course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

 
  private baseURL=Url.baseURL+Url.restUrl+Url.courseUrl;
  constructor(private http: HttpClient) {

  
   }

  ngOnint(){
     
  }

  getCourse(id: number){
    var token= Constants.token_prefix+ localStorage.getItem('token');
    const headers = new HttpHeaders({Authorization:token});
    return this.http.get<Course>(`${this.baseURL}/${id}`,{headers});
  }

  createCourse(course: any,univercity_id:number){   
    var token= Constants.token_prefix+ localStorage.getItem('token');
    const headers = new HttpHeaders({Authorization:token});   
    this.baseURL+='/'+univercity_id;  
    return this.http.post(this.baseURL,course,{headers});
  }

  updateCourse(course: any) {
    var token= Constants.token_prefix+ localStorage.getItem('token');
    const headers = new HttpHeaders({Authorization:token});    
    return this.http.post(this.baseURL, course,{headers});
  }


  getCourseList() {
    var token= Constants.token_prefix+ localStorage.getItem('token');
    const headers = new HttpHeaders({Authorization:token});       
    return this.http.get<any[]>(this.baseURL,{headers});
  }

  deleteCourse(id: number){
    var token= Constants.token_prefix+ localStorage.getItem('token');
    const headers = new HttpHeaders({Authorization:token});       
    return this.http.delete(`${this.baseURL}/${id}`,{headers});
  }

}
