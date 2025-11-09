import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClasseService } from '../../services/classe.service';

@Component({
  selector: 'app-classelist',
  templateUrl: './classelist.component.html',
  styleUrls: ['./classelist.component.scss']
})
export class ClasselistComponent implements OnInit {

listClasses: any[] = [];

  classe: any = {
    nom: ''
  };

  isSubmitted: boolean = false;
  showedLoadingModal: boolean = false;

  constructor(
    private classeService: ClasseService,
  //  private courseService: CourseService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllClasses();
  }

  getAllClasses(): void {
    this.classeService.getAllClasses().subscribe(
      (data: any) => {
        this.listClasses = data;
        console.log("Data : ", data)
      },
      (error: any) => {
        console.error('Erreur lors de la récupération des classes :', error);
      }
    );
  }

  openCreatingModal(): void {
    this.showedLoadingModal = true;
  }

  closeLoadingModal(): void {
    this.showedLoadingModal = false;
  }

  addClasse(): void {
    this.isSubmitted = true;

    if (!this.classe.nom) {
      return;
    }

    this.classeService.createClasse(this.classe).subscribe({
      next: () => {
        // Swal.fire({
        //   icon: 'success',
        //   title: 'Classe créée !',
        //   timer: 2000,
        //   showConfirmButton: false
        // }).then(() => {
        //   this.closeLoadingModal();
        //   this.getAllClasses();
        // });
      },
      error: (error) => {
        console.error('Erreur:', error);
        // Swal.fire({
        //   icon: 'error',
        //   title: 'Erreur',
        //   text: error.error?.message || 'Erreur lors de la création'
        // });
      }
    });
  }



}
