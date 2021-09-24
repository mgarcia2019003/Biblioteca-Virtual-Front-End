import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchBook'
})
export class SearchBookPipe implements PipeTransform {

  transform(books: any, searchBook: any): any {
    if(searchBook == undefined || searchBook == ''){
      return books;
    }else{
      return books.filter(book =>{
        if(book.nameTopic.toLowerCase().includes(searchBook.toLowerCase())){
          return book
        }
      })
    }
  }

}