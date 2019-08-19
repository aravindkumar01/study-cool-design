import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {

  demo= new Map<string, string[]>([
    ['First Year',['java','c','c++']],
    ['Second Year',['java','c','c++']],
    ['Third Year',['java','c','c++']]
]);
rootLevelNodes: string[] = ['First Year', 'Second Year','Third Year'];
  constructor() { }

  ngOnInit() {
    this.demo.forEach(element => {
      console.log(element);
      
    });

  }

}
