import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { bookApiUrl } from '../../api.url';
import { Book } from '../interfaces/book.interface';

@Injectable({
  providedIn: 'root'
})
export class BookServiceService {

  private http = inject(HttpClient);

  getBooks() {
    return this.http.get<Response<Book[]>>(`${bookApiUrl.bookSeriveApi}`)
  }
}

export type Response<T> = {
  success: boolean;
  status: number;
  message: string;
  data: T
}
