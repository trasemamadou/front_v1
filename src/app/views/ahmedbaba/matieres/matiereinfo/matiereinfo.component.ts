import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatiereService } from '../../services/matiere.service';

@Component({
  selector: 'app-matiereinfo',
  templateUrl: './matiereinfo.component.html',
  styleUrls: ['./matiereinfo.component.scss']
})
export class MatiereinfoComponent implements OnInit {

  matiere: any;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private matiereService: MatiereService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.getMatiere(+id);
  }

  getMatiere(id: number) {

    this.matiereService.getMatiereById(id).subscribe({
      next: (data) => {
        console.log("Data:", data);
        this.matiere = data.matiere;
        this.loading = false;
      },
      error: (err) => {
        console.error("Erreur :", err);
        this.loading = false;
      }
    });
  }
 

  deleteMatiere() {
    if (!confirm("Voulez-vous vraiment supprimer cette matière ?")) return;

    this.matiereService.deleteMatiere(this.matiere.id).subscribe({
      next: () => {
        alert("Matière supprimée !");
        this.router.navigate(['/ahmedbaba/matieres/liste']);
      },
      error: (err) => console.error(err)
    });
  }

}
