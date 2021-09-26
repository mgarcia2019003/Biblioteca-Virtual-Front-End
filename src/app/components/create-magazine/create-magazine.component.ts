import { NullTemplateVisitor } from '@angular/compiler';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Magazine } from 'src/app/models/magazine';
import { User } from 'src/app/models/user';
import { RestMagazineService } from 'src/app/services/restMagazine/rest-magazine.service';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';

@Component({
  selector: 'app-create-magazine',
  templateUrl: './create-magazine.component.html',
  styleUrls: ['./create-magazine.component.css']
})
export class CreateMagazineComponent implements OnInit {
  public magazine: Magazine;
  public magazines;
  public token; 
  public filesToUpload: Array<File>;
  public user: User; 

  constructor(private restMagazine: RestMagazineService, private restUser:RestUserService, private route: Router) {
    this.magazine = new Magazine('','','','','','',null,'','',null,null,'',0);
    this.user = this.restUser.getUser();
  }

  ngOnInit(): void {
  }

  onSubmit(statusForm){
    this.restMagazine.createMagazine(this.user._id, this.magazine).subscribe((res:any) => {
      if(res.magazineSaved){
        alert(res.message);
        this.magazine = new Magazine('','','','','','',null,'','',null,null,'',0);
        statusForm.reset();
        this.route.navigateByUrl('listMagazine');
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
    this.restMagazine.uploadImage(this.user._id,this.magazine._id, [], this.filesToUpload, this.token, 'cover')
    .then((res:any) => {
      if(res.magazine){
        this.magazine.cover = res.cover;
        localStorage.setItem('magazine', JSON.stringify(this.magazine));
      }else{
        alert(res.message)
      }
    })
  }
}
