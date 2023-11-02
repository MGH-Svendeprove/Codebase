import {Component, OnInit} from '@angular/core';
import {Iaccount} from "../interfaces/iaccount";
import {FormControl, FormGroup} from "@angular/forms";
import {ApiService} from "../services/api.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.css']
})
export class SetupComponent implements OnInit {



  setupForm = new FormGroup({
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
    this.checkAdmin();
    while (this.dot.length < 50) {
      this.dot[this.dot.length] = this.dot.length;
    }
  }

  checkAdmin() {
    this.api.checkAdmin().subscribe(data => {
      if(data) {
        this.router.navigate(['./login']);
      }
    })
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
      formData.append('role_id', '1');

      this.selectedFile = formData;

      this.api.createAccount(this.selectedFile).subscribe(data => {
        let message: Iaccount = data;
        this.router.navigate(['./login']);
      })
    }
  }

}
