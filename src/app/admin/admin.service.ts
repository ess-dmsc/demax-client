import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cycle } from '../models/cycle';
import { Proposal } from "../models/proposal";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

	getCycles(): Observable<Cycle[]> {
		return this.http.get<Cycle[]>('/api/admin/cycles');
	}

	getCycleById(cycleId: string): Observable<Cycle> {
		return this.http.get<Cycle>('/api/admin/cycles/' + cycleId);
	}

	postCycle(cycle: Cycle): Observable<Cycle> {
		return this.http.post<Cycle>('/api/admin/cycles', cycle);
	}

	editCycle(cycle: Cycle): Observable<any> {
		return this.http.put(`/api/admin/cycles/${cycle.cycleId}`, cycle, {responseType: 'text'});
	}

	deleteCycle(cycle: Cycle): Observable<any> {
		return this.http.delete(`/api/admin/cycles/${cycle.cycleId}`, {responseType: 'text'});
	}
}
