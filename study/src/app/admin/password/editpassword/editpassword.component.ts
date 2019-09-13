import { PasswordService } from './../service/password.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Password } from '../model/password';
import { first } from 'rxjs/operators';
import { Form, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-editpassword',
  templateUrl: './editpassword.component.html',
  styleUrls: ['./editpassword.component.css']
})
export class EditpasswordComponent implements OnInit {

  
  passwordForm:Form;
  notMatch:boolean=false;
  btnView:boolean=false;
  oldPassword = new FormControl('', [Validators.required]);
  newPassword = new FormControl('', [Validators.required]);

  response:string;
  
  name:string;
  univercity:string;
  role:string;
  u_id:number;
  user:Password=new Password;
  constructor(private route: ActivatedRoute,private service:PasswordService,private router: Router) { }

  ngOnInit() {
     //get param values
     this.route.params.subscribe(params => {
      this.u_id = params['id'];
    });

    this.service.getUser(+ this.u_id).pipe(first()).subscribe(user => {           
      this.user=user;
     });
  }


  save() {  
        this.service.updateUser(this.user)  
          .subscribe(data => {
            // alert(data);     
            },error => {
              console.log(error);         
            alert(error.error.text);
              this.router.navigate(['/admin/password']);
      });
  }
 
  onSubmit(newpass:any) {   
    this.user.password=newpass;
    this.save();
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
