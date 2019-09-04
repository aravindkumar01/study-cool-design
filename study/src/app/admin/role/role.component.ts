import { Component, OnInit, ViewChild } from '@angular/core';
import { Role } from './model/role';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Univercity } from '../univercity/model/univercity';
import { RoleService } from './service/role.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {

 
  role:Role //pass edit or delete user 
  roles:Role[];

 displayedColumns: string[] = ['id', 'name','description','edit','delete'];
  dataSource: MatTableDataSource<Role>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private service:RoleService,private router: Router) {
   
  
  }
  
  roleList()
  {
  
    this.service.getRoleList().pipe(first()).subscribe(role => {  
      this.roles=role;
      this.dataSource = new MatTableDataSource(this.roles);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      
  });
     
  }
  ngOnInit() {
   
    this.roleList();  

  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



  deleteRole(role:Role)
  {   
    alert(role.id);
   let r = confirm("Press yes to delete!");
          if (r == true) {
            this.service.deleteRole(role.id) .subscribe(
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

    editRole(role:Role)
  {
    this.router.navigate(['/admin/role/'+role.id]);
  
  }



}
