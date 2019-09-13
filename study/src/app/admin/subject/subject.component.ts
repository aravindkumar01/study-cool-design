import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Subject } from './model/subject';
import { SubjectService } from './service/subject.service';

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

 displayedColumns: string[] = ['id', 'name','year','semster','edit','delete','sylabus'];
  dataSource: MatTableDataSource<Subject>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private service:SubjectService,private router: Router,private route: ActivatedRoute) {
   
  
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
      this.subjectes=subject;
      this.dataSource = new MatTableDataSource(this.subjectes);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      
  });
  }
  ngOnInit() {
   
    //get param values
    this.route.params.subscribe(params => {
      this.c_id = params['cid'];
    });
    
    //set subject table values
    if(this.c_id!=null && this.c_id > 0){
      this.title="Subject_"+this.c_id;
      this.subjectListByCourse(this.c_id); 
    }else { this.subjectList(); }  
   
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
    this.router.navigate(['/admin/addsubject/'+subject.course_id+'/'+subject.id]);
  }



  addSubject()
  {     
    this.router.navigate(['/admin/addsubject/'+this.c_id+'/0']);
  }

  viewSylabus(subject:Subject)
  {
    this.router.navigate(['/admin/sylabus/'+subject.id]);
  }

}
