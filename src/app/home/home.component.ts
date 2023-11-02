import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {IsactiveService} from "../services/isactive.service";
import {ApiService} from "../services/api.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router, private isActive: IsactiveService, private api: ApiService) {
  }

  ngOnInit() {
    if(!this.auth.authenticated) {
      this.router.navigate(['./login']);
    }
  }

}
