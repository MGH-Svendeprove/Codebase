import {Component, OnInit} from '@angular/core';
import {ApiService} from "../services/api.service";
import {Router} from "@angular/router";
import {Istatus} from "../interfaces/istatus";
import {AuthService} from "../services/auth.service";
import {FormControl, FormGroup} from "@angular/forms";
import {Ilogin} from "../interfaces/ilogin";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl(),
    password: new FormControl()
  });

  dot: any = [];


  constructor(private api: ApiService, private router: Router, private auth: AuthService) {
    this.auth.OnLoginSuccessful.subscribe(next => {
      if(this.auth.authenticated) router.navigate(['home/frontpage']);
    })
  }

  ngOnInit() {
    this.checkAdmin();
    while (this.dot.length < 50) {
      this.dot[this.dot.length] = this.dot.length;
    }
  }

  checkAdmin() {
    this.api.checkAdmin().subscribe(data => {
      if(!data) {
        this.router.navigate(['./setup']);
      }
    });
  }

  loginHandler(loginObj: Ilogin) {
    this.auth.login(loginObj);
  }

  createHandler() {
    this.router.navigate(['./new-account']);
  }

}
