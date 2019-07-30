import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from './model/subject';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { SubjectService } from './service/subject.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {

  
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
      console.log(subject);
      this.subjectes=subject;
      this.dataSource = new MatTableDataSource(this.subjectes);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      
  });
     
  }
  ngOnInit() {
   
    this.subjectList();  

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

    editUnivercity(subject:Subject)
  {
  
   localStorage.removeItem("SubjectId");
    localStorage.setItem("SubjectId", subject.id.toString());
    this.router.navigate(['/admin/addsubject']);
  }




}
