import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ParametrageService } from 'app/views/ahmedbaba/services/parametrage.service';
import { FacturationService } from 'app/views/ahmedbaba/services/facturation.service';
import { map, Observable, startWith } from 'rxjs';
import { EleveService } from '../../services/eleve.service';

@Component({
  selector: 'app-facturation-create',
  templateUrl: './facturationcreate.component.html',
  styleUrls: ['./facturationcreate.component.scss']
})
export class FacturationcreateComponent implements OnInit {

 form!: FormGroup;
  parametrages: any[] = [];
  filteredParametrages!: Observable<any[]>;

  etudiants: any[] = [];
  filteredEtudiants!: Observable<any[]>;

  constructor(
    private fb: FormBuilder,
    private parametrageService: ParametrageService,
    private facturationService: FacturationService,
    private etudiantService: EleveService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      parametrageSearch: ['', Validators.required],
      parametragefacturationId: [null, Validators.required],
      description: [{value: '', disabled: true}, Validators.required],
      object: [{value: '', disabled: true}, Validators.required],
      montant: [{value: 0, disabled: true}, [Validators.required, Validators.min(0)]],
      studentSearch: ['', Validators.required],
      studentId: [null, Validators.required]
    });

    this.loadParametrages();
    this.loadEtudiants();

    // autocomplete parametrages
    this.filteredParametrages = this.form.controls['parametrageSearch'].valueChanges.pipe(
      startWith(''),
      map(value => this.filterParametrages(value))
    );

    // autocomplete etudiants
    this.filteredEtudiants = this.form.controls['studentSearch'].valueChanges.pipe(
      startWith(''),
      map(value => this.filterEtudiants(value))
    );
  }

  loadParametrages(): void {
    this.parametrageService.getAllParametrages().subscribe({
      next: (res: any) => this.parametrages = res ?? [],
      error: err => console.error('Erreur chargement parametrages', err)
    });
  }

  loadEtudiants(): void {
    this.etudiantService.getAllStudents().subscribe({
      next: (res: any) => this.etudiants = res ?? [],
      error: err => console.error('Erreur chargement etudiants', err)
    });
  }

  filterParametrages(value: any): any[] {
    const filterText = typeof value === 'string' ? value : value?.description ?? '';
    const lower = filterText.toLowerCase();
    return this.parametrages.filter(p => (p.description ?? '').toLowerCase().includes(lower));
  }

 // Remplace displayEtudiant et filterEtudiants
displayEtudiant(s: any): string {
  return s ? `${s.nom} ${s.prenom}` : '';
}

filterEtudiants(value: any): any[] {
  const filterText = typeof value === 'string' ? value : `${value.nom} ${value.prenom}`;
  const lower = filterText.toLowerCase();
  return this.etudiants.filter(s => {
    const fullName = `${s.nom} ${s.prenom}`.toLowerCase();
    return fullName.includes(lower);
  });
}

onEtudiantSelected(student: any) {
  if (!student) return;
  this.form.patchValue({ studentId: student.id });
}


  displayParametrage(p: any): string {
    return typeof p === 'string' ? p : p?.description ?? '';
  }
 

  onParametrageSelected(param: any) {
    if (!param) return;

    this.form.patchValue({
      parametragefacturationId: param.id,
      description: param.description,
      object: param.object,
      montant: param.montant
    });
  }

  

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = {
      description: this.form.get('description')!.value,
      object: this.form.get('object')!.value,
      montant: this.form.get('montant')!.value,
      statut: this.form.get('statut')!.value,
      parametragefacturationId: this.form.get('parametragefacturationId')!.value,
      studentId: this.form.get('studentId')!.value
    };

    this.facturationService.createFacture(payload).subscribe({
      next: data => console.log('Facturation créée :', data),
      error: err => console.error('Erreur création facturation :', err)
    });
  }
}
