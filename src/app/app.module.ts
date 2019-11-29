import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {Router, RouterModule, Routes} from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BooksComponent } from './components/books/books.component';
import { BookListComponent } from './components/books/book-list/book-list.component';
import { BookAddComponent } from './components/books/book-add/book-add.component';
import { BookEditComponent } from './components/books/book-edit/book-edit.component';
import { BookDeleteComponent } from './components/books/book-delete/book-delete.component';
import {BookService} from './service/book.service';
import {FormsModule} from '@angular/forms';
import { BookViewComponent } from './components/books/book-view/book-view.component';

const appRoutes: Routes = [
  {
    path : '',
    component : HomeComponent
  },
  {
    path : 'books',
    component : BooksComponent,
    children : [
      {
        path : '',
        component : BookListComponent
      },
      {
        path : ':id/edit',
        component : BookEditComponent
      },
      {
        path : 'add',
        component : BookAddComponent
      },
      {
        path : ':id/view',
        component : BookViewComponent
      }
    ]
  },
];
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BooksComponent,
    BookListComponent,
    BookAddComponent,
    BookEditComponent,
    BookDeleteComponent,
    BookViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    BookService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
