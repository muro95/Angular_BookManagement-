import {Component, OnInit} from '@angular/core';
import {Book} from '../../../models/book.model';
import {Subscription} from 'rxjs';
import {BookService} from '../../../service/book.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-book-add',
  templateUrl: './book-add.component.html',
  styleUrls: ['./book-add.component.css']
})
export class BookAddComponent implements OnInit {
  public book: Book;
  public subscription: Subscription;

  constructor(
    public bookService: BookService,
    public routerService: Router
  ) {
  }


  ngOnInit() {
    this.book = new Book();
  }

  onAddBook() {
    this.subscription = this.bookService.addBook(this.book).subscribe(data => {
      if (data && data.id) {
        this.routerService.navigate(['books']);
      }
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
