import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClasseService } from 'app/views/ahmedbaba/services/classe.service';
import { ParametrageService } from 'app/views/ahmedbaba/services/parametrage.service';
import { map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-parametragecreate',
  templateUrl: './parametragecreate.component.html',
  styleUrls: ['./parametragecreate.component.scss']
})
export class ParametragecreateComponent implements OnInit {

  form!: FormGroup;
  filteredClasse!: Observable<any[]>;
  classes: any[] = [];   // Liste des classes
  idClasse: any
  constructor(
    private classeService: ClasseService,
    private parametrageService: ParametrageService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    // FormGroup : on ajoute classeSearch pour l'input visible et classeId pour l'id réel
    this.form = this.fb.group({
      description: ['', Validators.required],
      object: ['', Validators.required],
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required],
      montant: [0, [Validators.required, Validators.min(0)]],
      classeId: [null, Validators.required],     // stocke l'ID réel (hidden)
      classeSearch: ['']                          // champ visible pour l'autocomplete
    });

    this.loadData();

    // autocomplete basé sur le champ "classeSearch"
    this.filteredClasse = this.form.controls['classeSearch'].valueChanges.pipe(
      startWith(''),
      map(value => this.filterClasses(value))
    );
            
    const idClasse = this.route.snapshot.paramMap.get('idClasse');
    this.idClasse=+idClasse 
  }

  loadData(): void {
    this.classeService.getAllClasses().subscribe({
      next: (res: any) => {
        this.classes = res || [];
      },
      error: (err) => console.error('Erreur lors du chargement des classes : ', err)
    });
  }

  /**
   * Filtrage robuste : value peut être string (typing) ou object (sélection)
   */
  filterClasses(value: any): any[] {
    const filterText = typeof value === 'string' ? value : value?.nom ?? '';
    const ft = filterText.toLowerCase();
    return this.classes.filter((c: any) =>
      (c.nom ?? '').toLowerCase().includes(ft)
    );
  }

  /**
   * Quand l'utilisateur sélectionne une classe depuis l'autocomplete
   * - on stocke l'id dans classeId (pour envoi)
   * - on met l'objet (ou son nom) dans classeSearch pour affichage (displayWith gérera)
   */
  onClasseSelected(classe: any) {
    if (!classe) return;
    this.form.patchValue({
      classeId: classe.id,
      classeSearch: classe   // on met l'objet : displayWith affichera son .nom
    }, { emitEvent: false }); // éviter de ré-émettre valueChanges si pas nécessaire
  }

  /**
   * Fonction utilisée par mat-autocomplete [displayWith] pour afficher le nom
   * si la valeur est un objet (ou retourner la string si c'est déjà du texte).
   */
  displayClasseName(classe: any): string {
    return typeof classe === 'string' ? classe : classe?.nom ?? '';
  }

  onSubmit(): void {
    // validation : si l'utilisateur n'a que tapé du texte et n'a pas choisi, classeId reste null
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = {
      ...this.form.value,
      // si tu veux exclure classeSearch du payload envoyé :
      classeSearch: undefined
    };

    // Envoi (supprime classeSearch si besoin côté backend)
    this.parametrageService.createParametrage(payload).subscribe({
      next: (data) => {
        console.log('Success', data);
        this.redirectToParametrageListe(this.idClasse)
      },
      error: (error) => {
        console.log('Error :', error);
      }
    });
  }
    redirectToParametrageListe(id: number): void {
      console.log("Yes :", id)
    this.router.navigate(['/ahmedbaba/classes/parametrages/liste', id]);
  }
}
