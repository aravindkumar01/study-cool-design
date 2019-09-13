import { Component, OnInit } from '@angular/core';
import { Course } from '../model/course';
import { FormControl, Validators } from '@angular/forms';
import { Univercity } from '../../univercity/model/univercity';
import { CourseService } from '../service/course.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UnivercityService } from '../../univercity/service/univercity.service';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-addcourse',
  templateUrl: './addcourse.component.html',
  styleUrls: ['./addcourse.component.css']
})
export class AddcourseComponent implements OnInit {

  title:string="Add new Course";
  course_id:number;
  course:Course = new Course();
  buttonName:string="Create";
  uni:Univercity=new Univercity();
  nameControl = new FormControl('', [Validators.required]);
  univercityControl = new FormControl('', Validators.required);
  yearsControl= new FormControl('', Validators.required);
  constructor(private service:CourseService,private router: Router,private u:UnivercityService
    ,private route: ActivatedRoute) {
    
   }


  univercity: Univercity[];

  ngOnInit() {   

    //get param values
    this.route.params.subscribe(params => {
      this.course_id = params['id'];
    });

  this.setUnivercitySelect();

    if(this.course_id!=null && this.course_id >0) {
      this.title="Update Course";
      this.buttonName="Update";
       this.service.getCourse(+ this.course_id).pipe(first()).subscribe(course => {           
           this.course=course; 
           this.uni.id=course.univercity.id;
          });
         
    }
    
  }
  save() {
    this.service.createCourse(this.course,this.uni.id)  
      .subscribe(data => {
         // alert(data);     
        },error => {
          console.log(error);         
         alert(error.error.text);
        
        });
    this.course = new Course();
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
    this.router.navigate(['/admin/course']));
  
  }

 
  onSubmit() {
    this.save();
  }


  setUnivercitySelect(){
      this.u.getUniverictyList().subscribe(res =>
        {
          this.univercity=res;    
        
        });
  }

}
