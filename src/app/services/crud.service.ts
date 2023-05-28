import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  map,Observable } from 'rxjs';
import { Message } from '../models/message';

export interface Form {
  name: string;
  code: string;
  description: string;
}

const API_URL = 'http://chatdoc.eastus.cloudapp.azure.com:8000/api/form';


@Injectable({
  providedIn: 'root'
})
export class CrudService {
  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Form[]> {
    return this.httpClient.get<Form[]>(API_URL)
  }

  createItem(item: Form): Observable<Message> {
    return this.httpClient.post<Message>(`${API_URL}`, item).pipe(
      map(message => {
        return message;
      })
    );
  }


  updateItem(itemId: number, updatedItem: Form) {
    return this.httpClient.put<Message>(`${API_URL}/${itemId}`, updatedItem).pipe(
      map(message => {
        return message;
      })
    );
  }

  deleteItem(itemId: number): Observable<Message> {
    return this.httpClient.delete<Message>(`${API_URL}/${itemId}`).pipe(
      map(message => {
        return message;
      })
    );
  }

}
