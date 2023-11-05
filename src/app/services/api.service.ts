import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Ilogin} from "../interfaces/ilogin";
import {Observable} from "rxjs";
import {Itoken} from "../interfaces/itoken";
import {Iaccount} from "../interfaces/iaccount";
import {Icategory} from "../interfaces/icategory";
import {Ipost} from "../interfaces/ipost";
import {Ianswer} from "../interfaces/ianswer";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseURL = 'https://www.jp-pro.dk/codebase/api/';

  header = new HttpHeaders({
    'Content-Type': 'application/json; charset=UTF-8'
  });

  constructor(private http: HttpClient) { }

  /*
    Here we have the login part of the API service
   */
  login(login:Ilogin): Observable<Itoken> {
    return this.http.get<Itoken>(this.baseURL + 'login/login.php?email='+login.email+'&password='+login.password);
  }

  /*
    Here we have a check point of the API which check if there is an admin on the system.
   */
  checkAdmin() {
    return this.http.get(this.baseURL + 'accounts/checkadmin.php');
  }

  /*
    Here we have the complete account part of the API Service, with Create, Updates, Delete and Read
   */
  createAccount(data: any) {
    return this.http.post(this.baseURL + 'accounts/insert.php', data);
  }

  updateAccount(data: any) {
    return this.http.post(this.baseURL + 'accounts/update.php', data);
  }

  updatePassword(data:any) {
    return this.http.post(this.baseURL + 'accounts/changepassword.php', data);
  }

  deleteAccount(data: Iaccount): Observable<any> {
    return this.http.get(this.baseURL + 'accounts/delete.php?id=' + data.account_id);
  }

  getAccount(account: Iaccount): Observable<Iaccount> {
    return this.http.get<Iaccount>(this.baseURL + 'accounts/select.php?id=' + account.account_id);
  }

  /*
    Here we have the complete forum part of the API service, with Create, Updates, Delete and Read
   */
  getCategories(): Observable<Icategory[]> {
    return this.http.get<Icategory[]>(this.baseURL + 'categories/selectAll.php');
  }

  getCategoryName(data: Icategory): Observable<Icategory> {
    return this.http.get<Icategory>(this.baseURL + 'categories/single.php?id='+data.category_id);
  }

  createPost(data: any) {
    return this.http.post(this.baseURL + 'forum/insert.php', data);
  }

  selectAllPosts(data: Ipost): Observable<Ipost[]> {
    return this.http.get<Ipost[]>(this.baseURL + 'forum/selectAll.php?id='+data.category_id);
  }

  selectSinglePost(data: Ipost): Observable<Ipost> {
    return this.http.get<Ipost>(this.baseURL + 'forum/select.php?id=' + data.post_id);
  }

  answerPost(data: any) {
    return this.http.post(this.baseURL + 'answers/insert.php', data);
  }

  getAllAnswers(data: Ianswer): Observable<Ianswer[]> {
    return this.http.get<Ianswer[]>(this.baseURL + 'answers/selectAll.php?id=' + data.post_id);
  }
}
