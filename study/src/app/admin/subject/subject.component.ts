import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from './model/subject';
import { MatTableDataSource, MatPaginator, MatSort, MatGridTileHeaderCssMatStyler } from '@angular/material';
import { SubjectService } from './service/subject.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {
  title:string="All subjects";
  c_id:number;
  subject:Subject;;  //pass edit or delete user 
  subjectes:Subject[];

 displayedColumns: string[] = ['id', 'name','year','semster','edit','delete'];
  dataSource: MatTableDataSource<Subject>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private service:SubjectService,private router: Router) {
   
  
  }
  
  subjectList()
  {
  
    this.service.getSubjectList().pipe(first()).subscribe(subject => {      
      this.subjectes=subject;
      this.dataSource = new MatTableDataSource(this.subjectes);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      
  });
     
  }

  subjectListByCourse(id:any)
  {
    this.service.getSubjectListByCourse(id).pipe(first()).subscribe(subject => {  
      console.log(subject);
      this.subjectes=subject;
      this.dataSource = new MatTableDataSource(this.subjectes);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      
  });
  }
  ngOnInit() {
   
    this.c_id=+localStorage.getItem("CourseId");
    
    if(localStorage.getItem("CourseId")!=null){
      this.title="Subject_"+this.c_id;
      this.subjectListByCourse(this.c_id);  
     
    }
    else{ this.subjectList(); }
  
    localStorage.removeItem("CourseId");
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



  deleteSubject(subject:Subject)
  {
   
   let r = confirm("Press yes to delete!");
          if (r == true) {
            this.service.deleteSubject(subject.id) .subscribe(
              data => {
                alert(data);     
              },
              error => {
               console.log(error);         
                alert(error.error.text);        
              }
              );
          } 
    }

    editSubject(subject:Subject)
  {    
    localStorage.removeItem("SubjectId");
    localStorage.setItem("SubjectId", subject.id.toString());
    this.router.navigate(['/admin/addsubject']);
  }



  addSubject()
  {  
    localStorage.removeItem("CourseId");
    localStorage.setItem("CourseId",this.c_id.toString());
    this.router.navigate(['/admin/addsubject']);
  }
}
