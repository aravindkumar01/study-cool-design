import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


  oldPassword = new FormControl('', [Validators.required]);
  newPassword = new FormControl('', [Validators.required]);
  constructor() { }

  ngOnInit() {
   
  }

}
