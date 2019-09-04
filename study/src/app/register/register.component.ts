import { CourseService } from './../admin/course/service/course.service';
import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormGroupDirective, NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../admin/users/service/user.service';
import { User } from '../admin/users/modal/user';
import { ErrorStateMatcher } from '@angular/material';
import { Univercity } from '../admin/univercity/model/univercity';
import { UserType, Course } from '../admin/users/adduser/adduser.component';
import { UnivercityService } from '../admin/univercity/service/univercity.service';
import { first } from 'rxjs/operators';
import { RoleService } from '../admin/role/service/role.service';
import { Role } from '../admin/role/model/role';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


 univercityControl = new FormControl('', [Validators.required]);
  userControl = new FormControl('', [Validators.required]);
  courseControl = new FormControl('', [Validators.required]);
  firstControl= new FormControl('', [Validators.required]);
  lastControl= new FormControl('', [Validators.required]);
  selectFormControl = new FormControl('', Validators.required);
  mobileFormControl = new FormControl('', Validators.required);
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  matcher = new MyErrorStateMatcher();
  
  univercity: Univercity[];
 

  course: Course[];
  role:Role[];

  user:User = new User();

  constructor(private service:UserService,private router: Router,
    private univercityService:UnivercityService,private roleService:RoleService,private courseService:CourseService) { }

  save() {

    this.service.signupUser(this.user)  
      .subscribe(
        data => {      
         this.router.navigate(['/login']);
        },
        error => {       
            if(error.error.text=="Sucess"){
              alert("Check Your Mail");
              this.router.navigate(['/login']);
            } else{
              alert(error.error.text);
            }
          
        }
        );
    this.user = new User();
    
  }

  onSubmit() {

    this.save();
    
  }
  ngOnInit() {
    this.setDropdown();

  }

  setDropdown(){
    //set univercity
    this.univercityService.getUniverictyList().pipe(first()).subscribe(univercity => {        
      this.univercity=univercity;
     });

     //set role
     this.roleService.getRoleListRegs().pipe(first()).subscribe(role => {               
      this.role=role;
     });

  }

  getCourse(value:any){
     if(value!=null && value!=""){
      this.courseService.getListByUnivrcity(value).pipe(first()).subscribe(course => {        
        this.course=course;
       });
     }
    
  }
}
