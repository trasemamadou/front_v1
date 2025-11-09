import { Routes } from '@angular/router';
import { BasicFormComponent } from 'app/views/forms/basic-form/basic-form.component';
import { FileUploadComponent } from 'app/views/forms/file-upload/file-upload.component';
import { RichTextEditorComponent } from 'app/views/forms/rich-text-editor/rich-text-editor.component';
import { WizardComponent } from 'app/views/forms/wizard/wizard.component';
import { FacturationComponent } from './components/facturation/facturation.component';
import { EleveComponent } from './components/eleve/eleve.component';
import { ClasseComponent } from './components/classe/classe.component';

 
export const AhmedbabaRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path:  'classes',
         loadChildren: () => import('../../views/ahmedbaba/classes/classes.module').then(m => m.ClassesModule),
           data: { title: 'Classes', breadcrumb: 'CLASSE'}
      },
        {
        path: 'eleves',
        loadChildren: () => import('../../views/ahmedbaba/eleves/eleves.module').then(m => m.ElevesModule) ,
       data: { title: 'Elèves', breadcrumb: 'ELEVES'}
      },
      { path: 'enseignants', 
        loadChildren: () => import('../../views/ahmedbaba/enseignants/enseignants.module').then(m => m.EnseignantsModule),
         data: { title: 'Enseignants', breadcrumb: 'ENSEIGNANT'}
       },
      { path: 'matieres', loadChildren: () => import('../../views/ahmedbaba/matieres/matieres.module').then(m => m.MatieresModule) },
   //   { path: 'notes', loadChildren: () => import('../../views/ahmedbaba/notes/notes.module').then(m => m.NotesModule) },
      {
         path: 'facturations',
          loadChildren: () => import('../../views/ahmedbaba/facturations/facturations.module').then(m => m.FacturationsModule),
          data: { title: 'Facturations', breadcrumb: 'FACTURATION'}
        },
   //   { path: 'rapports', loadChildren: () => import('../../views/ahmedbaba/rapports/rapports.module').then(m => m.RapportsModule) },
   //   { path: 'parametres', loadChildren: () => import('../../views/ahmedbaba/parametres/parametres.module').then(m => m.ParametresModule) },
      // {
      
    ]
  }
];