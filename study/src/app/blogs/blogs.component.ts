import { Component, OnInit } from '@angular/core';
import { BlogsService } from './service/blogs.service';
import { Blogs } from './model/blogs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {

  blogs:any[];
  constructor(private service:BlogsService) { }

  ngOnInit() {
    
    this.setDash(10);
  }

  setDash(limt:any){
          this.service.getBlogsListByDash().subscribe(blogs => {  
            this.blogs=blogs;      
            console.log(this.blogs);      
          });
  }
}
