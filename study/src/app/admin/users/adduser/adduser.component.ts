import { Component, OnInit,Inject } from '@angular/core';
import { FormControl, Validators, FormGroupDirective, NgForm, FormGroup, FormBuilder } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
import { User } from '../modal/user';
import { FormsModule } from '@angular/forms';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { logging } from 'protractor';

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
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {
 
  //users:User[]=[ {id:1,first_name:"aravind",last_name:"kumar",email:"aravind@gmail.com",univercity:"bharathiyar",course:"MCA",mobile:7010182967,role:"STUDENT_AUTH"}  ];
  user:User = new User();
  buttonName:string="Create";
   users:User[];
   userId:string;
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
    {name: 'ADMIN'},
    {name: 'STAFF'},
    {name: 'STUDENT'}
  ];

  course: Course[] = [
    {name: 'MCA'},
    {name: 'BCA'}
  ];

  constructor(private service:UserService,private router: Router) { }

  ngOnInit() {
    this.userId = localStorage.getItem("UserId");   
    if(this.userId!=null) {
      alert("update");
      this.buttonName="Update";
       this.service.getUser(+ this.userId).pipe(first()).subscribe(user => {       
        this.user=user;  
    //  /   console.log(user);  
       });
    
        localStorage.removeItem("UserId");
    }
    
  }
  save() {
    this.service.createUser(this.user)  
      .subscribe(
        data => {
          //alert(data);
         // console.log(data);
        
        },
        error => {
          if(error.error.text=="Sucess")
          {
            this.router.navigate(['/admin/users']);
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
    //alert(this.user);
    if(this.userId!=null)
    {
     
      console.log(this.user);
      this.user.id=Number.parseInt(this.userId);
      localStorage.removeItem("UserId");
      this.router.navigate['/admin/users'];
     // this.save(); 
    }
    this.save();         
    
  }

}
