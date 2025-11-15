import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
const apiUrl = `${environment.apiUrl}/api/parametrageFacturation`;
@Injectable({
  providedIn: 'root'
})
export class ParametrageService {

   constructor(private http: HttpClient) { }

  /** Récupérer toute la configuration */
  public getAllParametrages(): Observable<any> {
    return this.http.get(apiUrl);
  }

  /** Rechercher par mot clé */
  public filterParametrageByKeyword(keyword: string): Observable<any> {
    return this.http.get(`${apiUrl}/search/${keyword}`);
  }

  /** Trouver un paramétrage par ID */
  public getParametrageById(id: number): Observable<any> {
    return this.http.get<any>(`${apiUrl}/${id}`);
  }

  /** Créer un paramétrage facture */
  public createParametrage(data: any): Observable<any> {
    return this.http.post<any>(`${apiUrl}`, data);
  }

  /** Modifier un paramétrage */
  public updateParametrage(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${apiUrl}/update/${id}`, data);
  }

  /** Supprimer un paramétrage */
  public deleteParametrage(id: number): Observable<any> {
    return this.http.delete<any>(`${apiUrl}/delete/${id}`);
  }
}
