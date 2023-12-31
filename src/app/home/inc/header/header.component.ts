import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../../services/api.service";
import {AuthService} from "../../../services/auth.service";
import {ActivatedRoute, Route, Router} from "@angular/router";
import {Iaccount} from "../../../interfaces/iaccount";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  account: Iaccount = {};
  role: any = "";
  isVisible: boolean = false;
  picturePath: string = "https://www.jp-pro.dk/codebase/assets/img/accounts/uploads/";
  constructor(private api: ApiService, private auth: AuthService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    let account: Iaccount = {
      account_id: this.auth.id
    }
    this.role = this.auth.role;
    this.api.getAccount(account).subscribe(data => {
      this.account = data;
      //console.log(usr);
    })

  }

  showDropdown() {
    this.isVisible = !this.isVisible;
    //console.log(this.isVisible);
  }

  deleteAccount() {
    let usr: Iaccount = {
      account_id: this.auth.id
    }

    this.api.deleteAccount(usr).subscribe(data => {
      this.auth.logout();
    });
  }

  logout() {
    this.auth.logout();
  }

}
