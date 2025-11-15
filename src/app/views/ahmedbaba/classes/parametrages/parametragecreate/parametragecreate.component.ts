import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClasseService } from 'app/views/ahmedbaba/services/classe.service';
import { ParametrageService } from 'app/views/ahmedbaba/services/parametrage.service';
import { error } from 'console';
import { map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-parametragecreate',
  templateUrl: './parametragecreate.component.html',
  styleUrls: ['./parametragecreate.component.scss']
})
export class ParametragecreateComponent implements OnInit {
  
  form: FormGroup;
  filteredClasse: Observable<any>;
  classes: any[] = [];   // Liste des classes

  constructor(
    private classeService: ClasseService,
    private parametrageService: ParametrageService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    
    // ✅ Ton FormGroup correct
    this.form = this.fb.group({
      description: ['', Validators.required],
      object: ['', Validators.required],
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required],
      montant: [0, [Validators.required, Validators.min(0)]],
      classeId: ['', Validators.required]
    });

    this.loadData();

    // ✅ autocomplete basé sur classeId
    this.filteredClasse = this.form.controls['classeId'].valueChanges.pipe(
      startWith(''),
      map(value => this.filterClasses(value))
    );
  }

  loadData(): void {
    this.classeService.getAllClasses().subscribe({
      next: (res: any) => {
        this.classes = res;   // liste des classes
      },
      error: (err) => console.error('Erreur lors du chargement des classes : ', err)
    });
  }

  // ✅ Filtre basé sur le nom de la classe
  filterClasses(value: string) {
    const filterValue = value.toLowerCase();
    return this.classes.filter((c: any) =>
      (c.nom ?? '').toLowerCase().includes(filterValue)
    );
  }
  onSubmit(): Observable<any> {
  if (this.form.invalid) {
    this.form.markAllAsTouched();
    return; // ⚠ TypeScript va se plaindre si tu ne mets rien -> use EMPTY
  }

  const payload = this.form.value;
 this.parametrageService.createParametrage(payload).subscribe({
    next: (data)=> {
      console.log("Success", data);
    }, 
    error: (error) =>{
      console.log("Error :", error)
    }
    });
}

}
