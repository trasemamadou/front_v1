import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClasseService } from '../../services/classe.service';
import { Classe } from '../../models/classe';

@Component({
  selector: 'app-classeupdate',
  templateUrl: './classeupdate.component.html',
  styleUrls: ['./classeupdate.component.scss']
})
export class ClasseupdateComponent implements OnInit {

  classeForm: UntypedFormGroup;
  classe: Classe;
  loading = true;

  constructor(
    private classeService: ClasseService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadClasse(+id);
    }

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

  loadClasse(id: number) {
    this.classeService.getClasseById(id).subscribe({
      next: (data) => {
        this.classe = data;
        this.classeForm.patchValue(this.classe);
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        console.error("Erreur chargement classe :", err);
      }
    });
  }

  updateClasse() {
    if (this.classeForm.invalid) {
      this.classeForm.markAllAsTouched();
      return;
    }

    const updatedClasse = { ...this.classe, ...this.classeForm.value };

    this.classeService.updateClasse(this.classe.id, updatedClasse).subscribe({
      next: () => {
        alert("✅ Classe mise à jour !");
        this.router.navigate(['/ahmedbaba/classes/liste']);
      },
      error: (err) => console.error("Erreur update :", err)
    });
  }

}
