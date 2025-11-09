import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

const apiUrl = `${environment.apiUrl}/api/matieres`;

@Injectable({
  providedIn: 'root'
})
export class MatiereService {

  constructor(private http: HttpClient) { }

  // ✅ Récupérer toutes les matières
  public getAllMatieres(): Observable<any[]> {
    return this.http.get<any[]>(apiUrl);
  }

  // ✅ Rechercher des matières par mot-clé
  public filterMatiereByKeyword(keyword: string): Observable<any[]> {
    return this.http.get<any[]>(`${apiUrl}/search/${keyword}`);
  }

  // ✅ Récupérer une matière par son ID
  public getMatiereById(id: number): Observable<any> {
    return this.http.get<any>(`${apiUrl}/${id}`);
  }

  // ✅ Créer une nouvelle matière
  public createMatiere(matiere: any): Observable<any> {
    return this.http.post<any>(apiUrl, matiere);
  }

  // ✅ Mettre à jour une matière
  public updateMatiere(id: number, matiere: any): Observable<any> {
    return this.http.put<any>(`${apiUrl}/${id}`, matiere);
  }

  // ✅ Supprimer une matière
  public deleteMatiere(id: number): Observable<any> {
    return this.http.delete<any>(`${apiUrl}/${id}`);
  }
}
