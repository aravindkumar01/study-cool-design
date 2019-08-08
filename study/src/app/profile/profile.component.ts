import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, NgForm, Form } from '@angular/forms';

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
  constructor() { }

  ngOnInit() {
   
  }



  onSubmit(old:any,newpass:any) {

    
    
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
