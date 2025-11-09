import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EleveService } from '../../services/eleve.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-eleveupdate',
  templateUrl: './eleveupdate.component.html',
  styleUrls: ['./eleveupdate.component.scss']
})
export class EleveupdateComponent implements OnInit {

  apiUrl = environment.apiUrl + '/api/students';
  eleve: any;
  eleveForm: UntypedFormGroup;
  selectedFile: File | null = null;
  previewImage: string | null = null;

  constructor(
    private eleveService: EleveService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    this.eleveForm = new UntypedFormGroup({
      prenom: new UntypedFormControl('', Validators.required),
      nom: new UntypedFormControl('', Validators.required),
      date_naissance: new UntypedFormControl('', Validators.required),
      adresse: new UntypedFormControl('', Validators.required),
      telephone: new UntypedFormControl('', Validators.required)
    });

    // Charger élève
    this.eleveService.getStudentById(Number(id)).subscribe(data => {
      this.eleve = data;

      // Remplissage formulaire
      this.eleveForm.patchValue({
        prenom: data.prenom,
        nom: data.nom,
        date_naissance: data.date_naissance,
        adresse: data.adresse,
        telephone: data.telephone
      });
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      // Génération du preview
      const reader = new FileReader();
      reader.onload = e => this.previewImage = e.target?.result as string;
      reader.readAsDataURL(file);
    }
  }

  updateEleve(): void {
    if (this.eleveForm.invalid) {
      this.eleveForm.markAllAsTouched();
      return;
    }

    const formData = new FormData();
    formData.append('prenom', this.eleveForm.value.prenom);
    formData.append('nom', this.eleveForm.value.nom);
    formData.append('date_naissance', this.eleveForm.value.date_naissance);
    formData.append('adresse', this.eleveForm.value.adresse);
    formData.append('telephone', this.eleveForm.value.telephone);

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    this.eleveService.updateStudent(this.eleve.id, formData).subscribe({
      next: () => {
        console.log("✅ Élève mis à jour !");
        this.router.navigate(['/ahmedbaba/eleves/liste']);
      },
      error: err => console.error("❌ Erreur update:", err)
    });
  }
}
