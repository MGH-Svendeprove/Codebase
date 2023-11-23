import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Ilogin} from "../interfaces/ilogin";
import {Observable} from "rxjs";
import {Itoken} from "../interfaces/itoken";
import {Iaccount} from "../interfaces/iaccount";
import {Icategory} from "../interfaces/icategory";
import {Ipost} from "../interfaces/ipost";
import {Ianswer} from "../interfaces/ianswer";
import {Ireport} from "../interfaces/ireport";
import {Irole} from "../interfaces/irole";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseURL = 'https://jp-pro.dk/codebase/api/';

  header = new HttpHeaders({
    'Content-Type': 'application/json; charset=UTF-8'
  });

  constructor(private http: HttpClient) { }

  /*
    Here we have the login part of the API service
   */
  login(login:Ilogin): Observable<Itoken> {
    return this.http.get<Itoken>(this.baseURL +
      'login/login.php?email=' +login.email+
      '&password='+login.password);
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

  getAllAccounts(): Observable<Iaccount[]> {
    return this.http.get<Iaccount[]>(this.baseURL + 'accounts/accounts.php');
  }

  countAccounts() {
    return this.http.get(this.baseURL + 'accounts/countAccounts.php');
  }

  getAllRoles(): Observable<Irole[]> {
    return this.http.get<Irole[]>(this.baseURL + 'roles/selectAll.php');
  }

  updateRole(data: any) {
    return this.http.post(this.baseURL + 'accounts/updateRole.php', data);
  }

  /*
    Here we have the complete forum part of the API service, with Create, Updates, Delete and Read
   */
  getCategories(): Observable<Icategory[]> {
    return this.http.get<Icategory[]>(this.baseURL + 'categories/selectAll.php');
  }

  insertCategory(data: any) : Observable<Icategory> {
    return this.http.post<Icategory>(this.baseURL + 'categories/insert.php', data);
  }

  updateCategory(data: any) {
    return this.http.post(this.baseURL + 'categories/update.php', data);
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

  latestPosts(): Observable<Ipost[]> {
    return this.http.get<Ipost[]>(this.baseURL + 'forum/latestPost.php');
  }

  myPosts(data: Iaccount): Observable<Ipost[]> {
    return this.http.get<Ipost[]>(this.baseURL + 'forum/myposts.php?id=' + data.account_id);
  }

  updatePost(data: any) {
    return this.http.post(this.baseURL + 'forum/update.php', data);
  }

  deletePost(data: Ipost): Observable<Ipost> {
    return this.http.get<Ipost>(this.baseURL + 'forum/delete.php?id=' + data.post_id);
  }

  countAllPosts() {
    return this.http.get(this.baseURL + 'forum/countPosts.php');
  }

  /*
  All endpoints for the report section will be going here.
   */
  reportpost(data: any) {
    return this.http.post(this.baseURL + 'reports/insert.php', data);
  }

  selectReports(): Observable<Ireport[]> {
    return this.http.get<Ireport[]>(this.baseURL + 'reports/select.php');
  }

  countNewReports(): Observable<any> {
    return this.http.get(this.baseURL + 'reports/counter.php');
  }

  countAllReports(): Observable<any> {
    return this.http.get(this.baseURL + 'reports/countAll.php');
  }

  updateReport(data: any) {
    return this.http.post(this.baseURL + 'reports/update.php', data);
  }

  sendmail(data: any) {
    return this.http.post(this.baseURL + 'reports/sendmail.php', data);
  }

}
