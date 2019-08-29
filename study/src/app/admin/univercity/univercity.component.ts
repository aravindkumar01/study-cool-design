import { Component, OnInit, ViewChild , Inject} from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Router } from '@angular/router';
import { Univercity } from './model/univercity';
import { UnivercityService } from './service/univercity.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-univercity',
  templateUrl: './univercity.component.html',
  styleUrls: ['./univercity.component.css']
})
export class UnivercityComponent implements OnInit {

  univercity:Univercity;  //pass edit or delete user 
  univercityies:Univercity[];

 displayedColumns: string[] = ['id', 'name','address','location','edit','delete'];
  dataSource: MatTableDataSource<Univercity>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private service:UnivercityService,private router: Router) {
   
  
  }
  
  univercityList()
  {
  
    this.service.getUniverictyList().pipe(first()).subscribe(univercity => {  
      this.univercityies=univercity;
      this.dataSource = new MatTableDataSource(this.univercityies);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      
  });
     
  }
  ngOnInit() {
   
    this.univercityList();  

  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



  deleteUnivercity(univercity:Univercity)
  {
   alert(univercity.id);
   let r = confirm("Press yes to delete!");
          if (r == true) {
            this.service.deleteUnivercity(univercity.id) .subscribe(
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

    editUnivercity(univercity:Univercity)
  {
  
   localStorage.removeItem("UnivercityId");
    localStorage.setItem("UnivercityId", univercity.id.toString());
    this.router.navigate(['/admin/addunivercity']);
  }



}
