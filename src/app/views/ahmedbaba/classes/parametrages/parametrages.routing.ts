import { Routes } from '@angular/router';
import { BasicFormComponent } from 'app/views/forms/basic-form/basic-form.component';
import { FileUploadComponent } from 'app/views/forms/file-upload/file-upload.component';
import { RichTextEditorComponent } from 'app/views/forms/rich-text-editor/rich-text-editor.component';
import { WizardComponent } from 'app/views/forms/wizard/wizard.component';
import { ParametragelistComponent } from './parametragelist/parametragelist.component';
import { ParametragecreateComponent } from './parametragecreate/parametragecreate.component';
import { ParametrageupdateComponent } from './parametrageupdate/parametrageupdate.component';
 
export const ParametrageRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'liste/:idClasse',
        component: ParametragelistComponent,
        data: { title: 'Liste', breadcrumb: 'LISTE' }
      },
      {
        path: 'ajouter/:idClasse',
        component: ParametragecreateComponent,
        data: { title: 'Nouveau', breadcrumb: 'Nouveau' }
      },
      {
        path: 'update/:id',
        component: ParametrageupdateComponent,
        data: { title: 'Nouveau', breadcrumb: 'Nouveau' }
      }, 
    ]
  }
];