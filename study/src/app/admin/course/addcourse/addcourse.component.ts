import { Component, OnInit } from '@angular/core';
import { Course } from '../model/course';
import { FormControl, Validators } from '@angular/forms';
import { Univercity } from '../../univercity/model/univercity';
import { CourseService } from '../service/course.service';
import { Router } from '@angular/router';
import { UnivercityService } from '../../univercity/service/univercity.service';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-addcourse',
  templateUrl: './addcourse.component.html',
  styleUrls: ['./addcourse.component.css']
})
export class AddcourseComponent implements OnInit {

  course:Course = new Course();
  buttonName:string="Create";
  uni:Univercity=new Univercity();
  nameControl = new FormControl('', [Validators.required]);
  univercityControl = new FormControl('', Validators.required);
  yearsControl= new FormControl('', Validators.required);
  constructor(private service:CourseService,private router: Router,private u:UnivercityService) {

    this.u.getUniverictyList().subscribe(res =>
      {
        this.univercity=res;    
       
      });
   }


  univercity: Univercity[];

  ngOnInit() {
    let CourseId = localStorage.getItem("CourseId");

    if(CourseId!=null) {
      this.buttonName="Update";
       this.service.getCourse(+ CourseId).pipe(first()).subscribe(course => {           
           this.course=course; 
           this.uni.id=course.univercity.id;
          });
          localStorage.removeItem("CourseId");
    }
    
  }
  save() {
    this.service.createCourse(this.course,this.uni.id)  
      .subscribe(
        data => {
         // alert(data);     
        },
        error => {
          console.log(error);         
         alert(error.error.text);
        
        }
        );
    this.course = new Course();
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
    this.router.navigate(['/admin/course']));
  //  / this.router.navigate(['/admin/course']);
   // window.location.reload();
  }

 
  onSubmit() {

    this.save();
    localStorage.removeItem("CourseId");  
  
  }

}
