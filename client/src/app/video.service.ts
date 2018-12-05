import { Injectable } from "@angular/core";
import { HandleError, HttpErrorHandler } from "./http-error-handler.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthToken } from "./models/auth_token";
import { Observable } from "rxjs";
import { Video } from "./models/video";
import { environment } from '../environments/environment';
import { CookieService } from "ngx-cookie-service";

let httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

@Injectable()
export class VideoService {
    private rootURL : string = environment.API.main;
    private listVideoURI : string = environment.API.video + 'list';
    private videoURI : string = environment.API.video;
    private token: string;
    private httpOptionsWithToken;

    private handleError: HandleError;

    constructor(
        private http: HttpClient,
        httpErrorHandler: HttpErrorHandler,
        private cookieService: CookieService) {

        this.handleError = httpErrorHandler.createHandleError('VideoGridService');
        const token = this.cookieService.get("auth_token");
        this.httpOptionsWithToken = {
            headers: new HttpHeaders({
              'Authorization': 'Bearer ' + token,
              'Accept': 'application/json'
            })
          };
        httpOptions = this.httpOptionsWithToken;
      }
    

    getVideoList():Observable<Video[]> {
        return this.http.get<Video[]>(this.rootURL+this.listVideoURI, httpOptions);
        
    }

    getVideoById(id: String):Observable<Video> {
        return this.http.get<Video>(this.rootURL+this.videoURI+id, httpOptions);
    }

    postUploadImage(formData: FormData):Observable<Object> {
        
        return this.http.post(this.rootURL+this.videoURI+'upload-image', formData, this.httpOptionsWithToken);
    }

    putUpdateVideo(id: String, video: Video ):Observable<Object> {
        console.log(this.token);
        return this.http.put(this.rootURL+this.videoURI+id, video, this.httpOptionsWithToken);
    }

    postCreateVideo(video: Video):Observable<Object> {
        return this.http.post(this.rootURL+this.videoURI, video, this.httpOptionsWithToken);
    }

    deleteVideo(id: String):Observable<Object> {
        return this.http.delete(this.rootURL+this.videoURI+id,this.httpOptionsWithToken);
    }

    getSearchVideo(text: String):Observable<Video[]>{
        return this.http.get<Video[]>(this.rootURL+this.videoURI+'search?text='+text);
    }

    postReserveVideo(videoID: String, userID: String):Observable<any> {
        const reserve = {videoID: videoID, userID: userID};
        return this.http.post(this.rootURL+this.videoURI+"reserve", reserve, httpOptions);
    }

}