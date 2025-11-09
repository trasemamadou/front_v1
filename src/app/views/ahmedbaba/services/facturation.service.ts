import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { environment } from 'environments/environment';
import { Facturation } from '../models/facturation';

@Injectable({
  providedIn: 'root'
})
export class FacturationService {
  private apiUrl = `${environment.apiUrl}/api/facturations`; // adapte si diff

  constructor(private http: HttpClient) {}

  getAllFactures(): Observable<Facturation[]> {
    return this.http.get<Facturation[]>(this.apiUrl);
  }

  deleteFacture(libelle: string): Observable<void> {
    // si ton backend supprime par libelle, sinon utilise id
    return this.http.delete<void>(`${this.apiUrl}/${encodeURIComponent(libelle)}`);
  }

  // méthodes create/update si besoin
  createFacture(payload: Facturation) {
    return this.http.post<Facturation>(this.apiUrl, payload);
  }

  updateFacture(libelle: string, payload: Facturation) {
    return this.http.put<Facturation>(`${this.apiUrl}/${encodeURIComponent(libelle)}`, payload);
  }
}
