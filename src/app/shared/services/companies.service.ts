import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Company } from '../models/company.model';


@Injectable({
  providedIn: 'root',
})
export class CompaniesService {
  constructor(private http: HttpClient) {}

  getCompanies(): Observable<Company[]>{
    return this.http.get<Company[]>(`${environment.baseApi}/companies/`);
  }
  addMovieToCompany(company: Company): Observable<Company>{
    return this.http.put<Company>(`${environment.baseApi}/companies/${company.id}`, company);
  }
  deleteMovieOfCompany(company: Company): Observable<Company>{
    return this.http.put<Company>(`${environment.baseApi}/companies/${company.id}`, company);
  }
}
