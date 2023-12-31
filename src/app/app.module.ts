import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SetupComponent } from './setup/setup.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {JwtModule} from "@auth0/angular-jwt";
import { CreateAccountComponent } from './create-account/create-account.component';
import { HomeComponent } from './home/home.component';
import { FrontpageComponent } from './home/home/frontpage/frontpage.component';
import { HeaderComponent } from './home/inc/header/header.component';
import { FooterComponent } from './home/inc/footer/footer.component';
import { UpdateAccountComponent } from './home/account/update-account/update-account.component';
import { ChangePasswordComponent } from './home/account/change-password/change-password.component';
import { ForumComponent } from './home/forum/forum.component';
import { CategoriesComponent } from './home/forum/categories/categories.component';
import { ReadPostComponent } from './home/forum/read-post/read-post.component';
import {HighlightService} from "./services/highlight.service";
import { HowtoComponent } from './home/howto/howto.component';
import { MyPostsComponent } from './home/forum/my-posts/my-posts.component';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AdminHeaderComponent } from './admin/inc/admin-header/admin-header.component';
import { ReportsComponent } from './admin/reports/reports.component';
import { AdminCategoriesComponent } from './admin/admin-categories/admin-categories.component';
import { AdminAccountsComponent } from './admin/admin-accounts/admin-accounts.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SetupComponent,
    CreateAccountComponent,
    HomeComponent,
    FrontpageComponent,
    HeaderComponent,
    FooterComponent,
    UpdateAccountComponent,
    ChangePasswordComponent,
    ForumComponent,
    CategoriesComponent,
    ReadPostComponent,
    HowtoComponent,
    MyPostsComponent,
    AdminComponent,
    DashboardComponent,
    AdminHeaderComponent,
    ReportsComponent,
    AdminCategoriesComponent,
    AdminAccountsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem("token"),
        allowedDomains: [window.location.host]
      }
    })
  ],
  providers: [
    HighlightService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
