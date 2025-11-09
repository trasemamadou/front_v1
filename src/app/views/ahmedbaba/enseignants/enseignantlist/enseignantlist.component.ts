import { Component, OnInit } from '@angular/core';
import { EnseignantService } from '../../services/enseignant.service';
import { Enseignant } from '../../models/enseignant';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-enseignantlist',
  templateUrl: './enseignantlist.component.html',
  styleUrls: ['./enseignantlist.component.scss']
})
export class EnseignantlistComponent implements OnInit {
  
  apiUrl = `${environment.apiUrl}/api/enseignants`;

  enseignant: Enseignant = {
    id: undefined,
    prenom: '',
    nom: '',
    telephone: '',
    image: undefined,
    date_naissance: undefined,
    adresse: '',
    matricule: ''
  };

  listTeachers: any[] = [];
  selectedFile: File | null = null;
  showCreateTeacher: boolean = false;
  isSubmitted: boolean = false;
  afficherValidation: boolean = false;

  constructor(
    private teacherService: EnseignantService,
    private router: Router
  ) {}

  ngOnInit(): void { 
    this.getAllTeachers();
  }

  getAllTeachers(): void {
    this.teacherService.getAllTeachers().subscribe(
      (data) => {
        console.log("Liste enseignants :", data);
        this.listTeachers = data;
      },
      (error) => console.error(error)
    );
  }

  deleteTeacher(id: any): void {
    this.teacherService.deleteEnseignant(id).subscribe(
      () => {
        console.log("Supprimé avec succès !");
        this.getAllTeachers();
      },
      (error) => console.error(error)
    );
  }

  toggleCreateTeacher() {
    this.showCreateTeacher = !this.showCreateTeacher;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.enseignant.image = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  addTeacher() {
    this.isSubmitted = true;

    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('image', this.selectedFile);
      formData.append('prenom', this.enseignant.prenom);
      formData.append('nom', this.enseignant.nom);
      formData.append('telephone', this.enseignant.telephone);
      if (this.enseignant.date_naissance) {
        formData.append('date_naissance', this.enseignant.date_naissance.toString());
      }

      this.teacherService.createEnseignant(formData).subscribe(
        () => {
          console.log("✅ Enseignant ajouté !");
          this.getAllTeachers();
        },
        (err) => console.error(err)
      );

    } else {
      this.teacherService.createEnseignant(this.enseignant).subscribe(
        () => {
          console.log("✅ Enseignant ajouté !");
          this.getAllTeachers();
        },
        (err) => console.error(err)
      );
    }
  }

}
