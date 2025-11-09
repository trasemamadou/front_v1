import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EnseignantService } from '../../services/enseignant.service';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-enseignantupdate',
  templateUrl: './enseignantupdate.component.html',
    styleUrls: ['./enseignantupdate.component.scss']
})
export class EnseignantupdateComponent implements OnInit {
 apiUrl = `${environment.apiUrl}/api/enseignants`;
  enseignantForm!: FormGroup;
  enseignantId!: number;
  selectedImage: File | null = null;
  submitting = false;
loading: any;
enseignant: any = {};
previewImage: any;
  constructor(
    private fb: FormBuilder,
    private enseignantService: EnseignantService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {

    // ✅ Récupération de l'ID dans l'URL
    this.enseignantId = Number(this.route.snapshot.paramMap.get('id'));

    // ✅ Initialisation formulaire
    this.enseignantForm = this.fb.group({
      prenom: ['', Validators.required],
      nom: ['', Validators.required],
      telephone: [''],
      adresse: [''],
      matiere: [''],
      diplome: [''],
      cheminProfil: [''],
    });

    this.loadEnseignant();
  }

  // ✅ Charger les infos de l'enseignant et pré-remplir le formulaire
  loadEnseignant() {
    this.enseignantService.getTeacherById(this.enseignantId).subscribe({
      next: (data) => {
        console.log("Data:", data)
        this.enseignantForm.patchValue({
          prenom: data.prenom,
          nom: data.nom,
          telephone: data.telephone,
          adresse: data.adresse,
          matiere: data.matiere,
          diplome: data.diplome,
          cheminProfil: data.cheminProfil
        });
        this.enseignant.cheminProfil=data.cheminProfil;
      },
      error: (err) => console.error(err)
    });
  }

  // ✅ Sélection image
  // onFileSelected(event: any) {
  //   this.selectedImage = event.target.files[0] ?? null;
  // }
    onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file;

      // Génération du preview
      const reader = new FileReader();
      reader.onload = e => this.previewImage = e.target?.result as string;
      reader.readAsDataURL(file);
    }
  }

  // ✅ Submit Update
submitUpdate() {
  if (this.enseignantForm.invalid) return;

  this.submitting = true;

  const formData = new FormData();
  Object.entries(this.enseignantForm.value).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      formData.append(key, String(value));
    }
  });

  if (this.selectedImage) {
    formData.append('photo', this.selectedImage);
  }

  this.enseignantService.updateEnseignant(this.enseignantId, formData).subscribe({
    next: () => {
      this.submitting = false;
      this.router.navigate(['/enseignants/details', this.enseignantId]);
    },
    error: (err) => {
      this.submitting = false;
      console.error(err);
    }
  });
}

}
