import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constants } from 'src/app/constants/constants';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {


  SERVER_URL = "http://localhost:8091/api/upload";
  uploadForm: FormGroup;  
  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient) { }

  ngOnInit() {
    this.uploadForm = this.formBuilder.group({
      profile: ['']
    });
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('profile').setValue(file);
    }
  }
  onSubmit() {
    var token= Constants.token_prefix+ localStorage.getItem('token');
   const headers = new HttpHeaders({Authorization:token});   
    const formData = new FormData();

    const name={"file_name":"sss","file_path":"2"};
    
    formData.append('file', this.uploadForm.get('profile').value);
    formData.append("name",JSON.stringify(name));
    this.httpClient.post<any>(this.SERVER_URL, formData,{headers}).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }
}
