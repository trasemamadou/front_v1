import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClasseService } from 'app/views/ahmedbaba/services/classe.service';
import { EnseignantService } from 'app/views/ahmedbaba/services/enseignant.service';
import { MatiereService } from 'app/views/ahmedbaba/services/matiere.service';
import { Observable, startWith, map } from 'rxjs';

@Component({
  selector: 'app-enseignementcreate',
  templateUrl: './enseignementcreate.component.html',
  styleUrls: ['./enseignementcreate.component.scss']
})
export class EnseignementcreateComponent implements OnInit {
form!: FormGroup;

  enseignants: any[] = [];
  matieres: any[] = [];

  filteredEnseignants!: Observable<any[]>;
  filteredMatieres!: Observable<any[]>;

  selectedEnseignant: any;
  selectedMatiere: any;

  constructor(
    private fb: FormBuilder,
    private enseignantService: EnseignantService,
    private matiereService: MatiereService,
    private classeService: ClasseService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      enseignant: ['', Validators.required],
      matiere: ['', Validators.required]
    });

    this.loadData();

    // filtres
    this.filteredEnseignants = this.form.controls['enseignant'].valueChanges.pipe(
      startWith(''),
      map(value => this.filterEnseignants(value))
    );

    this.filteredMatieres = this.form.controls['matiere'].valueChanges.pipe(
      startWith(''),
      map(value => this.filterMatieres(value))
    );
  }

loadData(): void {
  this.enseignantService.getAllTeachers().subscribe({
    next: (res: any) => {
      this.enseignants = res; // Si ton backend renvoie directement la liste
    },
    error: (err) => console.error('Erreur lors du chargement des enseignants : ', err)
  });

  this.matiereService.getAllMatieres().subscribe({
    next: (res: any) => {
      this.matieres = res.matieres; // Si ton backend renvoie { matieres: [...] }
    },
    error: (err) => console.error('Erreur lors du chargement des matières : ', err)
  });
}

  filterEnseignants(value: string) {
    const filterValue = value.toLowerCase();
    return this.enseignants.filter((e: any) =>
      (e.nom + ' ' + e.prenom).toLowerCase().includes(filterValue)
    );
  }

  filterMatieres(value: string) {
    const filterValue = value.toLowerCase();
    return this.matieres.filter((m: any) =>
      m.name.toLowerCase().includes(filterValue)
    );
  }

  selectEnseignant(fullName: string) {
    this.selectedEnseignant = this.enseignants.find(e =>
      (e.nom + ' ' + e.prenom) === fullName
    );
  }

  selectMatiere(name: string) {
    this.selectedMatiere = this.matieres.find(m => m.name === name);
  }

  onSubmit() {
    if (!this.selectedEnseignant || !this.selectedMatiere) {
      return;
    }

    const payload = {
      enseignantId: this.selectedEnseignant.id,
      matiereId: this.selectedMatiere.id,
      classeId: 1 // ⚠️ à remplacer par le vrai id classe passé dans l'URL
    };

    this.classeService.createEnseignement(payload).subscribe({
      next: () => {
        alert("Enseignement ajouté !");
      }
    });
  }

}
