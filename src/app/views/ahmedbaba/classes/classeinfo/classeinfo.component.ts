import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClasseService } from '../../services/classe.service';

@Component({
  selector: 'app-classeinfo',
  templateUrl: './classeinfo.component.html',
  styleUrls: ['./classeinfo.component.scss']
})
export class ClasseinfoComponent implements OnInit {

  classe: any;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private classeService: ClasseService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.getClasse(+id);
  }

  getClasse(id: number) {
    this.classeService.getClasseById(id).subscribe({
      next: (data) => {
        console.log("Data:", data)
        this.classe = data;
        this.loading = false;
      },
      error: (err) => {
        console.error("Erreur :", err);
        this.loading = false;
      }
    });
  }

  updateClasse() {
    this.router.navigate(['/ahmedbaba/classes/update', this.classe.id]);
  }

  deleteClasse() {
    if (!confirm("Voulez-vous vraiment supprimer cette classe ?")) return;

    this.classeService.deleteClasse(this.classe.id).subscribe({
      next: () => {
        alert("Classe supprimée !");
        this.router.navigate(['/ahmedbaba/classes/liste']);
      },
      error: (err) => console.error(err)
    });
  }
    goToEnseignement() {
    this.router.navigate(['/ahmedbaba/classes/enseignements/liste', this.classe.id]);
  }

}
