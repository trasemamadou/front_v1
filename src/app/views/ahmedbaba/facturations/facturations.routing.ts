import { Routes } from '@angular/router';
import { BasicFormComponent } from 'app/views/forms/basic-form/basic-form.component';
import { FileUploadComponent } from 'app/views/forms/file-upload/file-upload.component';
import { RichTextEditorComponent } from 'app/views/forms/rich-text-editor/rich-text-editor.component';
import { WizardComponent } from 'app/views/forms/wizard/wizard.component';
import { FacturationlistComponent } from './facturationlist/facturationlist.component';
import { FacturationcreateComponent } from './facturationcreate/facturationcreate.component';
 
export const FaturationRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'paiements',
        component: FacturationlistComponent,
        data: { title: 'Paiments', breadcrumb: 'PAIEMENTS' }
      },
      {
        path: 'ajouter',
        component: FacturationcreateComponent,
        data: { title: 'Nouveau', breadcrumb: 'Nouveau' }
      }
    ]
  }
];