import { Routes } from '@angular/router';
import { BasicFormComponent } from 'app/views/forms/basic-form/basic-form.component';
import { FileUploadComponent } from 'app/views/forms/file-upload/file-upload.component';
import { RichTextEditorComponent } from 'app/views/forms/rich-text-editor/rich-text-editor.component';
import { WizardComponent } from 'app/views/forms/wizard/wizard.component';
import { EnseignementlistComponent } from './enseignementlist/enseignementlist.component';
import { EnseignementcreateComponent } from './enseignementcreate/enseignementcreate.component';
import { EnseignementupdateComponent } from './enseignementupdate/enseignementupdate.component';
 
export const EnseignementRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'liste/:idClasse',
        component: EnseignementlistComponent,
        data: { title: 'Liste', breadcrumb: 'LISTE' }
      },
      {
        path: 'ajouter/:idClasse',
        component: EnseignementcreateComponent,
        data: { title: 'Nouveau', breadcrumb: 'Nouveau' }
      },
      {
        path: 'update/:id',
        component: EnseignementupdateComponent,
        data: { title: 'Nouveau', breadcrumb: 'Nouveau' }
      },
      // {
      //   path: 'info/:id',
      //   component: ClasseinfoComponent,
      //   data: { title: 'Nouveau', breadcrumb: 'Nouveau' }
      // }
    ]
  }
];