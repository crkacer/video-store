import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { VideoGridComponent } from './video-grid/video-grid.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { VideoSingleComponent } from './video-single/video-single.component';
import { VideoDetailComponent } from './video-detail/video-detail.component';
import {LoginService} from '../app/login-form/login-form.service';
import { CookieService } from 'ngx-cookie-service';
import { HttpClientModule } from '@angular/common/http';
import { HttpErrorHandler }     from './http-error-handler.service';
import { MessageService }       from './message.service';
import { AdminPortalComponent } from './admin-portal/admin-portal.component';
import { VideoManagementComponent } from './video-management/video-management.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { VideoCreationComponent } from './video-creation/video-creation.component';

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
        { path: 'user-management', component: UserManagementComponent }
      ]
  },
  
];

@NgModule({
  
  declarations: [
    AppComponent,
    VideoGridComponent,
    LoginFormComponent,
    VideoSingleComponent,
    VideoDetailComponent,
    AdminPortalComponent,
    VideoManagementComponent,
    UserManagementComponent,
    VideoCreationComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes
    ),
    BrowserModule,
    HttpClientModule
  ],
  exports: [RouterModule],
  providers: [
    CookieService,
    LoginService,
    HttpErrorHandler,
    MessageService
  ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
