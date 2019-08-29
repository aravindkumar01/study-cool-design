import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormGroupDirective, NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../admin/users/service/user.service';
import { User } from '../admin/users/modal/user';
import { ErrorStateMatcher } from '@angular/material';

export interface Univercity {
  name: string;
}
export interface UserType {
  name: string;
}

export interface Course {
  name: string;
}

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
  
  univercity: Univercity[] = [
    {name: 'Anna'},
    {name: 'Bharathiyar'},
    {name: 'Kamarajar'},
  ];
  userType: UserType[] = [  
    {name: 'STAFF'},
    {name: 'STUDENT'}
  ];

  course: Course[] = [
    {name: 'MCA'},
    {name: 'BCA'}
  ];


  user:User = new User();

  constructor(private service:UserService,private router: Router) { }

  save() {
    this.service.signupUser(this.user)  
      .subscribe(
        data => {      
           console.log(data);
         this.router.navigate(['/login']);
        },
        error => {
         
            if(error.error.text=="Sucess")
            {
              this.router.navigate(['/login']);
            }
            else
            {
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
   
  }

}
