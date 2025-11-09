import { Routes } from '@angular/router';
import { BasicFormComponent } from 'app/views/forms/basic-form/basic-form.component';
import { FileUploadComponent } from 'app/views/forms/file-upload/file-upload.component';
import { RichTextEditorComponent } from 'app/views/forms/rich-text-editor/rich-text-editor.component';
import { WizardComponent } from 'app/views/forms/wizard/wizard.component';
import { EnseignantlistComponent } from './enseignantlist/enseignantlist.component';
import { EnseignantcreateComponent } from './enseignantcreate/enseignantcreate.component';
import { EnseignantprofileComponent } from './enseignantprofile/enseignantprofile.component';
import { EnseignantupdateComponent } from './enseignantupdate/enseignantupdate.component';

export const EnseignantRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'liste',
        component: EnseignantlistComponent,
        data: { title: 'Liste', breadcrumb: 'LISTE' }
      },
      {
        path: 'ajouter',
        component: EnseignantcreateComponent,
        data: { title: 'Nouveau', breadcrumb: 'Nouveau' }
      },
        {
          path: 'profile/:id',
          component: EnseignantprofileComponent,
          data: { title: 'Profil Enseignant', breadcrumb: 'PROFIL' }
        },
        {
        path: 'update/:id',
        component: EnseignantupdateComponent,
        data: { title: 'Modifier Enseignant', breadcrumb: 'Modifier' }
      }
    ]
  }
];