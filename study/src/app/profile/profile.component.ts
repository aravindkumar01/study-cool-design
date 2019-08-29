import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, NgForm, Form } from '@angular/forms';
import { UserService } from '../admin/users/service/user.service';
import { Url } from '../URL/url';
import { first } from 'rxjs/operators';
import { User } from '../admin/users/modal/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  passwordForm:Form;
  notMatch:boolean=false;
  btnView:boolean=false;
  oldPassword = new FormControl('', [Validators.required]);
  newPassword = new FormControl('', [Validators.required]);

  response:string;
  
  name:string;
  univercity:string;
  role:string;
  constructor(private userService:UserService) { }

  ngOnInit() {

    this.userService.getUserByUsername(Url.username).pipe(first()).subscribe((user:User) => { 
      this.name=user.first_name+" "+user.last_name;
      this.univercity=user.univercity;
      this.role=user.role;
    });
   
  }



  onSubmit(old:any,newpass:any) {

    
    let a={'username':Url.username,"oldpassword":old,"newpassword":newpass};
    this.userService.passwordChange(a) .subscribe(data => {     
      
       if(data){
         this.response="Your password sucessfully changed!";
         alert("Your password sucessfully changed!");
          window.location.reload(); 
       }else{
        this.response="Please Enter Current Password Correctly!";  
        
       }

      },
      error => {
       
        alert(error.error.text);
        
      });
    
  }






  
  OnInput(pass:any,confirm:any) {
      if(pass==confirm){
       this. notMatch=false;
       this.btnView=true;
      }
      else{
        this.notMatch=true; 
        this.btnView=false;       
      }
    }
}
