import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ApiService} from "../services/api.service";
import {Router} from "@angular/router";
import {Iaccount} from "../interfaces/iaccount";

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  accountForm = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
    email: new FormControl(),
    picture: new FormControl()
  });

  selectedFile: any = '';
  file_data: any = '';
  file: File | null = null;

  dot: any = [];


  constructor(private api: ApiService, private router: Router) {

  }

  ngOnInit() {
    while (this.dot.length < 50) {
      this.dot[this.dot.length] = this.dot.length;
    }
  }

  onSelectedFile(event: any){
    let fileList: FileList = event.target.files;
    if(fileList.length > 0) {
      this.file = fileList[0];
      if((this.file.size / 1048576) <= 4) {
        this.file_data = this.file;
      }
    }
  }

  createHandler(formObj: any) {
    if(this.file_data) {
      let formData = new FormData();
      formData.append('file', this.file_data, this.file_data.name);
      formData.append('username', formObj.username);
      formData.append('password', formObj.password);
      formData.append('email', formObj.email);
      formData.append('role_id', '3');

      this.selectedFile = formData;

      this.api.createAccount(this.selectedFile).subscribe(data => {
        let message: Iaccount = data;
        this.router.navigate(['./login']);
      })
    }
  }

  cancelHandler() {
    this.router.navigate(['./login']);
  }
}
