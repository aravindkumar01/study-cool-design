import { Component, OnInit, ViewChild , Inject} from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { User } from './modal/user';
import { UserService } from './service/user.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  user:User;  //pass edit or delete user details
  users:User[];
 displayedColumns: string[] = ['id', 'first_name', 'last_name', 'email','univercity','course','mobile','role','edit','delete'];
//displayedColumns: string[] = ['id', 'name', 'progress', 'color','delete'];
  dataSource: MatTableDataSource<User>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private service:UserService,private router: Router) {
   
    
  }
  
  usersList()
  {
    this.service.getUsersList().pipe(first()).subscribe(users => { 
      this.users = users;     
      this.dataSource = new MatTableDataSource(this.users);   
     this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
       });
     
  }
  ngOnInit() {
    this.usersList();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



  deleteUser(user:User)
  {  
   let r = confirm("Press yes to delete!"+user.username);
          if (r == true) {
            this.service.deleteUser(user.username).subscribe(
              data => {
                //alert(data);
               console.log(data);
              
              },
              error => {
                console.log(error);
                if(error.error.text=="deleted"){
                  this.router.navigate(['/admin/users']);
                }else{
                  alert(error.error.text);
                }
              }
              );
            alert("Deleted sucessfully");
          } 
    }

  editUser(user:User)
  {  
   localStorage.removeItem("UserId");
    localStorage.setItem("UserId", user.id.toString());
    this.router.navigate(['/admin/adduser']);
  }




}



















