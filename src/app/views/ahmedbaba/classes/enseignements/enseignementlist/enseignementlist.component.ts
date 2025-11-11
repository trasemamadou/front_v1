import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClasseService } from 'app/views/ahmedbaba/services/classe.service';
import { id } from 'date-fns/locale';

@Component({
  selector: 'app-enseignementlist',
  templateUrl: './enseignementlist.component.html',
  styleUrls: ['./enseignementlist.component.scss']
})
export class EnseignementlistComponent implements OnInit {

  idClasse: number;
  listEnseignements: any[] = [];

  constructor(
    private classeService: ClasseService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    const idClasse = this.route.snapshot.paramMap.get('idClasse');
    if (idClasse) this.getEnseignementsClasse(+idClasse); 
    this.idClasse=+idClasse
  }

  getEnseignementsClasse(idClasse: number): void {
    this.classeService.getEnseignementsClasse(idClasse).subscribe({
      next: (data: any) => {
        this.listEnseignements = data;
        console.log("ENSEIGNEMENTS :", data);
      },
      error: (err) => {
        console.error("Erreur récupération enseignements :", err);
      }
    });
  }

  goToInfo(id: number): void {
    this.router.navigate(['/ahmedbaba/enseignement/info', id]);
  }

  update(id: number): void {
    this.router.navigate(['/ahmedbaba/enseignement/edit', id]);
  }

  delete(id: number): void {
    // Logique suppression
    console.log("Delete", id);
  }


}
