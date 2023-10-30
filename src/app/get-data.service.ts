import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Credit } from './credit';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {
  private dataUrl = 'https://raw.githubusercontent.com/LightOfTheSun/front-end-coding-task-db/master/db.json'
  
  constructor(private httpClient: HttpClient) { }

  getCredits(): Observable<Credit[]> {
    return this.httpClient.get<Credit[]>(this.dataUrl);

  }
  
}

