import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {MaterialModule} from "@angular/material";
import { RouterModule } from "@angular/router";
import { FlexLayoutModule } from "@angular/flex-layout";
import 'hammerjs';

//Components
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login/login.component';
import { HomeComponent } from './Components/home/home.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { SearchComponent } from './Components/search/search.component';
import { OrganComponent } from './Components/organ/organ.component';
import { NotificationComponent } from './Components/notification/notification.component';
import { ComposeComponent } from './Components/compose/compose.component';
import { CriticismComponent } from './Components/criticism/criticism.component';
import { ReplyComponent } from './Components/reply/reply.component';
import {ReplyShowComponent} from "./Components/reply-show/reply-show.component";

//Services
import { AuthService } from './Services/auth.service';
import { HttpService } from "./Services/http.service";
import { CriticismService } from './Services/criticism.service';
import { WindowRef } from "./Services/windowRef";
import { CriticismManagementComponent } from './Components/criticism-management/criticism-management.component';
import { UserCardComponent } from './Components/user-card/user-card.component';
import {MessageService} from "./Services/message.service";
import {CookieService} from "ng2-cookies";
import {OrganService} from "./Services/organ.service";
import {WebsocketService} from './Services/websocket.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    ProfileComponent,
    SearchComponent,
    OrganComponent,
    NotificationComponent,
    ComposeComponent,
    CriticismComponent,
    ReplyComponent,
    CriticismManagementComponent,
    UserCardComponent,
    ReplyShowComponent,
  ],
  entryComponents: [
    ReplyShowComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MaterialModule,
    FlexLayoutModule.forRoot(),
    RouterModule.forRoot([
      {path: '', component: HomeComponent},
      {path: 'home', component: HomeComponent},
      {path: 'organ', component: OrganComponent, canActivate: [AuthService]},
      {path: 'criticism', component: CriticismManagementComponent},
      {path: 'notification', component: NotificationComponent, canActivate: [AuthService]},
      {path: 'profile', component: ProfileComponent, canActivate: [AuthService]},
      {path: 'login', component: LoginComponent}
    ])
  ],
  providers: [AuthService, HttpService , WindowRef, CriticismService, MessageService, CookieService, OrganService, WebsocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
