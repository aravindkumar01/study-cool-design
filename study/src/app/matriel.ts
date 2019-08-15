import {MatFormFieldModule} from '@angular/material/form-field';
import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {  MatInputModule} from '@angular/material';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatSidenavModule} from '@angular/material/sidenav';
import { ReactiveFormsModule } from '@angular/forms';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatNativeDateModule} from '@angular/material/core';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';


@NgModule({
        imports: [   MatFormFieldModule,MatButtonModule ,MatInputModule,MatCardModule,MatIconModule
            ,MatSelectModule,ReactiveFormsModule,MatDividerModule,MatSidenavModule,MatListModule,MatMenuModule,MatNativeDateModule,MatTableModule,MatDialogModule
         ],
        exports:[MatFormFieldModule,MatButtonModule,MatInputModule,MatCardModule,
            MatIconModule,MatSelectModule,ReactiveFormsModule,MatDividerModule,
            MatIconModule,MatSelectModule,ReactiveFormsModule,MatDividerModule,MatSidenavModule,MatToolbarModule,MatListModule,MatMenuModule,MatDialogModule
            ,MatNativeDateModule,MatTableModule
        ]

  })
  export class MatrielModule { }
  