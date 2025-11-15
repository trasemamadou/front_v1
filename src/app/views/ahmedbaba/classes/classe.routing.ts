import { Routes } from '@angular/router';
import { BasicFormComponent } from 'app/views/forms/basic-form/basic-form.component';
import { FileUploadComponent } from 'app/views/forms/file-upload/file-upload.component';
import { RichTextEditorComponent } from 'app/views/forms/rich-text-editor/rich-text-editor.component';
import { WizardComponent } from 'app/views/forms/wizard/wizard.component';
import { ClasselistComponent } from './classelist/classelist.component';
import { ClassecreateComponent } from './classecreate/classecreate.component';
import { ClasseupdateComponent } from './classeupdate/classeupdate.component';
import { ClasseinfoComponent } from './classeinfo/classeinfo.component';
 
export const ClasseRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'liste',
        component: ClasselistComponent,
        data: { title: 'Liste', breadcrumb: 'LISTE' }
      },
      {
        path: 'ajouter',
        component: ClassecreateComponent,
        data: { title: 'Nouveau', breadcrumb: 'Nouveau' }
      },
      {
        path: 'update/:id',
        component: ClasseupdateComponent,
        data: { title: 'Nouveau', breadcrumb: 'Nouveau' }
      },
      {
        path: 'info/:id',
        component: ClasseinfoComponent,
        data: { title: 'Nouveau', breadcrumb: 'Nouveau' }
      },
        {path:  'enseignements',
         loadChildren: () => import('../../../views/ahmedbaba/classes/enseignements/enseignements.module').then(m => m.EnseignementsModule),
           data: { title: 'Enseignements', breadcrumb: 'CLASSE'}
      },
        {path:  'parametrages',
         loadChildren: () => import('../../../views/ahmedbaba/classes/parametrages/parametrages.module').then(m => m.ParametragesModule),
           data: { title: 'Parametrages', breadcrumb: 'CLASSE'}
      },
    ]
  }
];