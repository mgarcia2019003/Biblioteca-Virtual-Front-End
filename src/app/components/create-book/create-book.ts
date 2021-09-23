import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book';
import { User } from 'src/app/models/user';
import { RestBookService } from 'src/app/services/restBook/rest-book.service';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.html',
  styleUrls: ['./create-book.css']
})
export class CreateBookComponent implements OnInit {
  public book: Book;
  public books;

  constructor(private restBook: RestBookService) {
    this.book = new Book('','','','',[],'','',null, null,'');
    this.books = this.restBook.getBook();
  }

  ngOnInit(): void {
  }

  onSubmit(statusForm){
    this.restBook.createBook(this.book, this.books._id).subscribe((res:any) => {
      if(res.bookSaved){
        alert(res.message);
        this.book = new Book('','','','',[],'','',null, null,'');
        statusForm.reset();
      }else{
        alert(res.message);
      }
    },
    error => alert(error.message));
  }
}