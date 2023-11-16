import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {AuthService} from "../../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Iaccount} from "../../interfaces/iaccount";
import {FormControl, FormGroup} from "@angular/forms";
import {Irole} from "../../interfaces/irole";

@Component({
  selector: 'app-admin-accounts',
  templateUrl: './admin-accounts.component.html',
  styleUrls: ['./admin-accounts.component.css']
})
export class AdminAccountsComponent implements OnInit {

  accounts: Iaccount[] = [];
  account: Iaccount = {};
  roles: Irole[] = [];
  message: any = {};
  isActive: boolean = false;

  updateForm = new FormGroup({
    role_id: new FormControl(),
    account_id: new FormControl()
  })

  constructor(private api: ApiService, private auth: AuthService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.getAllAccount();
    this.getAllRoles();
  }

  getAllRoles() {
    this.api.getAllRoles().subscribe(r => {
      this.roles = r;
    })
  }

  getAllAccount() {
    this.api.getAllAccounts().subscribe(data => {
      if(data[0] !== undefined) {
        this.accounts = data;
      } else {
        this.message = data;
      }
    });
  }

  closeUpdateForm() {
    this.isActive = false;
  }

  updateRole(event: any) {
    let usr: Iaccount = {
      account_id: event.getAttribute('id')
    }

    this.isActive = true;
    this.api.getAccount(usr).subscribe(data => {
      this.account = data;
      this.updateForm.patchValue({
        account_id: data.account_id,
        role_id: data.role_id
      });
    });
  }

  updateHandler(formObj: any) {
    let usr: Iaccount = {
      account_id: formObj.account_id,
      role_id: formObj.role_id
    }

    let formData = new FormData();
    formData.append('account_id', usr.account_id);
    formData.append('role_id', usr.role_id);

    this.api.updateRole(formData).subscribe(up => {
      window.location.reload();
    })
  }
}
