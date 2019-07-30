import { Component, OnInit } from '@angular/core';
import { Subject } from '../model/subject';
import { FormControl, Validators } from '@angular/forms';
import { SubjectService } from '../service/subject.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addsubject',
  templateUrl: './addsubject.component.html',
  styleUrls: ['./addsubject.component.css']
})
export class AddsubjectComponent implements OnInit {
  /*subject:Subject=new Subject();
  buttonName:string="Create";
  // univercity:Univercity[];
  nameControl = new FormControl('', [Validators.required]);
  addressControl = new FormControl('', [Validators.required]);
  locationControl = new FormControl('', [Validators.required]);
  
  constructor(private service:SubjectService,private router: Router) { }

  ngOnInit() {
    let SubjectId = localStorage.getItem("SubjectId");

    if(SubjectId!=null) {
      this.buttonName="Update";
       this.service.getSubject(+ SubjectId).pipe(first()).subscribe(univercity => {   
           this.subject=univercity; });
          localStorage.removeItem("UnivercityId");
    }
    
  }
  save() {
    this.service.createUnivercity(this.univercity)  
      .subscribe(
        data => {
          alert(data);     
        },
        error => {
          console.log(error);         
          alert(error.error.text);
          
        }
        );
    this.univercity = new Univercity();
   
    this.router.navigate(['/admin/univercity']);
   // window.location.reload();
  }

  
  onSubmit() {

    if(localStorage.getItem("UnivercityId")!=null) { this.update();}
    if(localStorage.getItem("UnivercityId")==null){ this.save();}
    localStorage.removeItem("UnivercityId");  
  
  }
*/

ngOnInit() {
}
}
