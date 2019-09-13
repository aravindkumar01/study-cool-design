import { Component, OnInit } from '@angular/core';

import { FormControl, Validators } from '@angular/forms';
import { SubjectService } from '../service/subject.service';
import { Router, ActivatedRoute } from '@angular/router';
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

  title:string="Add new subject";
  semster:Semster[]=[
    {name:"odd"},{name:"even"}
  ];

  subject_id:number;
  c_id:number;
  subject:Subject=new Subject();
  buttonName:string="Create";
  nameControl = new FormControl('', [Validators.required]);
  yearControl = new FormControl('', [Validators.required]);
  semsterControl = new FormControl('', [Validators.required]);
    unitControl=new FormControl('', [Validators.required]);
  constructor(private service:SubjectService,private router: Router,private route: ActivatedRoute) { }

  ngOnInit() {
   
    //get param values
    this.route.params.subscribe(params => {
      this.subject_id = params['sid'];
      this.c_id=params['cid'];
    });  
    

    if(this.subject_id!=null && this.subject_id > 0) { 
      this.title="Update Subject";     
      this.buttonName="Update";
       this.service.getSubject(+ this.subject_id).pipe(first()).subscribe(subject => {   
                   this.subject=subject;
           });  
         
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
    this.router.navigate(['/admin/subject/'+this.c_id]);  
  }

  
  onSubmit() {
    this.save();
  }

}
