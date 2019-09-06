
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FileService } from './service/file.service';
import { Fileupload } from './model/fileupload';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { CourseService } from '../course/service/course.service';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.css']
})
export class FileuploadComponent implements OnInit {

  files:Fileupload[];
  
  file:Fileupload;  //pass edit or delete user 
  
 displayedColumns: string[] = ['id', 'file_name','description','status','option','start','delete'];
  dataSource: MatTableDataSource<Fileupload>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private service:FileService,private router: Router) {
   
  
  }
  
 
     
  
  ngOnInit() {
   
    this.setDash(10);

  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  setDash(limt:any){
          this.service.getFiles().subscribe(files => {  
           this.files=files;           
            this.dataSource = new MatTableDataSource( this.files);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            
          });
  }


  startProcess(file:Fileupload){
    //alert(file[0]);
    //  / console.log(file[0]);
    this.service.startFile(file[0]).subscribe(data => {
      alert(data);     
    },
    error => {
      console.log(error);         
      alert(error.error.text);          
    });
  }

deleteFile(file:Fileupload){
    this.service.deleteFile(file[0]).subscribe(data => {
      alert(data);     
    },
    error => {
      console.log(error);         
      alert(error.error.text);          
    });

}
}