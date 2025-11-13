import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
const apiUrl = `${environment.apiUrl}/api/classes`;
@Injectable({
  providedIn: 'root'
})

export class ClasseService {

    constructor(private http: HttpClient) {
     }
     public getAllClasses(): Observable<any[]>{
      return this.http.get<any[]>(apiUrl);
    }
    public filterClasseByKeyword(keyword: string): Observable<any[]>{
      return this.http.get<any[]>(`${apiUrl}/search/${keyword}`);
    }
    public getClasseById(id: number): Observable<any>{
      return this.http.get(`${apiUrl}/${id}`);
    }
    public createClasse(classe: any): Observable<any>{
      return this.http.post(apiUrl, classe);
    }
    public updateClasse(id: number, classe: any): Observable<any>{
      return this.http.put(`${apiUrl}/${id}`, classe);
    }
    public deleteClasse(id: number): Observable<any>{
      return this.http.delete(`${apiUrl}/${id}`);
    }
    public getEnseignementsClasse(idClasse: number){
      return this.http.get(`${apiUrl}/enseignements/${idClasse}`);
    }
    public createEnseignement(payload: any){
      return this.http.get(`${apiUrl}/enseignements/${payload}`);
    }
    
}
