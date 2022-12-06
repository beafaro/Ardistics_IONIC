import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


export interface Arduino {
  id_arduino: number;
  nombre_arduino: string;
  num_pines: number;
}

export interface EstadoPines {
  id_dato: number;
  id_arduino: number;
  num_pin: number;
  valor: boolean;
  fecha: Date;
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

  getArduino(id: string): Observable<Arduino[]> {
    return this.http.get<Arduino[]>(
      `${environment.apiBaseUrl}/arduinos/`+ id, this.httpOptions
    );
  }
  
  getAllArduinos(): Observable<Arduino[]> {
    return this.http.get<Arduino[]>(
      `${environment.apiBaseUrl}/arduinos`, this.httpOptions
    );
  }

  getInfoEstadoPines(id: string): Observable<EstadoPines[]> {
    return this.http.get<EstadoPines[]>(
      `${environment.apiBaseUrl}/getEstadoArduino/`+ id, this.httpOptions
    );
  }

  getDatosArduino(id: string, pin: number): Observable<EstadoPines[]> {
    return this.http.get<EstadoPines[]>(
      `${environment.apiBaseUrl}/getDatosArduino/`+ id + `/pin/` + pin, this.httpOptions
    );
  }

  createArduino(arduino: any): Observable<any> {
    return this.http.post<any>(
      `${environment.apiBaseUrl}/arduinos`, arduino, this.httpOptions
    );
  }

  deleteArduino(id: string): Observable<any> {
    return this.http.delete<any>(
      `${environment.apiBaseUrl}/arduinos/`+ id, this.httpOptions
    );
  }

}
