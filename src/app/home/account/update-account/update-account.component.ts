import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Iaccount} from "../../../interfaces/iaccount";
import {AuthService} from "../../../services/auth.service";
import {ApiService} from "../../../services/api.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-update-account',
  templateUrl: './update-account.component.html',
  styleUrls: ['./update-account.component.css']
})
export class UpdateAccountComponent implements OnInit {

  updateForm = new FormGroup({
    username: new FormControl(),
    picture: new FormControl()
  });

  account: Iaccount = {};

  selectedFile: any = "";
  file_data: any = "";
  file: File | null = null;

  constructor(private auth: AuthService, private api: ApiService, private router: Router) {
  }
  ngOnInit() {
    this.account = {
      account_id: this.auth.id
    }
    //console.log(this.account);
    this.getProfileData(this.account);
  }

  getProfileData(data: Iaccount) {
    this.api.getAccount(data).subscribe(usr => {
      this.updateForm.patchValue({
        username: usr.username
      });
    })
  }

  onSelectedFile(event: any) {
    let fileList: FileList = event.target.files;
    if(fileList.length > 0) {
      this.file = fileList[0];
      if((this.file.size / 1048576) <= 4) {
        this.file_data = this.file;
      }
    }
  }

  updateHandler(formObj: any) {
    if(this.file_data) {
      let usr: Iaccount = {
        account_id: this.auth.id
      }
      let formData = new FormData();
      formData.append('file', this.file_data, this.file_data.name);
      formData.append('account_id', usr.account_id);
      formData.append('username',formObj.username);

      this.selectedFile = formData;

      this.api.updateAccount(this.selectedFile).subscribe(data => {
        this.router.navigate(['home']);
      })
    }
  }

  cancelHandler() {
    this.router.navigate(['home']);
  }


}
