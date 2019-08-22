import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SylabusService } from 'src/app/admin/sylabus/service/sylabus.service';
import { Sylabus } from 'src/app/admin/sylabus/model/sylabus';
import { first } from 'rxjs/operators';
import { SubjectService } from 'src/app/admin/subject/service/subject.service';
import { Subject } from 'src/app/admin/subject/model/subject';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
   
     unit:number[];
    screenWidth: number;
   subject_id:number;
   sylabus:Sylabus[];
  constructor(private route: ActivatedRoute,private serviceSylabus:SylabusService,private subjectService:SubjectService) {
    //responsive code 
    this.screenWidth = window.innerWidth;
    window.onresize = () => {    
      this.screenWidth = window.innerWidth;
    };
    ////responsive code end
    this.route.params.subscribe(params => {
      this.subject_id = params['id'];
    });
  }
  ngOnInit() {

    this.subjectService.getSubject(this.subject_id).pipe(first()).subscribe(subject=>{      
        this.unit = Array(subject.units).fill(1).map(((x,i)=>i));    
    })

     this.serviceSylabus.getSylabusListBySubject(this.subject_id).pipe(first()).subscribe(sylabus=>{
      this.sylabus=sylabus;     
     });
  }

  
}
