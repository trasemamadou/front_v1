import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClasseService } from 'app/views/ahmedbaba/services/classe.service';
import { ParametrageService } from 'app/views/ahmedbaba/services/parametrage.service';
import { map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-parametrageupdate',
  templateUrl: './parametrageupdate.component.html',
  styleUrls: ['./parametrageupdate.component.scss']
})
export class ParametrageupdateComponent implements OnInit {

  form!: FormGroup;
  id!: number;

  classes: any[] = [];
  filteredClasse!: Observable<any[]>;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private classeService: ClasseService,
    private parametrageService: ParametrageService,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.form = this.fb.group({
      description: ['', Validators.required],
      object: ['', Validators.required],
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required],
      montant: [0, [Validators.required, Validators.min(0)]],
      classeId: [null, Validators.required],
      classeSearch: ['']
    });

    this.loadClasses();
    this.loadParametrage();

    this.filteredClasse = this.form.controls['classeSearch'].valueChanges.pipe(
      startWith(''),
      map(value => this.filterClasses(value))
    );
  }

  // Load all classes
  loadClasses(): void {
    this.classeService.getAllClasses().subscribe({
      next: (res: any) => this.classes = res ?? [],
      error: err => console.error('Erreur chargement classes', err)
    });
  }

  // Load existing parametrage data
  loadParametrage(): void {
    this.parametrageService.getParametrageById(this.id).subscribe({
      next: (data: any) => {
        this.form.patchValue({
          description: data.description,
          object: data.object,
          dateDebut: data.dateDebut,
          dateFin: data.dateFin,
          montant: data.montant,
          classeId: data.classe?.id ?? null,
          classeSearch: data.classe ?? '' // on met l'objet complet → displayWith affiche .nom
        });
      },
      error: err => console.error('Erreur chargement parametrage', err)
    });
  }

  // filter autocomplete
  filterClasses(value: any): any[] {
    const filterText = typeof value === 'string' ? value : value?.nom ?? '';
    const lower = filterText.toLowerCase();

    return this.classes.filter(c =>
      (c.nom ?? '').toLowerCase().includes(lower)
    );
  }

  // selected option
  onClasseSelected(classe: any) {
    if (!classe) return;

    this.form.patchValue({
      classeId: classe.id,
      classeSearch: classe
    });
  }

  // display in autocomplete
  displayClasseName(classe: any): string {
    return typeof classe === 'string'
      ? classe
      : classe?.nom ?? '';
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = {
      ...this.form.value,
      classeSearch: undefined
    };

    this.parametrageService.updateParametrage(this.id, payload).subscribe({
      next: () => {
        this.router.navigate(['/ahmedbaba/classes/parametrage']);
      },
      error: err => console.error('Erreur update', err)
    });
  }
}
