import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { PasswordService } from './service/password.service';
import { Password } from './model/password';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {

  password:Password;  //pass edit or delete user 
  passwordList:Password[];

 displayedColumns: string[] = ['id', 'username','password','status','edit','delete'];
  dataSource: MatTableDataSource<Password>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private service:PasswordService,private router: Router) {
   
  
  }
  
  userList()
  {
  
    this.service.getUserList().pipe(first()).subscribe(list => {  
      console.log(list);
      this.passwordList=list;
      this.dataSource = new MatTableDataSource(this.passwordList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      
  });
     
  }
  ngOnInit() {
   
    this.userList();  

  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



  deleteUser(pass:Password)
  { 
   let r = confirm("Press yes to delete!");
          if (r == true) {
            this.service.deleteUser(pass.username) .subscribe(
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

    editUser(pass:Password)
  {  
    this.router.navigate(['/admin/password/'+pass.id]);
  }



}
;