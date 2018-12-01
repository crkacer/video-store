import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { VideoGridComponent } from './video-grid/video-grid.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { VideoDetailComponent } from './video-detail/video-detail.component';
import { CookieService } from 'ngx-cookie-service';
import { HttpClientModule } from '@angular/common/http';
import { HttpErrorHandler }     from './http-error-handler.service';
import { MessageService }       from './message.service';
import { AdminPortalComponent } from './admin-portal/admin-portal.component';
import { VideoManagementComponent } from './video-management/video-management.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { VideoCreationComponent } from './video-creation/video-creation.component';
import { VideoService } from './video.service';
import { VideoEditComponent } from './video-edit/video-edit.component';
import { FormsModule } from '@angular/forms';
import { UserCreationComponent } from './user-creation/user-creation.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import StoreModule from './store/store'

import {
  TabsModule,
  IconModule,
  ButtonModule,
  TableModule,
  PaginationModule,
  InputModule,
  NFormsModule,
  LoadingModule,
  TilesModule,
  DropdownModule,
  NotificationModule,
  ModalModule,
  PlaceholderModule,
  StaticIconModule
} from "carbon-components-angular";

import '@swimlane/ngx-datatable/release/index.css';
import '@swimlane/ngx-datatable/release/themes/material.css';
import '@swimlane/ngx-datatable/release/assets/icons.css';

const appRoutes: Routes = [
  { path: '', redirectTo: 'videos', pathMatch: 'full' },
  { path: 'videos', component: VideoGridComponent },
  { path: 'video/:id', component: VideoDetailComponent },
  { path: 'login', component: LoginFormComponent },
  { path: 'portal', component: AdminPortalComponent,
      children: [
        { path: '', redirectTo: 'portal', pathMatch: 'full' },
        { path: 'video-management', component: VideoManagementComponent },
        { path: 'video-create', component: VideoCreationComponent },
        { path: 'user-management', component: UserManagementComponent },
        { path: 'user-create', component: UserCreationComponent },
        { path: 'video-edit/:id', component: VideoEditComponent },
        { path: 'user-edit/:id', component: UserEditComponent}
      ]
  },
  
];

@NgModule({
  
  declarations: [
    AppComponent,
    VideoGridComponent,
    LoginFormComponent,
    VideoDetailComponent,
    AdminPortalComponent,
    VideoManagementComponent,
    UserManagementComponent,
    VideoCreationComponent,
    VideoEditComponent,
    UserCreationComponent,
    UserEditComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes
    ),
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgxDatatableModule,
    TabsModule,
    IconModule,
    ButtonModule,
    TableModule,
    HttpClientModule,
    PaginationModule,
    InputModule,
    NFormsModule,
    FormsModule,
    LoadingModule,
    HttpClientModule,
    TilesModule,
    DropdownModule,
    NotificationModule,
    ModalModule,
    PlaceholderModule,
    StaticIconModule,
    StoreModule
  ],
  exports: [RouterModule],
  providers: [
    CookieService,
    HttpErrorHandler,
    MessageService,
    VideoService,
    UserService,
    AuthService
  ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
