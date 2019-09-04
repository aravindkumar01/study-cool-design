import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MarkdownService } from 'ngx-markdown';
import { BlogsService } from '../service/blogs.service';
import { Blogs } from '../model/blogs';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-blog-reader',
  templateUrl: './blog-reader.component.html',
  styleUrls: ['./blog-reader.component.css']
})
export class BlogReaderComponent implements OnInit {

  likes:number;
  blog:Blogs;
  templateForm: FormGroup;
  markdownText: string;
  id:any; 
  constructor(private route: ActivatedRoute, private fb: FormBuilder,
    private markdownService: MarkdownService,private service:BlogsService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.service.getBlog(this.id).subscribe((blogs:Blogs)=> {  
      console.log(blogs);
      this.blog=blogs;      
      this.markdownText =this.blog.content;   
      this.likes=this.blog.likes; 
    });

   

    this.buildForm(this.markdownText);
  
  }


  buildForm(markdownText:any) {
    this.templateForm = this.fb.group({
      body: [markdownText],
      isPreview: [true]
    });
  }


  like(){
      if(this.likes==this.blog.likes ){
        this.blog.likes+=1;
        this.service.createBlogs(this.blog).pipe(first()) .subscribe(
          data => {  alert(data); 
             },
          error => {
            console.log(error);         
            //alert(error.error.text);
            
          });

      }
  }
}
