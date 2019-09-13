import { Component, OnInit } from '@angular/core';
import { Sylabus } from '../model/sylabus';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { SylabusService } from '../service/sylabus.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constants } from 'src/app/constants/constants';

export interface Unit {
  count:number;
}
@Component({
  selector: 'app-addsylabus',
  templateUrl: './addsylabus.component.html',
  styleUrls: ['./addsylabus.component.css']
})


export class AddsylabusComponent implements OnInit {
  uploadForm: FormGroup; 
  
  unit:Unit[]=[
    {count:1},
    {count:2},
    {count:3},{count:4},{count:5} 
  ];


  s_id:number;
  sylabus:Sylabus=new Sylabus();
  buttonName:string="Create";
  topicControl = new FormControl('', [Validators.required]);
  unitControl = new FormControl('', [Validators.required]);
  semsterControl = new FormControl('', [Validators.required]);
  //fileControl = new FormControl('', [Validators.required]);
  
  constructor(private httpClient: HttpClient,private formBuilder: FormBuilder,private service:SylabusService,private router: Router) { }

  ngOnInit() {
    this.uploadForm = this.formBuilder.group({
      file: ['']
    });
    let SylabusId = localStorage.getItem("SylabusId");
    this.s_id=+localStorage.getItem("SubjectId");

    if(SylabusId!=null) {          
      this.buttonName="Update";
       this.service.getSylabus(+ SylabusId).pipe(first()).subscribe(sylabus => {   
         console.log("Sylabus"+sylabus)
           this.sylabus=sylabus;
           });
          localStorage.removeItem("SubjectId");
          localStorage.removeItem("SylabusId");
    }
    
  }
  save() {
    this.sylabus.subject_id=this.s_id;
    const formData = new FormData();
    const name=this.sylabus;
    console.log(this.sylabus);
    formData.append('file', this.uploadForm.get('file').value);
    formData.append("name",JSON.stringify(name));

    
    console.log("save"+this.sylabus);
    this.service.createSylabus(formData)  
      .subscribe(
        data => {
          alert(data);     
        },
        error => {
          console.log(error);         
          alert(error.error.text);
          
        }
        );
    this.sylabus = new Sylabus();
   
    this.router.navigate(['/admin/sylabus']);
   // window.location.reload();
  }

  onSubmit() {
        localStorage.removeItem("SylabusId");  
        this.save();

  }


  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('file').setValue(file);
    }
  }

}
