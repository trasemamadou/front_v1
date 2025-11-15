import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClasseService } from 'app/views/ahmedbaba/services/classe.service';
import { ParametrageService } from 'app/views/ahmedbaba/services/parametrage.service';

@Component({
  selector: 'app-parametragelist',
  templateUrl: './parametragelist.component.html',
  styleUrls: ['./parametragelist.component.scss']
})
export class ParametragelistComponent implements OnInit {
idClasse: number;
listParametrages: any[] = [];

  constructor(
    private classeService: ClasseService,
    private parametrageService: ParametrageService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
        const idClasse = this.route.snapshot.paramMap.get('idClasse');
    if (idClasse) this.getParametragesClasse(+idClasse); 
    this.idClasse=+idClasse 
  }

  getParametragesClasse(idClasse: number): void {
    this.classeService.getParametragesClasse(idClasse).subscribe({
      next: (data: any) => {
        this.listParametrages = data;
        console.log("PARAMETRAGES FACTURE :", data);
      },
      error: (err) => {
        console.error("Erreur récupération paramétrages :", err);
      }
    });
  }

  update(id: number): void {
    this.router.navigate(['/parametrage-facture/edit', id]);
  }

  delete(id: number): void {
    // Appel service suppression
    this.parametrageService.deleteParametrage(id).subscribe({
      next: () => {
        this.listParametrages = this.listParametrages.filter(p => p.id !== id);
        console.log("Paramétrage supprimé :", id);
      },
      error: (err) => console.error("Erreur suppression :", err)
    });
  }

}
