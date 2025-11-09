import { Routes } from '@angular/router';
import { BasicFormComponent } from 'app/views/forms/basic-form/basic-form.component';
import { FileUploadComponent } from 'app/views/forms/file-upload/file-upload.component';
import { RichTextEditorComponent } from 'app/views/forms/rich-text-editor/rich-text-editor.component';
import { WizardComponent } from 'app/views/forms/wizard/wizard.component';
import { MatierelistComponent } from './matierelist/matierelist.component';
import { MatierecreateComponent } from './matierecreate/matierecreate.component';
import { MatiereinfoComponent } from './matiereinfo/matiereinfo.component';
import { MatiereupdateComponent } from './matiereupdate/matiereupdate.component';
 
export const MatiereRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'liste',
        component: MatierelistComponent,
        data: { title: 'Liste', breadcrumb: 'LISTE' }
      },
      {
        path: 'ajouter',
        component: MatierecreateComponent,
        data: { title: 'Nouveau', breadcrumb: 'Nouveau' }
      },
      {
        path: 'info/:id',
        component: MatiereinfoComponent,
        data: { title: 'INfo', breadcrumb: 'Nouveau' }
      },
      {
        path: 'update/:id',
        component: MatiereupdateComponent,
        data: { title: 'Update', breadcrumb: 'UPDATE' }
      }
    ]
  }
];