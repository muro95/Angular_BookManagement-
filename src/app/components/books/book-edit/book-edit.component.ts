import {Component, OnInit} from '@angular/core';
import {Book} from '../../../models/book.model';
import {Subscription} from 'rxjs';
import {BookService} from '../../../service/book.service';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit {
  public book: Book;
  public subscription: Subscription;
  public subscriptionParams: Subscription;

  constructor(
    public bookService: BookService,
    public routerService: Router,
    public activateRouterService: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.book = new Book();
    this.loadData();
  }

  loadData() {
    this.subscriptionParams = this.activateRouterService.params.subscribe((data: Params) => {
      const i = data.id;
      this.subscription = this.bookService.getBook(i).subscribe((book: Book) => {
        this.book = book;
      });
    });
  }

  onEditBook() {
    this.subscription = this.bookService.updateBook(this.book).subscribe((data: Book) => {
      this.routerService.navigateByUrl('books');
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.subscriptionParams) {
      this.subscriptionParams.unsubscribe();
    }
  }
}
