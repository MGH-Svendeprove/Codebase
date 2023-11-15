import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../../services/api.service";
import {Iaccount} from "../../../interfaces/iaccount";
import {AuthService} from "../../../services/auth.service";
import {Ireport} from "../../../interfaces/ireport";
import {timer} from "rxjs";

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {

  picturePath: string = "https://www.jp-pro.dk/codebase/";
  admin: Iaccount = {};
  isUserInfoActive: boolean = false;
  reportsNumber: any = 0;
  subscription: any;

  constructor(private api: ApiService, private auth: AuthService) {
  }

  ngOnInit() {
    this.getAccountData();
    this.subscription = timer(0, 2000).subscribe(total => {
      this.getReportsNumber();
    });

  }

  getAccountData() {
    let account: Iaccount = {
      account_id: this.auth.id
    }
    this.api.getAccount(account).subscribe(data => {
      this.admin = data;
    })
  }

  toggleUserInfoMenu() {
    this.isUserInfoActive = !this.isUserInfoActive;
  }

  closeAdmin() {
    window.self.close();
  }

  getReportsNumber() {
    this.api.countNewReports().subscribe(data => {
        this.reportsNumber = data;
    });
  }
}
