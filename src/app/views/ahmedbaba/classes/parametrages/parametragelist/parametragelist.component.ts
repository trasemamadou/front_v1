import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationdialogComponent } from 'app/views/ahmedbaba/confirmationdialog/confirmationdialog.component';
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
    private route: ActivatedRoute,
        private dialog: MatDialog
  ) { }

  ngOnInit(): void {
        const idClasse = this.route.snapshot.paramMap.get('idClasse');
    if (idClasse) this.getParametragesClasse(+idClasse); 
    this.idClasse=+idClasse 
  }

  getParametragesClasse(idClasse: number): void {
    this.classeService.getParametragesClasse(idClasse).subscribe({
      next: (data: any) => {
        console.log("Data : ", data)
        this.listParametrages = data; 
      },
      error: (err) => {
        console.error("Erreur récupération paramétrages :", err);
      }
    });
  }

  update(id: number): void {
    this.router.navigate(['/ahmedbaba/classes/parametrages/update', id]);
  }

delete(id: number): void {

  const dialog = this.dialog.open(ConfirmationdialogComponent, {
    width: '350px',
    data: { message: "Voulez-vous vraiment supprimer ce paramétrage ?" }
  });

  dialog.afterClosed().subscribe(result => {
    if (result === true) {
      this.parametrageService.deleteParametrage(id).subscribe({
        next: () => {
          this.listParametrages = this.listParametrages.filter(p => p.id !== id);
          console.log("Paramétrage supprimé :", id);
        },
        error: (err) => console.error("Erreur suppression :", err)
      });
    }
  });

}
}
