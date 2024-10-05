import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAllMakes(): Observable<any> {
    return this.http.get(`${this.baseUrl}/makes`);
  }

  getVehicleTypesForMakeId(makeId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/vehicle-types/${makeId}`);
  }

  getModelsForMakeIdYear(makeId: number, year: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/models/${makeId}/${year}`);
  }


}
