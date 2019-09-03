import { Injectable } from '@angular/core';
import { Url } from 'src/app/URL/url';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constants } from 'src/app/constants/constants';
import { Blogs } from '../model/blogs';

@Injectable({
  providedIn: 'root'
})
export class BlogsService {

 
  private baseURL=Url.baseURL+Url.restUrl+Url.blogsUrl;
  constructor(private http: HttpClient) {

  
   }

  ngOnint(){
     
  }
  getBlog(id: any){
    var token= Constants.token_prefix+ localStorage.getItem('token');
    const headers = new HttpHeaders({Authorization:token});
    return this.http.get<Blogs>(`${this.baseURL}/${id}`,{headers});
  }
  
  createBlogs(blogs: any){   
    var token= Constants.token_prefix+ localStorage.getItem('token');
    const headers = new HttpHeaders({Authorization:token});    
    return this.http.post(this.baseURL, blogs,{headers});
  }

  getBlogsListByDash() {
    var token= Constants.token_prefix+ localStorage.getItem('token');
    const headers = new HttpHeaders({Authorization:token});       
    return this.http.get<Blogs[]>(this.baseURL+'/dash',{headers});
  }
  

}