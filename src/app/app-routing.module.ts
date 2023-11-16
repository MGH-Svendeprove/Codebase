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
import {MyPostsComponent} from "./home/forum/my-posts/my-posts.component";
import {AdminComponent} from "./admin/admin.component";
import {DashboardComponent} from "./admin/dashboard/dashboard.component";
import {ReportsComponent} from "./admin/reports/reports.component";
import {AdminCategoriesComponent} from "./admin/admin-categories/admin-categories.component";
import {AdminAccountsComponent} from "./admin/admin-accounts/admin-accounts.component";

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
      {path: 'forum/post/:post_id', component: ReadPostComponent},
      {path: 'myposts', component: MyPostsComponent}
    ]},
  {path: 'admin', pathMatch: 'full', redirectTo: 'admin/dashboard'},
  {path: 'admin', component: AdminComponent, children: [
      {path: 'dashboard', component: DashboardComponent},
      {path: 'reports', component: ReportsComponent},
      {path: 'category', component: AdminCategoriesComponent},
      {path: 'accounts', component: AdminAccountsComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
