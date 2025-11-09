import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Eleve } from '../models/eleve';
import { environment } from 'environments/environment';
const apiUrl = `${environment.apiUrl}/api/students`;
@Injectable({
  providedIn: 'root'
})
export class EleveService {
constructor( private http: HttpClient) { }
  public getAllStudents(): Observable<any>{
    return this.http.get(apiUrl);
  }
    public filterEtudiantByKeyword(keyword: string): Observable<any>{
    return this.http.get(`${apiUrl}/search/${keyword}`);
  }
  public getStudentAverage(id: number): Observable<any>{
    return  this.http.get<any>(`${apiUrl}/moyenne/${id}`);
   }
  public getStudentById(id: number): Observable<any>{
    return  this.http.get<any>(`${apiUrl}/${id}`);
   }
  public createEleve(student: any): Observable<any>{
    //return this.http.post<any>(`${apiUrl}/create`, student);
    console.log("Student Model : ", student.values())
    return this.http.post<any>(`${apiUrl}`, student);
  }
  public updateStudent(id: number, student: FormData): Observable<Eleve>{
    return this.http.put<any>(`${apiUrl}/update/${id}`, student);
  }
  public deleteStudent(id: number): Observable<any>{
   return  this.http.delete<any>(`${apiUrl}/delete/${id}`);
  }

}
