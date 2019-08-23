import { Component, OnInit } from '@angular/core';
import { Subject } from 'src/app/admin/subject/model/subject';
import { SubjectService } from 'src/app/admin/subject/service/subject.service';
import { first } from 'rxjs/operators';
import { UserService } from 'src/app/admin/users/service/user.service';
import { Url } from 'src/app/URL/url';

export class demo{
  id:number;
  name:string;
  
}
@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {

  demo:any;
  cid:number;
  
  constructor(private service:SubjectService,private userService:UserService) { }

  ngOnInit() {
    
    //get course list 
    this.userService.getUserByUsername(Url.username).pipe(first()).subscribe(user => {       
     this.cid=user.course_id;
     //call subject list
          this.service.getSubjectListByCourseDash(this.cid).pipe(first()).subscribe(subject => {  
            console.log(subject)
            this.demo=subject;
          });
    });
    
  }

  getKeys(demo:any){
    return Array.from(demo.keys());
  }

  getValues(demo:any){
    return Array.from(demo.values().Array.from(v=>v.id));
  }

  
}


/*   *ngFor="let r of getKeys(demo)"
 this.demo.forEach((element,key )=> {

      element.forEach(e => {
        console.log(e.id);
      });
     
      console.log("k"+key);  
      
    });
*/

/*demo:any= new Map<string, Subject[]>([
    ['First Year',[{id:1,course_id:1,year:2,semster:"first",name:"java"},{id:1,course_id:1,year:2,semster:"first",name:"java"}]],
    ['Second Year',[{id:1,course_id:1,year:2,semster:"first",name:"java"},{id:1,course_id:1,year:2,semster:"first",name:"java"},{id:1,course_id:1,year:2,semster:"first",name:"java"}]],
    ['Third Year',[{id:1,course_id:1,year:2,semster:"first",name:"java"},{id:1,course_id:1,year:2,semster:"first",name:"java"},{id:1,course_id:1,year:2,semster:"first",name:"java"}]]
]);*/