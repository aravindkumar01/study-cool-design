import { Component, OnInit, ViewChild } from '@angular/core';
import { Course } from './model/course';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { CourseService } from './service/course.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

 
  course:Course;  //pass edit or delete user 
  courses:Course[];
 displayedColumns: string[] = ['id', 'name','univercity','edit','delete'];
  dataSource: MatTableDataSource<Course>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private service:CourseService,private router: Router) {
   
  
  }
  
  courseList()
  {
  
    this.service.getCourseList().pipe(first()).subscribe(course => {  
      console.log(course);
     
      //window.location.reload();
      this.courses=course;
      this.dataSource = new MatTableDataSource(this.courses);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      
  });
     
  }
  ngOnInit() {
   
    this.courseList();  

  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



  deleteUnivercity(course:Course)
  {
   alert(course.id);
   let r = confirm("Press yes to delete!");
          if (r == true) {
            this.service.deleteCourse(course.id) .subscribe(
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

    editUnivercity(course:Course)
  {
  
   localStorage.removeItem("CourseId");
    localStorage.setItem("CourseId", course.id.toString());
    this.router.navigate(['/admin/addcourse']);
  }

}
