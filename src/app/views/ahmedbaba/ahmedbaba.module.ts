import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { BasicFormComponent } from 'app/views/forms/basic-form/basic-form.component';
import { FileUploadComponent } from 'app/views/forms/file-upload/file-upload.component';
import { FormsRoutes } from 'app/views/forms/forms.routing';
import { RichTextEditorComponent } from 'app/views/forms/rich-text-editor/rich-text-editor.component';
import { WizardComponent } from 'app/views/forms/wizard/wizard.component';
import { FileUploadModule } from 'ng2-file-upload';
import { QuillModule } from 'ngx-quill';
import { AhmedbabaRoutes } from './ahmedbaba.routing';
import { SharedPipesModule } from 'app/shared/pipes/shared-pipes.module';
import { SharedMaterialModule } from 'app/shared/shared-material.module';
import { NgChartsModule } from 'ng2-charts';
import { NgxEchartsModule } from 'ngx-echarts';
import { DashboardRoutes } from '../dashboard/dashboard.routing';
import { HttpClientModule } from '@angular/common/http';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ClasseComponent } from './components/classe/classe.component';
import { ConfirmationdialogComponent } from './confirmationdialog/confirmationdialog.component';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({ 
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
           CommonModule,
           MatDialogModule,
    HttpClientModule, 
    MatDividerModule, 
    MatSnackBarModule,
        RouterModule.forChild(AhmedbabaRoutes), 
            SharedMaterialModule,
            FlexLayoutModule,
            NgChartsModule,
            NgxEchartsModule.forRoot({
              echarts: () => import('echarts')
            }),
            SharedPipesModule,
            RouterModule.forChild(AhmedbabaRoutes),
            MatCardModule,
            
      ],
      declarations: [ClasseComponent, ConfirmationdialogComponent],
})
export class AhmedbabaModule { }
