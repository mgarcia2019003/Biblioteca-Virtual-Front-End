import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchMagazine'
})
export class SearchMagazinePipe implements PipeTransform {

  transform(magazines: any, searchMagazine: any): any {
    if(searchMagazine == undefined || searchMagazine == ''){
      return magazines;
    }else{
      return magazines.filter(magazine =>{
        if(magazine.titleMagazine.toLowerCase().includes(searchMagazine.toLowerCase())){
          return magazine
        }
      })
    }
  }

}