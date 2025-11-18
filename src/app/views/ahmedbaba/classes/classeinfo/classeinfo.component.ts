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

  // Fonction pour calculer le taux d'occupation
  getOccupationRate(classe: any): number {
    if (!classe.capaciteMax || classe.capaciteMax === 0) return 0;
    return Math.round((classe.effectifActuel / classe.capaciteMax) * 100);
  }

  // Fonction pour déterminer la couleur de la barre de progression
  getProgressColor(rate: number): string {
    if (rate >= 90) return 'warn';
    if (rate >= 75) return 'accent';
    return 'primary';
  }

  // Fonction pour formater le libellé du régime
  getRegimeLabel(regime: string): string {
    const regimes: { [key: string]: string } = {
      'MATIN': 'Matin',
      'APRES_MIDI': 'Après-midi',
      'JOURNEE_CONTINUE': 'Journée continue'
    };
    return regimes[regime] || regime || 'Non défini';
  }

  // Fonction pour obtenir la description du régime
  getRegimeDescription(regime: string): string {
    const descriptions: { [key: string]: string } = {
      'MATIN': 'Cours dispensés uniquement le matin',
      'APRES_MIDI': 'Cours dispensés uniquement l\'après-midi',
      'JOURNEE_CONTINUE': 'Cours répartis sur toute la journée avec pause déjeuner'
    };
    return descriptions[regime] || 'Horaire standard';
  }

  // Fonction pour archiver la classe
  archiverClasse(): void {
    if (!confirm("Voulez-vous archiver cette classe ? Elle ne sera plus disponible pour les nouvelles inscriptions.")) return;

    this.classeService.updateClasse(this.classe.id, { archive: true }).subscribe({
      next: (data) => {
        this.classe = data;
        alert("Classe archivée avec succès !");
      },
      error: (err) => {
        console.error("Erreur lors de l'archivage :", err);
        alert("Erreur lors de l'archivage de la classe.");
      }
    });
  }

  // Fonction pour désarchiver la classe
  desarchiverClasse(): void {
    if (!confirm("Voulez-vous désarchiver cette classe ? Elle sera à nouveau disponible pour les inscriptions.")) return;

    this.classeService.updateClasse(this.classe.id, { archive: false }).subscribe({
      next: (data) => {
        this.classe = data;
        alert("Classe désarchivée avec succès !");
      },
      error: (err) => {
        console.error("Erreur lors du désarchivage :", err);
        alert("Erreur lors du désarchivage de la classe.");
      }
    });
  }

  // Fonction pour obtenir le libellé de l'étage
  getEtageLabel(etage: number): string {
    if (etage === 0) return 'Rez-de-chaussée';
    if (etage === 1) return '1er étage';
    return `${etage}ème étage`;
  }

  // Fonction pour obtenir la couleur du badge selon le niveau
  getNiveauColor(niveau: string): string {
    const colors: { [key: string]: string } = {
      'CI': '#ff6b6b',
      'CP': '#4ecdc4',
      'CE1': '#45b7d1',
      'CE2': '#96ceb4',
      'CM1': '#feca57',
      'CM2': '#ff9ff3'
    };
    return colors[niveau] || '#1976d2';
  }

  // Fonction pour formater la capacité
  getCapacityDisplay(classe: any): string {
    if (!classe.capaciteMax) return 'Capacité illimitée';
    return `${classe.effectifActuel || 0} / ${classe.capaciteMax} élèves`;
  }

  // Fonction pour obtenir le statut de la classe
  getClasseStatus(classe: any): { text: string, color: string, icon: string } {
    if (classe.archive) {
      return {
        text: 'Archivée',
        color: 'warn',
        icon: 'archive'
      };
    }
    
    const occupationRate = this.getOccupationRate(classe);
    if (occupationRate >= 90) {
      return {
        text: 'Complète',
        color: 'warn',
        icon: 'block'
      };
    } else if (occupationRate >= 75) {
      return {
        text: 'Presque complète',
        color: 'accent',
        icon: 'warning'
      };
    } else {
      return {
        text: 'Disponible',
        color: 'primary',
        icon: 'check_circle'
      };
    }
  }

  // Fonction pour naviguer vers la liste des élèves de la classe
  voirEleves(): void {
    this.router.navigate(['/ahmedbaba/eleves'], { 
      queryParams: { classe: this.classe.id } 
    });
  }

  // Fonction pour copier l'ID de la classe
  copierId(): void {
    navigator.clipboard.writeText(this.classe.id.toString()).then(() => {
      // Vous pouvez ajouter un toast ou une notification ici
      console.log('ID copié dans le presse-papier');
    });
  }
}