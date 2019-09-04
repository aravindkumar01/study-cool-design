import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Menu } from 'src/app/menu/modal/menu';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-staff-menu',
  templateUrl: './staff-menu.component.html',
  styleUrls: ['./staff-menu.component.css']
})
export class StaffMenuComponent implements OnInit {


  ngOnInit() {
  }
  mobileQuery: MediaQueryList;

  headerNav:Menu[]=[
    {name:"Profile",link:"/staff/profile",icon_name:"person_add"},
    {name:"Logout",link:"/staff/logout",icon_name:"exit_to_app"}
  ];

  adminNav:Menu[]=[     
    // {name:"Home",link:"/staff/home",icon_name:"home"},       
    {name:"Blogs",link:"/staff/blogs",icon_name:"file_copy"},
    {name:"Profile",link:"/staff/profile",icon_name:"collections_bookmark "},
    {name:"Logout",link:"/staff/logout",icon_name:"note_add"}    

  ];

  

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
 

  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));
}