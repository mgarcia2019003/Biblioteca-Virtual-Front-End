import { Component, OnInit } from '@angular/core';
import { CONNECTION } from 'src/app/services/global';
import { Book } from 'src/app/models/book';
import { RestBookService } from 'src/app/services/restBook/rest-book.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';

@Component({
  selector: 'app-profile-book',
  templateUrl: './profile-book.component.html',
  styleUrls: ['./profile-book.component.css']
})

export class ProfileBookComponent implements OnInit {
  public book: Book;
  bookSelect: Book;
  public userAdmin: User;
  public possiblePass;
  public uri: string;
  public token; 
  public filesToUpload: Array<File>;
  user;

  constructor(private restBook:RestBookService, private restUser:RestUserService, private route:Router) {
    this.possiblePass = '';
    this.user = this.restUser.getUser();
    this.token = this.restBook.getToken();
    this.book = this.restBook.getBookSelect();
    this.uri = CONNECTION.URI;
  }

  ngOnInit(): void {    
  }


  obtenerData(book){
    this.restBook = book;
    this.route.navigateByUrl('profileBook')
  }

  onSubmit(){
    this.restBook.updateBook(this.user, this.book).subscribe((res:any) => {
      if(res.bookUpdate){
        localStorage.setItem('restBook', JSON.stringify(res.bookUpdate))
        alert(res.message);
      }else{
        alert(res.message);
        this.book = this.restBook.getBookSelect();
      }
    },
    (error:any) => alert(error.error.message)
    )
  }

  deleteBook(){
    this.restBook.deleteBook(this.user._id ,this.book._id).subscribe((res:any) => {
      if(!res.bookRemoved){
        alert(res.message);
      }else{
        alert(res.message);
        localStorage.removeItem('bookSelect');
        this.route.navigateByUrl('listBook');
      }
    },
    (error:any) => alert(error.message)
    )
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