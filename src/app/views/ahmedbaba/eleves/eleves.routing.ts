import { Routes } from '@angular/router';
import { BasicFormComponent } from 'app/views/forms/basic-form/basic-form.component';
import { FileUploadComponent } from 'app/views/forms/file-upload/file-upload.component';
import { RichTextEditorComponent } from 'app/views/forms/rich-text-editor/rich-text-editor.component';
import { WizardComponent } from 'app/views/forms/wizard/wizard.component';
import { ElevelistComponent } from './elevelist/elevelist.component';
import { ElevecreateComponent } from './elevecreate/elevecreate.component';
import { EleveprofileComponent } from './eleveprofile/eleveprofile.component';
import { EleveupdateComponent } from './eleveupdate/eleveupdate.component';

export const EleveRoutes: Routes = [
  {
    path: '',
 children: [
  {
    path: 'liste',
    component: ElevelistComponent,
    data: { title: 'Liste', breadcrumb: 'LISTE' }
  },
  {
    path: 'ajouter',
    component: ElevecreateComponent,
    data: { title: 'Nouveau', breadcrumb: 'Nouveau' }
  },
  {
    path: 'profile/:id',
    component: EleveprofileComponent,
    data: { title: 'Profil Élève', breadcrumb: 'PROFIL' }
  },
  {
  path: 'update/:id',
  component: EleveupdateComponent,
  data: { title: 'Modifier Élève', breadcrumb: 'Modifier' }
}

]

  }
];