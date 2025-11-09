import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EleveService } from '../../services/eleve.service';
import { Eleve } from '../../models/eleve';

@Component({
  selector: 'app-elevecreate',
  templateUrl: './elevecreate.component.html',
  styleUrls: ['./elevecreate.component.scss']
})
export class ElevecreateComponent implements OnInit {
previewImage: string | null = null;
  console = console;
  eleveForm: UntypedFormGroup;
  selectedFile: File | null = null;

  newEleve: Eleve = {
    prenom: '',
    nom: '',
    date_naissance: undefined,
    adresse: '',
    telephone: '',
    image: undefined,
    matricule: ''
  };

  constructor(
    private eleveService: EleveService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.eleveForm = new UntypedFormGroup({
      prenom: new UntypedFormControl('', [Validators.required, Validators.minLength(2)]),
      nom: new UntypedFormControl('', [Validators.required, Validators.minLength(2)]),
      date_naissance: new UntypedFormControl('', Validators.required),
      adresse: new UntypedFormControl('', Validators.required),
      telephone: new UntypedFormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]{8,15}$') // entre 8 et 15 chiffres
      ]),
      image: new UntypedFormControl('', Validators.required)
    });
  }



onFileSelected(event: any) {
  const file = event.target.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = () => {
      this.previewImage = reader.result as string;
    };

    reader.readAsDataURL(file);
  }
}


  createEleve(): void {
    if (this.eleveForm.invalid || !this.selectedFile) {
      this.eleveForm.markAllAsTouched();
      console.warn('⚠️ Formulaire invalide');
      return;
    }
     const formattedDate = new Date(this.eleveForm.value.date_naissance).toISOString().split('T')[0]; 
    const formData = new FormData();
    formData.append('prenom', this.eleveForm.value.prenom);
    formData.append('nom', this.eleveForm.value.nom);
    formData.append('date_naissance', formattedDate);
    formData.append('adresse', this.eleveForm.value.adresse);
    formData.append('telephone', this.eleveForm.value.telephone);
    formData.append('image', this.selectedFile);

    this.eleveService.createEleve(formData).subscribe({
      next: (response) => {
        console.log('✅ Élève créé avec succès :', response);
        this.router.navigate(['']); // Redirige vers la page d’accueil
      },
      error: (error) => {
        console.error('❌ Erreur lors de la création de l’élève :', error);
      }
    });
  }
  
}
