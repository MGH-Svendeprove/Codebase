import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {SetupComponent} from "./setup/setup.component";
import {CreateAccountComponent} from "./create-account/create-account.component";
import {HomeComponent} from "./home/home.component";
import {FrontpageComponent} from "./home/home/frontpage/frontpage.component";
import {UpdateAccountComponent} from "./home/account/update-account/update-account.component";

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'login'},
  {path: 'login', component: LoginComponent},
  {path: 'setup', component: SetupComponent},
  {path: 'new-account', component: CreateAccountComponent},
  {path: 'home', pathMatch: 'full', redirectTo: 'home/frontpage'},
  {path: 'home', component: HomeComponent, children: [
      {path: 'frontpage', component: FrontpageComponent},
      {path: 'update-account', component: UpdateAccountComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
