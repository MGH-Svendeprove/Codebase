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
    HowtoComponent
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
