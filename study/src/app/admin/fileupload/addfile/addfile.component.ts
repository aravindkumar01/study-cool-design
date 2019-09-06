import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { FileService } from '../service/file.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addfile',
  templateUrl: './addfile.component.html',
  styleUrls: ['./addfile.component.css']
})
export class AddfileComponent implements OnInit {

 
  description:string;
  option:string;
  uploadForm: FormGroup; 
  optionControl = new FormControl('', [Validators.required]);
  descriptionControl = new FormControl('', [Validators.required]);
  type:any[]=[
    {id:1,name:"Univercity"},
    {id:2,name:"Course"},
    {id:3,name:"Subject"},
    {id:4,name:"Sylabus"},
    {id:5,name:"Content"},
  ];

  constructor(private formBuilder: FormBuilder,private service:FileService,private router: Router) { }

  ngOnInit() {

    this.uploadForm = this.formBuilder.group({
      file: ['']
    });
  }

  onSubmit(){
    
    const formData = new FormData();   
    formData.append('file', this.uploadForm.get('file').value);
    formData.append("option",this.option);
    formData.append("description",this.description);

    this.service.addFileProcess(formData).subscribe(data => {
          alert(data);     
        },
        error => {
          console.log(error);         
          alert(error.error.text);          
        }
        );
    
   
    this.router.navigate(['/admin/file']);
 

  }


  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('file').setValue(file);
    }
}



}
