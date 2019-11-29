import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Book} from '../../../models/book.model';
import {ActivatedRoute, Router} from '@angular/router';
import {BookService} from '../../../service/book.service';

@Component({
  selector: 'app-book-view',
  templateUrl: './book-view.component.html',
  styleUrls: ['./book-view.component.css']
})
export class BookViewComponent implements OnInit, OnDestroy {

  public subscription: Subscription;
  public book: Book;
  public subscriptionParams: Subscription;
  constructor(
    public booksService: BookService,
    public routerService: Router,
    public activateRouteService: ActivatedRoute) { }

  ngOnInit() {
    this.book = new Book();
    this.viewData();
  }
  viewData() {
    this.subscriptionParams = this.activateRouteService.params.subscribe(data  => {
      const i = data.id;
      this.subscription = this.booksService.getBook(i).subscribe((book: Book) => {
        this.book = book;
        // this.routerService.navigateByUrl('booksmodels');
      });
    });
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.subscriptionParams) {
      this.subscriptionParams.unsubscribe();
    }
  }
}
