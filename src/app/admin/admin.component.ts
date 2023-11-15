import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {IsactiveService} from "../services/isactive.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit{

  constructor(private auth: AuthService, private router: Router, private isactive: IsactiveService) {
  }

  ngOnInit() {
    if(!this.auth.authenticated) {
      if(this.auth.role === 'Bruger') {
        window.self.close();
      }
    }
    if(this.auth.role === 'Bruger') {
      window.self.close();
    }
  }
}
