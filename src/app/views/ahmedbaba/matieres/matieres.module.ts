import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatierelistComponent } from './matierelist/matierelist.component';
import { MatierecreateComponent } from './matierecreate/matierecreate.component';
 
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatStepperModule } from '@angular/material/stepper';
import { RouterModule } from '@angular/router';
import { SharedPipesModule } from 'app/shared/pipes/shared-pipes.module';
import { SharedMaterialModule } from 'app/shared/shared-material.module';
import { NgChartsModule } from 'ng2-charts';
import { FileUploadModule } from 'ng2-file-upload';
import { NgxEchartsModule } from 'ngx-echarts';
import { QuillModule } from 'ngx-quill';
import { MatiereRoutes } from './matieres.routing';
import { MatiereinfoComponent } from './matiereinfo/matiereinfo.component';
import { MatiereupdateComponent } from './matiereupdate/matiereupdate.component';

@NgModule({
  declarations: [
    MatierecreateComponent,
    MatierelistComponent,
    MatiereinfoComponent,
    MatiereupdateComponent
  ],
  imports: [
        CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatListModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatRadioModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatStepperModule,
    FlexLayoutModule,
    QuillModule.forRoot(),
    FileUploadModule,
    RouterModule.forChild(MatiereRoutes),
    SharedMaterialModule,
    FlexLayoutModule,
    NgChartsModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
    SharedPipesModule,
  ]
})
export class MatieresModule { }
