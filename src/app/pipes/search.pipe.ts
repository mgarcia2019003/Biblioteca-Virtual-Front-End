import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(books: any, magazines: any, search: any): any {
    if(search == undefined || search == ''){
      return books;
      return magazines;
    }else if(books == ''){
      return books.filter(book =>{
        if(book.titleBook.toLowerCase().includes(search.toLowerCase())){
          return book;
        }
      }) 
      
    }else if(magazines == ''){
      return magazines.filter(magazine =>{
        if(magazine.titleMagazines.toLowerCase().includes(search.toLowerCase())){
          return magazine;
        }
      }) 
    }
    
  }

    

}
