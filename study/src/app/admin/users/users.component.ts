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
     // console.log(users);
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
   // console.log(user.id);
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
    //console.log(user);
   localStorage.removeItem("UserId");
    localStorage.setItem("UserId", user.id.toString());
    this.router.navigate(['/admin/adduser']);
  }




}























/*****
 * import { Component, OnInit, ViewChild , Inject} from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AdduserComponent } from './adduser/adduser.component';


export interface DialogData {
  animal: string;
  name: string;
}


export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}

/** Constants used to fill up our data base. 
const COLORS: string[] = [
  'maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple', 'fuchsia', 'lime', 'teal',
  'aqua', 'blue', 'navy', 'black', 'gray'
];
const NAMES: string[] = [
  'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
  'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
];


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  
  userss:User[]=[
    {id:1,first_name:"aravind",last_name:"kumar",email:"aravind@gmail.com",univercity:"bharathiyar",course:"MCA",mobile:7010182967,role:"STUDENT_AUTH"},
    {id:2,first_name:"kavin",last_name:"kumar",email:"email",univercity:"bharathiyar",course:"MCA",mobile:7010182967,role:"STUDENT_AUTH"},
     {id:3,first_name:"mathan",last_name:"kumar",email:"email",univercity:"bharathiyar",course:"MCA",mobile:7010182967,role:"STUDENT_AUTH"},
        
  ];
  animal: string;
  name: string;

  displayedColumns: string[] = ['id', 'name', 'progress', 'color','delete'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(public dialog: MatDialog) {
    // Create 100 users
    const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(AdduserComponent, {
      width: '250px',
      data: {name: "aravind", animal: "kumar"}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
  //  this.animal = result;
    });
  }
  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}


function createNewUser(id: number): UserData {
  const name = NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
      NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

  return {
    id: id.toString(),
    name: name,
    progress: Math.round(Math.random() * 100).toString(),
    color: COLORS[Math.round(Math.random() * (COLORS.length - 1))]
  };





}




*/