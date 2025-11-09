import { Component, OnInit } from '@angular/core';
import { EleveService } from '../../services/eleve.service';
import { Eleve } from '../../models/eleve';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-elevelist',
  templateUrl: './elevelist.component.html',
  styleUrls: ['./elevelist.component.scss']
})
export class ElevelistComponent implements OnInit {
 apiUrl = `${environment.apiUrl}/api/students`;
eleve: Eleve = {
    id: undefined,
    prenom: '',
    nom: '',
    telephone: '',
    image: undefined,
    date_naissance: undefined,
    matricule: undefined,
    adresse: ''
  }; 
    afficherValidation: boolean = false;
    isSubmitted: boolean = false;
    selectedFile: File | null = null;



  listStudents : any[] = [];
  courseId: any
  showedLoadingModal : boolean = false
loading: any;
    constructor(public studentService: EleveService,  private route: ActivatedRoute, private router: Router) { }
 
    ngOnInit(): void {
      this.getAllStudents();
      //this.courseId= this.route.snapshot.paramMap.get('courseId');
    }
    getAllStudents(): void {
      this.studentService.getAllStudents().subscribe(
        (data: any) => {
          console.log("Données reçues :", data);  
          this.listStudents = data;
        },
        (error) => {
          console.error('Erreur lors de la récupération des cours :', error);
        }
      );
    }
    deleteStudent(id: any): void {
      this.studentService.deleteStudent(id).subscribe(
        () => {
          console.log("Success")
          // Swal.fire({
          //   icon: 'success',
          //   title: 'Succès',
          //   text: 'L\'enregistrement a été supprimé avec succès!',
          //   showConfirmButton: false,
          //   timer: 2000
          // }).then(
          //   ()=>{
          //     window.location.reload();
          //   }
          // );
        },
        (error: any) => {
          console.log('Erreur retournée par le backend:', error);
          const errorMessage = error?.error?.error || error?.message || 'Une erreur s\'est produite lors de la suppression de l\'enregistrement.';
          const statusCode = error?.status || 'N/A'; 
          console.log("Echec")
          // Swal.fire({
          //   icon: 'error',
          //   title: `Erreur - Code: ${statusCode}`,  
          //   text: errorMessage,  
          // });
        }
      );
    }
    
    updateCourse(id: number): void {
     this.router.navigate(["CourseUpdate/"+id])
    }
    showCreateStudent: boolean = false;
 
    toggleCreateStudent() {
      this.showCreateStudent = !this.showCreateStudent;
    }


    ///** GESTION DU NODAL  *///
    openCreatingModal(): void {
    this.showedLoadingModal = true;
  }
 
  closeLoadingModal(): void {
    this.showedLoadingModal = false;
  }
  addStudent() {
      this.isSubmitted = true;
  
      if (this.selectedFile) {
        const formData = new FormData();
        formData.append('image', this.selectedFile);
        formData.append('prenom', this.eleve.prenom);
        formData.append('nom', this.eleve.nom);
        formData.append('telephone', this.eleve.telephone);
       
        if (this.eleve.date_naissance) {
          formData.append('date_naissance', this.eleve.date_naissance.toString());
        }
         console.log("Data : ", formData.get("image"))
        this.studentService.createEleve(formData).subscribe({
          next: () => this.showSuccessAndRedirect(),
          error: (err) => this.showError(err)
        });
      } else {
        this.studentService.createEleve(this.eleve).subscribe({
          next: () => {
            this.showSuccessAndRedirect();
            window.location.reload();
          },
          error: (err) => this.showError(err)
        });
      }
    }
  
    onFileSelected(event: any) {
      const file: File = event.target.files[0];
      if (file) {
        this.selectedFile = file;
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.eleve.image = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    }
    afficheurValidation(): void {
      this.afficherValidation=true;
     // const modal = new bootstrap.Modal(document.getElementById('validationModal'));
    }
    ouiValider(): void{
      this.afficherValidation=false;
      this.addStudent();
    }
    nonAnnuler(): void{
      this.afficherValidation=false;
    }
  
    private showSuccessAndRedirect() {
      console.log("Success")
      // Swal.fire({
      //   icon: 'success',
      //   title: 'Étudiant créé !',
      //   timer: 2000,
      //   showConfirmButton: false
      // });
      setTimeout(() => this.router.navigate(["StudentList"]), 2000);
    }
  
    private showError(error: any) {
      console.error('Erreur:', error);
      console.log('Error ')
      // Swal.fire({
      //   icon: 'error',
      //   title: 'Erreur',
      //   text: error.error?.message || 'Erreur lors de la création',
      // });
    }

}
