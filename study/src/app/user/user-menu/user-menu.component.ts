import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Menu } from 'src/app/menu/modal/menu';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.css']
})
export class UserMenuComponent implements OnInit {

  ngOnInit() {
    
  }
  mobileQuery: MediaQueryList;

  headerNav:Menu[]=[
    {name:"Profile",link:"/user/profile",icon_name:"person_add"},
    {name:"Logout",link:"/user/logout",icon_name:"exit_to_app"}
  ];

  adminNav:Menu[]=[     
    {name:"Home",link:"/user/home",icon_name:"home"},   
    {name:"Sylabus",link:"/user/course",icon_name:"account_box"},
    {name:"Chats",link:"/user/chats",icon_name:"markunread_mailbox"},
    {name:"Blogs",link:"/user/blogs",icon_name:"file_copy"},
    {name:"Profile",link:"/user/profile",icon_name:"collections_bookmark "},
    {name:"Logout",link:"/user/logout",icon_name:"note_add"}    

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
