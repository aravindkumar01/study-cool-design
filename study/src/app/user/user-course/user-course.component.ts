
import {FlatTreeControl} from '@angular/cdk/tree';
import {Component, Injectable,OnInit} from '@angular/core';
import { DynamicDatabase, DynamicFlatNode, DynamicDataSource } from '../tree/DynamicDataSource';

@Component({
  selector: 'app-user-course',
  templateUrl: './user-course.component.html',
  styleUrls: ['./user-course.component.css']
})
export class UserCourseComponent implements OnInit {

  pageNumber:number=1;
 pdf:string="/assets/mca.pdf"

 constructor(database: DynamicDatabase) {
  this.treeControl = new FlatTreeControl<DynamicFlatNode>(this.getLevel, this.isExpandable);
  this.dataSource = new DynamicDataSource(this.treeControl, database);

  this.dataSource.data = database.initialData();
}

treeControl: FlatTreeControl<DynamicFlatNode>;

dataSource: DynamicDataSource;

getLevel = (node: DynamicFlatNode) => node.level;

isExpandable = (node: DynamicFlatNode) => node.expandable;

hasChild = (_: number, _nodeData: DynamicFlatNode) => _nodeData.expandable;
  ngOnInit() {
  }

  sylabus(subject:any)
  {
    this.pageNumber=40;
  }
}
