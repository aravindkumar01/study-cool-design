
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, Injectable, OnInit } from '@angular/core';
import { DynamicDatabase, DynamicFlatNode, DynamicDataSource } from '../tree/DynamicDataSource';
import { CourseService } from 'src/app/admin/course/service/course.service';
import { first } from 'rxjs/operators';
import { SubjectService } from 'src/app/admin/subject/service/subject.service';
import { Subject } from 'src/app/admin/subject/model/subject';

@Component({
  selector: 'app-user-course',
  templateUrl: './user-course.component.html',
  styleUrls: ['./user-course.component.css']
})
export class UserCourseComponent implements OnInit {

  topic: string;
  pageNumber: any = 1;
  pdf: string;

  constructor(database: DynamicDatabase, private service: CourseService, private subject: SubjectService) {
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
    this.pdf = "/assets/sylabus/" + localStorage.getItem("CourseId") + ".pdf";
    this.setCourse();
  }


  sylabus(subject: any) {
    let id = localStorage.getItem("CourseId");
    this.subject.getSubjectPageNumber(id, subject).pipe(first()).subscribe((subject: Subject) => {
      this.pageNumber = +subject.page_number;
    });

  }


  setCourse() {
    let id = localStorage.getItem("CourseId");
    this.service.getCourse(id).pipe(first()).subscribe(course => {

      localStorage.setItem("years", course.years.toString());
      this.topic = course.name;
    });

  }
}
