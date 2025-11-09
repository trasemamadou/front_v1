import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatiereService } from '../../services/matiere.service';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-matiereupdate',
  templateUrl: './matiereupdate.component.html',
  styleUrls: ['./matiereupdate.component.scss']
})
export class MatiereupdateComponent implements OnInit {

  matiereForm!: UntypedFormGroup;
  id!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private matiereService: MatiereService
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.matiereForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      archive: [false]
    });

    this.loadMatiere();
  }

  loadMatiere() {
    this.matiereService.getMatiereById(this.id).subscribe({
      next: (data) => {
        console.log("Data:", data.matiere)
        this.matiereForm.patchValue({
          name: data.matiere.name,
          description:data. matiere.description,
          archive: data.matiere.archive
        });
      },
      error: (err) => console.error(err)
    });
  }

  submitUpdate() {
    if (this.matiereForm.invalid) {
      this.markFormTouched(this.matiereForm);
      return;
    }

    this.matiereService.updateMatiere(this.id, this.matiereForm.value).subscribe({
      next: () => {
        alert('Matière mise à jour avec succès !');
        this.router.navigate(['/ahmedbaba/matieres/liste']);
      },
      error: (err) => console.error(err)
    });
  }

  private markFormTouched(formGroup: UntypedFormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
    });
  }
}
