import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatiereService } from '../../services/matiere.service';

@Component({
  selector: 'app-matierelist',
  templateUrl: './matierelist.component.html',
  styleUrls: ['./matierelist.component.scss']
})
export class MatierelistComponent implements OnInit {

  listMatieres: any[] = [];

  matiere: any = {
    nom: '',
    name: '',
    description: ''
  };

  isSubmitted: boolean = false;
  showedLoadingModal: boolean = false;

  constructor(
    private matiereService: MatiereService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllMatieres();
  }

  // ✅ Récupérer toutes les matières
  getAllMatieres(): void {
    this.matiereService.getAllMatieres().subscribe(
      (data: any) => {
        this.listMatieres = data.matieres;
        console.log("📚 Liste des matières :", data);
      },
      (error: any) => {
        console.error('❌ Erreur lors de la récupération des matières :', error);
      }
    );
  }

  openCreatingModal(): void {
    this.showedLoadingModal = true;
  }

  closeLoadingModal(): void {
    this.showedLoadingModal = false;
  }

  // ✅ Ajouter une nouvelle matière
  addMatiere(): void {
    this.isSubmitted = true;

    if (!this.matiere.nom) {
      console.warn('⚠️ Nom de la matière requis');
      return;
    }

    this.matiereService.createMatiere(this.matiere).subscribe({
      next: () => {
        console.log('✅ Matière créée avec succès');
        this.closeLoadingModal();
        this.getAllMatieres();
      },
      error: (error) => {
        console.error('❌ Erreur lors de la création de la matière :', error);
      }
    });
  }

  // ✅ Supprimer une matière
  supprimerMatiere(id: number): void {
    this.matiereService.deleteMatiere(id).subscribe({
      next: () => {
        console.log('🗑️ Matière supprimée');
        this.getAllMatieres();
      },
      error: (error) => {
        console.error('❌ Erreur lors de la suppression :', error);
      }
    });
  }

  // ✅ Modifier une matière (redirection ou modal)
  modifierMatiere(m: any): void {
    this.router.navigate(['/ahmedbaba/matieres/modifier', m.id]);
  }
}
