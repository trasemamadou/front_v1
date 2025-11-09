import { Component, OnInit } from '@angular/core';
import { FacturationService } from '../../services/facturation.service';
 
import { Router } from '@angular/router';
import { Facturation } from '../../models/facturation';

@Component({
  selector: 'app-facturationlist',
  templateUrl: './facturationlist.component.html',
  styleUrls: ['./facturationlist.component.scss'] // tu peux laisser le fichier vide ou le retirer si tu veux
})
export class FacturationlistComponent implements OnInit {

  listFactures: Facturation[] = [];
  isLoading = false;
  errorMessage: string | null = null;


  constructor(
    private facturationService: FacturationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllFactures();
  }

  getAllFactures(): void {
    this.isLoading = true;
    this.errorMessage = null;
    this.facturationService.getAllFactures().subscribe({
      next: (data) => {
        this.listFactures = data || [];
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur récupération factures', err);
        this.errorMessage = err?.message || 'Erreur lors de la récupération';
        this.isLoading = false;
      }
    });
  }

  deleteFacture(libelle?: string): void {
    if (!libelle) return;
    if (!confirm(`Supprimer la facture ${libelle} ?`)) return;
    this.facturationService.deleteFacture(libelle).subscribe({
      next: () => this.getAllFactures(),
      error: (err) => console.error('Erreur suppression', err)
    });
  }

  goToDetails(libelle?: string): void {
    if (!libelle) return;
    // redirige vers une route de détail que tu peux implémenter
    this.router.navigate(['/factures', libelle]);
  }

  formatMontant(m?: number): string {
    if (m == null) return '-';
    // adaptateur : tu peux changer 'XOF' par la devise souhaitée
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XOF' }).format(m);
  }
}
