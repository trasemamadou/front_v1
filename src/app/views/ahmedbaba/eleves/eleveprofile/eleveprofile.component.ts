import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EleveService } from '../../services/eleve.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-eleveprofile',
  templateUrl: './eleveprofile.component.html',
  styleUrls: ['./eleveprofile.component.scss']
})
export class EleveprofileComponent implements OnInit {

  apiUrl = `${environment.apiUrl}/api/students`;
  eleve: any;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eleveService: EleveService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.getStudent(+id);
  }

  getStudent(id: number) {
    this.eleveService.getStudentById(id).subscribe({
      next: (data) => {
        console.log("Date!", data)
        this.eleve = data;
        this.loading = false;
      },
      error: (err) => {
        console.error("Erreur :", err);
        this.loading = false;
      }
    });
  }

  updateStudent() {
    this.router.navigate(['/ahmedbaba/eleves/update', this.eleve.id]);
  }

  deleteStudent() {
    if (!confirm("Voulez-vous vraiment supprimer cet élève ?")) return;

    this.eleveService.deleteStudent(this.eleve.id).subscribe({
      next: () => {
        alert("Élève supprimé !");
        this.router.navigate(['/ahmedbaba/eleves/liste']);
      },
      error: (err) => console.error(err)
    });
  }

}
