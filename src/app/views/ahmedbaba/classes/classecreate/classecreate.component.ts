import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { ClasseService } from '../../services/classe.service';
import { Classe } from '../../models/classe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-classecreate',
  templateUrl: './classecreate.component.html',
  styleUrls: ['./classecreate.component.scss']
})
export class ClassecreateComponent implements OnInit {

  formData = {};
  console = console;
  classeForm: UntypedFormGroup;

  newClasse: Classe = {
    nom: '',
    description: '',
    archive: false
  };

  constructor(
    private classeService: ClasseService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.classeForm = new UntypedFormGroup({
      nom: new UntypedFormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
      ]),
      description: new UntypedFormControl('', [
        Validators.required,
        Validators.minLength(5)
      ]),
      archive: new UntypedFormControl(false)
    });
  }

  createClasse(): void {
    if (this.classeForm.valid) {
      this.newClasse = this.classeForm.value;

      this.classeService.createClasse(this.newClasse).subscribe({
        next: (response) => {
          console.log('✅ Classe créée avec succès :', response);
          this.router.navigate(['']); // redirige vers la page d’accueil
        },
        error: (error) => {
          console.error('❌ Erreur lors de la création de la classe :', error);
        }
      });
    } else {
      console.warn('⚠️ Le formulaire est invalide');
      this.classeForm.markAllAsTouched();
    }
  }
}
