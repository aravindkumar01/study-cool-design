import { LoginService } from './../login/service/login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restpassword',
  templateUrl: './restpassword.component.html',
  styleUrls: ['./restpassword.component.css']
})
export class RestpasswordComponent implements OnInit {

  vaild:boolean=false;;
  email:string;
  constructor(private service:LoginService,private router: Router) { }

  ngOnInit() {
  }


  reset(){
      if(this.email!=null && this.email !="" && this.email.includes("@"))
      {
        this.vaild=false;
        this.service.resetPassword(this.email).subscribe(
          data => {
            //alert(data);
           console.log(data);          
          },
          error => {
            console.log(error);
            if(error.error.text=="deleted"){
              this.router.navigate(['/login']);
            }else{
              alert(error.error.text);
            }      });
        
      }else{this.vaild=true;}

  }

  somethingChanged(){
    this.vaild=false;
  }
}
