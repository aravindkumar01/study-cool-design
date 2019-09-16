import { Component, OnInit } from '@angular/core';
import { BlogsService } from '../service/blogs.service';
import { Router } from '@angular/router';
import { Url } from 'src/app/URL/url';

@Component({
  selector: 'app-myblogs',
  templateUrl: './myblogs.component.html',
  styleUrls: ['./myblogs.component.css']
})
export class MyblogsComponent implements OnInit {

  role:string=Url.userRole;
  blogs:any[];
  constructor(private service:BlogsService,private router:Router) { }

  ngOnInit() {
    
    this.setDash(10);
  }

  setDash(limt:any){
          this.service.getBlogsListByDash().subscribe(blogs => {  
            this.blogs=blogs; 
          });
  }

  blogReader(id:number){   
    if(this.role=="ROLE_ADMIN"){
        this.router.navigate(['/admin/blog/'+id]);
      }else if(this.role=="ROLE_STUDENT"){
        this.router.navigate(['/user/blog/'+id]);
      } else if(this.role=="ROLE_STAFF"){            
        this.router.navigate(['/staff/blog/'+id]);
      }  
  }

}
