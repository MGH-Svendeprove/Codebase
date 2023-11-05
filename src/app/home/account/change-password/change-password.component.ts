import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Iaccount} from "../../../interfaces/iaccount";
import {ApiService} from "../../../services/api.service";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  updateForm = new FormGroup({
    old_password: new FormControl(),
    pass1: new FormControl(),
    pass2: new FormControl()
  });

  message: any = {};
  passwordData: any = "";
  showMessage: boolean = false;

  constructor(private api: ApiService, private auth: AuthService, private router: Router) {
  }

  ngOnInit() {
  }

  updateHandler(formObj: any) {

    if(formObj.pass1 === formObj.pass2) {
      let usr: Iaccount = {
        account_id: this.auth.id
      }

      let formData = new FormData();
      formData.append('account_id', usr.account_id);
      formData.append('old_password', formObj.old_password);
      formData.append('password', formObj.pass2);

      this.passwordData = formData;

      this.api.updatePassword(this.passwordData).subscribe(data => {
        this.router.navigate(['./home']);
      })

      //console.log(this.passwordData);
    } else {
      this.message = {
        message: "New password does not match"
      }
      this.showMessage = !this.showMessage;
    }

  }

  cancelHandler() {
    this.router.navigate(['./home']);
  }

  closeShowMessage() {
    this.showMessage = !this.showMessage;
    console.log(this.showMessage);
  }

}
