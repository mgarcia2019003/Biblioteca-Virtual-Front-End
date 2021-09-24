import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book';
import { User } from 'src/app/models/user';
import { RestBookService } from 'src/app/services/restBook/rest-book.service';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.css']
})
export class CreateBookComponent implements OnInit {
  public book: Book;
  public books;
  public token; 
  public filesToUpload: Array<File>;
  user; 

  constructor(private restBook: RestBookService) {
    this.book = new Book('','','','',[],'','',null, null,'',0);
    this.books = this.restBook.getBook();
  }

  ngOnInit(): void {
  }

  onSubmit(statusForm){
    this.restBook.createBook(this.book, this.books._id).subscribe((res:any) => {
      if(res.bookSaved){
        alert(res.message);
        this.book = new Book('','','','',[],'','',null, null,'',0);
        statusForm.reset();
      }else{
        alert(res.message);
      }
    },
    error => alert(error.message));
  }

  fileChange(fileInput){
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

  uploadImage(){
    this.restBook.uploadImage(this.user._id,this.book._id, [], this.filesToUpload, this.token, 'cover')
    .then((res:any) => {
      if(res.book){
        this.book.cover = res.cover;
        localStorage.setItem('book', JSON.stringify(this.book));
      }else{
        alert(res.message)
      }
    })
  }
}