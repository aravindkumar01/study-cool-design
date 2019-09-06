import { Fileupload } from './../model/fileupload';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Url } from 'src/app/URL/url';
import { Observable } from 'rxjs';
import { Constants } from 'src/app/constants/constants';

@Injectable({
  providedIn: 'root'
})
export class FileService {

   
  private baseURL=Url.baseURL+Url.restUrl+Url.fileUrl;
 
  constructor(private http: HttpClient) {
    
   }

  ngOnint(){
     
  }


  addFileProcess(file: any): Observable<any> {
    var token= Constants.token_prefix+ localStorage.getItem('token');
    const headers = new HttpHeaders({Authorization:token});    
    return this.http.post(this.baseURL, file,{headers});
  }


  getFiles() {
    var token= Constants.token_prefix+ localStorage.getItem('token');
    const headers = new HttpHeaders({Authorization:token});       
    return this.http.get<Fileupload[]>(this.baseURL,{headers});
  }
  deleteFile(id: number){
    var token= Constants.token_prefix+ localStorage.getItem('token');
    const headers = new HttpHeaders({Authorization:token});       
    return this.http.delete(`${this.baseURL}/${id}`,{headers});
  }

  startFile(id: number){
    var token= Constants.token_prefix+ localStorage.getItem('token');
    const headers = new HttpHeaders({Authorization:token});       
    return this.http.get<any>(`${this.baseURL}/start/${id}`,{headers});
  }
 

}
