import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { Role } from '../model/role';
import { RoleService } from '../service/role.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-addrole',
  templateUrl: './addrole.component.html',
  styleUrls: ['./addrole.component.css']
})
export class AddroleComponent implements OnInit {

  role:Role=new Role();
  id:number;
  
  buttonName:string="Create"; 
  nameControl = new FormControl('', [Validators.required]);
  roleControl = new FormControl('', [Validators.required]);
  constructor(private route: ActivatedRoute,private service:RoleService,private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    if(this.id!=0){
      this.buttonName="Update";
      this.service.getRole(this.id).pipe(first()).subscribe(role => {   
        this.role=role;      
      });

    }

  }


  onSubmit() {
      this.save();
  }

  save() {
    this.service.createRole(this.role)  
      .subscribe(
        data => {
          alert(data);     
        },
        error => {
          console.log(error);         
          alert(error.error.text);
          
        }
        );
    this.role = new Role();
   
    this.router.navigate(['/admin/role']);
   // window.location.reload();
  }
}
