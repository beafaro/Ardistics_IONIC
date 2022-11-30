import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


export interface Arduino {
  id_arduino: number;
  nombre_arduino: string;
}



@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // Headers
  private httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
          'Access-Control-Allow-Headers': 'Content-Type'})
  };

  constructor(private http: HttpClient) { }

  getAll(): Observable<Arduino[]> {
    return this.http.get<Arduino[]>(
      `${environment.apiBaseUrl}/arduinos`, this.httpOptions
    );
  }
}
