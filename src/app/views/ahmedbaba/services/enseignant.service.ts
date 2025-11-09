import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Enseignant } from '../models/enseignant';
import { environment } from 'environments/environment';

const apiUrl = `${environment.apiUrl}/api/enseignants`;

@Injectable({
  providedIn: 'root'
})
export class EnseignantService {

  constructor(private http: HttpClient) { }

  public getAllTeachers(): Observable<any> {
    return this.http.get(apiUrl);
  }


  public filterEnseignantByKeyword(keyword: string): Observable<any> {
    return this.http.get(`${apiUrl}/search/${keyword}`);
  }

  public getTeacherById(id: number): Observable<any> {
    return this.http.get<any>(`${apiUrl}/${id}`);
  }

  public createEnseignant(enseignant: any): Observable<any> {
    console.log("Enseignant Model : ", enseignant.values());
    return this.http.post<any>(`${apiUrl}`, enseignant);
  }

  public updateEnseignant(id: number, enseignant: FormData): Observable<Enseignant> {
    return this.http.put<any>(`${apiUrl}/update/${id}`, enseignant);
  }

  public deleteEnseignant(id: number): Observable<any> {
    return this.http.delete<any>(`${apiUrl}/delete/${id}`);
  }
}
