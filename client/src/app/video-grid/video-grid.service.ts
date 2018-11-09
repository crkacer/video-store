import { Injectable } from "@angular/core";
import { HandleError, HttpErrorHandler } from "../http-error-handler.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthToken } from "../models/auth_token";
import { Observable } from "rxjs";
import { User } from "../models/user";
import { Video } from "../models/video";

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'my-auth-token'
    })
  };

@Injectable()
export class VideoService {
    listVideoURL = 'http://localhost:4040/api/video/list';
    private handleError: HandleError;

    constructor(
        private http: HttpClient,
        httpErrorHandler: HttpErrorHandler) {
        this.handleError = httpErrorHandler.createHandleError('VideoGridService');
      }

    getVideoList():Observable<Video[]> {
        return this.http.get<Video[]>(this.listVideoURL, httpOptions);
        
    }

}