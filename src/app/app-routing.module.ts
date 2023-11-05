import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {SetupComponent} from "./setup/setup.component";
import {CreateAccountComponent} from "./create-account/create-account.component";
import {HomeComponent} from "./home/home.component";
import {FrontpageComponent} from "./home/home/frontpage/frontpage.component";
import {UpdateAccountComponent} from "./home/account/update-account/update-account.component";
import {ChangePasswordComponent} from "./home/account/change-password/change-password.component";
import {CategoriesComponent} from "./home/forum/categories/categories.component";
import {ForumComponent} from "./home/forum/forum.component";
import {ReadPostComponent} from "./home/forum/read-post/read-post.component";
import {HowtoComponent} from "./home/howto/howto.component";

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'login'},
  {path: 'login', component: LoginComponent},
  {path: 'setup', component: SetupComponent},
  {path: 'new-account', component: CreateAccountComponent},
  {path: 'home', pathMatch: 'full', redirectTo: 'home/frontpage'},
  {path: 'home', component: HomeComponent, children: [
      {path: 'frontpage', component: FrontpageComponent},
      {path: 'howto', component: HowtoComponent},
      {path: 'update-account', component: UpdateAccountComponent},
      {path: 'change-password', component: ChangePasswordComponent},
      {path: 'categories', component: CategoriesComponent},
      {path: 'forum/:category_id', component: ForumComponent},
      {path: 'forum/post/:post_id', component: ReadPostComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
