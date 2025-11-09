import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EnseignantService } from '../../services/enseignant.service';
import { Enseignant } from '../../models/enseignant';

@Component({
  selector: 'app-enseignantcreate',
  templateUrl: './enseignantcreate.component.html',
  styleUrls: ['./enseignantcreate.component.scss']
})
export class EnseignantcreateComponent implements OnInit {

  console = console;
  enseignantForm: UntypedFormGroup;
  selectedFile: File | null = null;

  newEnseignant: Enseignant = {
    prenom: '',
    nom: '',
    adresse: '',
    telephone: '',
    // specialite: '',
    image: undefined,
    matricule: ''
  };

  constructor(
    private enseignantService: EnseignantService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.enseignantForm = new UntypedFormGroup({
      prenom: new UntypedFormControl('', [Validators.required, Validators.minLength(2)]),
      nom: new UntypedFormControl('', [Validators.required, Validators.minLength(2)]),
      adresse: new UntypedFormControl('', Validators.required),
      telephone: new UntypedFormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]{8,15}$')
      ]),
      specialite: new UntypedFormControl('', Validators.required),
      image: new UntypedFormControl('', Validators.required)
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.enseignantForm.patchValue({ image: file.name });
    }
  }

  createEnseignant(): void {
    if (this.enseignantForm.invalid || !this.selectedFile) {
      this.enseignantForm.markAllAsTouched();
      console.warn('⚠️ Formulaire invalide');
      return;
    }

    const formData = new FormData();
    formData.append('prenom', this.enseignantForm.value.prenom);
    formData.append('nom', this.enseignantForm.value.nom);
    formData.append('adresse', this.enseignantForm.value.adresse);
    formData.append('telephone', this.enseignantForm.value.telephone);
    formData.append('specialite', this.enseignantForm.value.specialite);
    formData.append('image', this.selectedFile);

    this.enseignantService.createEnseignant(formData).subscribe({
      next: (response) => {
        console.log('✅ Enseignant créé avec succès :', response);
        this.router.navigate(['enseignants/list']);
      },
      error: (error) => {
        console.error('❌ Erreur lors de la création de l’enseignant :', error);
      }
    });
  }
}
