import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EnseignantService } from '../../services/enseignant.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-enseignant-profile',
  templateUrl: './enseignantprofile.component.html',
  styleUrls: ['./enseignantprofile.component.scss']
})
export class EnseignantprofileComponent implements OnInit {

  enseignant: any;
 apiUrl = `${environment.apiUrl}/api/enseignants`;
loading: any;

  constructor(
    private enseignantService: EnseignantService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];

    this.enseignantService.getTeacherById(id).subscribe({
      next: (data) => this.enseignant = data,
      error: () => console.error("Erreur : impossible de charger le profil.")
    });
  }
  updateTeacher() {
    this.router.navigate(['/ahmedbaba/enseignants/update', this.enseignant.id]);
  }
  deleteEnseignant(): void {
    if (!confirm("Supprimer cet enseignant ?")) return;

    this.enseignantService.deleteEnseignant(this.enseignant.id).subscribe({
      next: () => this.router.navigate(['/enseignants']),
      error: (err) => console.error(err)
    });
  }
}
