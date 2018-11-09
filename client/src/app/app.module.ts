import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { VideoGridComponent } from './video-grid/video-grid.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { VideoSingleComponent } from './video-single/video-single.component';
import { VideoDetailComponent } from './video-detail/video-detail.component';

import { CookieService } from 'ngx-cookie-service';

const appRoutes: Routes = [
  { path: '', redirectTo: 'videos', pathMatch: 'full' },
  { path: 'videos', component: VideoGridComponent },
  { path: 'video/:id', component: VideoDetailComponent },
  { path: 'login', component: LoginFormComponent }
];

@NgModule({
  
  declarations: [
    AppComponent,
    VideoGridComponent,
    LoginFormComponent,
    VideoSingleComponent,
    VideoDetailComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes
    ),
    BrowserModule
  ],
  exports: [RouterModule],
  providers: [CookieService],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
