import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Book} from '../models/book.model';

// @Injectable({
//   providedIn: 'root'
// })
@Injectable()
export class BookService {

  API_URL = 'http://localhost:3000/books/';

  constructor(public http: HttpClient) {
  }

  getBookList(): Observable<Book[]> {
    return this.http.get<Book[]>(this.API_URL);
  }

  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(this.API_URL, book);
  }

  deleteBook(id: number): Observable<Book> {
    return this.http.delete<Book>(this.API_URL + id);
  }

  updateBook(book: Book): Observable<Book> {
    return this.http.put<Book>(this.API_URL + book.id, book);
  }

  getBook(id: number): Observable<Book> {
    return this.http.get<Book>(this.API_URL + id);
  }
}
