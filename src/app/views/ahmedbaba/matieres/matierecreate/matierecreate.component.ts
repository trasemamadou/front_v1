import { Component, OnInit } from '@angular/core';
import { MatiereService } from '../../services/matiere.service';
import { Matiere } from '../../models/matiere';
import { Router } from '@angular/router';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-matierecreate',
  templateUrl: './matierecreate.component.html',
  styleUrls: ['./matierecreate.component.scss']
})
export class MatierecreateComponent implements OnInit {
  formData = {}
  console = console;
  matiereForm!: UntypedFormGroup;

  newMatiere: Matiere = {
    name: '',
    description: '',
    archive: false
  }

  constructor(
    private matiereService: MatiereService, 
    private router: Router,   
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.matiereForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      archive: [false],
    });
  }

  createMatiere() {
    if (this.matiereForm.valid) {
      this.newMatiere = this.matiereForm.value;

      this.matiereService.createMatiere(this.newMatiere).subscribe({
        next: (response) => {
          console.log('Matière créée avec succès :', response);
          this.router.navigate(['']); // redirige vers la page d'accueil
        },
        error: (error) => {
          console.error('Erreur lors de la création de la matière :', error);
        }
      });
    } else {
      console.warn('Le formulaire est invalide');
      // Marquer tous les champs comme touchés pour afficher les erreurs
      this.markFormGroupTouched(this.matiereForm);
    }
  }

  // Méthode pour marquer tous les champs comme touchés
  private markFormGroupTouched(formGroup: UntypedFormGroup) {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      if (control instanceof UntypedFormGroup) {
        this.markFormGroupTouched(control);
      } else {
        control?.markAsTouched();
      }
    });
  }
}