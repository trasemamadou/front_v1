export class Eleve {
    id?: number;
    prenom!: string;
    nom!: string;
    date_naissance?: Date;
   // email!: string;
   telephone!: string;
    image!: File | undefined;
    matricule: string | undefined;
    adresse!: string;
    cheminProfil?: string;
  
}
  