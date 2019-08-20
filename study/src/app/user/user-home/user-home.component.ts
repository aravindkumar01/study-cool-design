import { Component, OnInit } from '@angular/core';

export class demo{
  id:number;
  name:string;
  
}
@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {

  demo:any= new Map<string, demo[]>([
    ['First Year',[{id:1,name:"java"},{id:2,name:"C"},{id:1,name:"C++"}]],
    ['Second Year',[{id:1,name:"java"},{id:2,name:"C"},{id:1,name:"C++"}]],
    ['Third Year',[{id:1,name:"java"},{id:2,name:"C"},{id:1,name:"C++"}]]
]);
  constructor() { }

  ngOnInit() {
 
  }

  getKeys(demo){
    return Array.from(demo.keys());
  }

  getValues(demo){
    return Array.from(demo.values().Array.from(v=>v.id));
  }

}


/*   *ngFor="let r of getKeys(demo)"
 this.demo.forEach((element,key )=> {

      element.forEach(e => {
        console.log(e.id);
      });
     
      console.log("k"+key);  
      
    });
*/