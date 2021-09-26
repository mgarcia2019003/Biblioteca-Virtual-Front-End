import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  public user: User; 

  constructor(private restBook: RestBookService, private restUser:RestUserService, private route: Router) {
    this.book = new Book('','','','',[],'','',null, null,'',0);
    this.user = this.restUser.getUser();
  }

  ngOnInit(): void {
  }

  onSubmit(statusForm){
    this.restBook.createBook(this.user._id, this.book).subscribe((res:any) => {
      if(res.bookSaved){
        alert(res.message);
        this.book = new Book('','','','',[],'','',null, null,'',0);
        statusForm.reset();
        this.route.navigateByUrl('listBook');
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