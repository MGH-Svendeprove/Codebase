import {Component, OnInit} from '@angular/core';
import {Ireport} from "../../interfaces/ireport";
import {ApiService} from "../../services/api.service";
import {AuthService} from "../../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {timer} from "rxjs";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  reports: Ireport[] = [];
  message: any = {};
  messageStatus: boolean = false;
  subscription: any;
  reportsCount: any = '';

  constructor(private api: ApiService, private auth: AuthService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.subscription = timer(0,2000).subscribe(sb => {
      this.getNewestReports();
      this.countReports();
    })
  }

  countReports() {
    this.api.countAllReports().subscribe(c => {
      this.reportsCount = c;
    });
  }

  getNewestReports() {
    this.api.selectReports().subscribe(data => {
      if(data[0] !== undefined) {
        this.reports = data;
        this.messageStatus = false;
      } else {
        this.message = data;
        this.messageStatus = !this.messageStatus;
      }
    });
  }
}
