import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(books: any, search: any): any {
    if(search == undefined || search == ''){
      return books;
    }else{
      return books.filter(book =>{
        if(book.titleBook.toLowerCase().includes(search.toLowerCase())){
          return book
        }
      })
    }
  }

  transform(magazines: any, search: any): any {
    if(search == undefined || search == ''){
      return magazines;
    }else{
      return magazines.filter(book =>{
        if(magazine.titleMagazine.toLowerCase().includes(search.toLowerCase())){
          return magazine
        }
      })
    }
  }

}
