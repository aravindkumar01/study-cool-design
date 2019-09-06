import { Component, OnInit } from '@angular/core';

import { FormControl, Validators } from '@angular/forms';
import { SubjectService } from '../service/subject.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Subject } from '../model/subject';

export interface Year {
  count:number;
}

export interface Semster {
  name:string;
}
@Component({
  selector: 'app-addsubject',
  templateUrl: './addsubject.component.html',
  styleUrls: ['./addsubject.component.css']
})
export class AddsubjectComponent implements OnInit {

  year:Year[]=[
    {count:1},
    {count:2},
    {count:3}    
  ];

  semster:Semster[]=[
    {name:"odd"},{name:"even"}
  ];

  c_id:number;
  subject:Subject=new Subject();
  buttonName:string="Create";
  nameControl = new FormControl('', [Validators.required]);
  yearControl = new FormControl('', [Validators.required]);
  semsterControl = new FormControl('', [Validators.required]);
    unitControl=new FormControl('', [Validators.required]);
  constructor(private service:SubjectService,private router: Router) { }

  ngOnInit() {
   
    let SubjectId = localStorage.getItem("SubjectId");
    this.c_id=+localStorage.getItem("CourseId");

    if(SubjectId!=null) {      
      this.buttonName="Update";
       this.service.getSubject(+ SubjectId).pipe(first()).subscribe(subject => {   
                   this.subject=subject;
           });
          localStorage.removeItem("SubjectId");
         
    }
    
  }
  save() {    
    this.subject.course_id=this.c_id;   
    this.service.createSubject(this.subject)  
      .subscribe(
        data => {
          alert(data);     
        },
        error => {
          console.log(error);         
          alert(error.error.text);
          
        }
        );
    this.subject = new Subject();
   
    this.router.navigate(['/admin/subject']);
   // window.location.reload();
  }

  
  onSubmit() {
    localStorage.removeItem("SubjectId");  
    this.save();
  }

}
