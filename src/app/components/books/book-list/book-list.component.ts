import {Component, OnInit} from '@angular/core';
import {BookService} from '../../../service/book.service';
import {Subscription} from 'rxjs';
import {Book} from '../../../models/book.model';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  public subscription: Subscription;
  public books: Book[] = [];

  constructor(public bookService: BookService) {
  }

  ngOnInit() {
    this.subscription = this.bookService.getBookList().subscribe((data: Book[]) => {
      this.books = data;
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onDeleteBooks(id: number) {
    this.subscription = this.bookService.deleteBook(id).subscribe((data: Book) => {
      this.updateDataAfterDelete(id);
    });
  }

  updateDataAfterDelete(id: number) {
    for (let i = 0; i < this.books.length; i++) {
      if (this.books[i].id === id) {
        this.books.splice(i, 1);
        break;
      }
    }
  }
}
