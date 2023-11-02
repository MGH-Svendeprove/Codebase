import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Ilogin} from "../interfaces/ilogin";
import {Observable} from "rxjs";
import {Itoken} from "../interfaces/itoken";
import {Iaccount} from "../interfaces/iaccount";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseURL = 'https://www.jp-pro.dk/codebase/api/';

  header = new HttpHeaders({
    'Content-Type': 'application/json; charset=UTF-8'
  });

  constructor(private http: HttpClient) { }

  login(login:Ilogin): Observable<Itoken> {
    return this.http.get<Itoken>(this.baseURL + 'login/login.php?email='+login.email+'&password='+login.password);
  }

  checkAdmin() {
    return this.http.get(this.baseURL + 'accounts/checkadmin.php');
  }

  createAccount(data: any) {
    return this.http.post(this.baseURL + 'accounts/insert.php', data);
  }

  updateAccount(data: any) {
    return this.http.post(this.baseURL + 'accounts/update.php', data);
  }

  getAccount(account: Iaccount): Observable<Iaccount> {
    return this.http.get<Iaccount>(this.baseURL + 'accounts/select.php?id=' + account.account_id);
  }
}
