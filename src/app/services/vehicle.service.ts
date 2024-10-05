import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
