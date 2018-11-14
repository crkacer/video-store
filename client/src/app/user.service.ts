import { Injectable } from "@angular/core";
import { HandleError, HttpErrorHandler } from "./http-error-handler.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthToken } from "./models/auth_token";
import { Observable } from "rxjs";
import { User } from "./models/user";
import { environment } from '../environments/environment';
import { CookieService } from "ngx-cookie-service";

@Injectable()
export class UserService {
    private rootURL : string = environment.API.main;
    private listUserURI : string = environment.API.user + 'list';
    private userURI : string = environment.API.video;
    private token: string;
    private httpOptionsWithToken;

    private handleError: HandleError;

    constructor(
        private http: HttpClient,
        httpErrorHandler: HttpErrorHandler,
        private cookieService: CookieService) {

        this.handleError = httpErrorHandler.createHandleError('UserService');
        console.log(environment.API);
        const token = this.cookieService.get("auth-token");
        this.httpOptionsWithToken = {
            headers: new HttpHeaders({
              'Authorization': 'Bearer ' + token,
              'Accept': 'application/json'
            })
          };
      }
    

    getUserList():Observable<Object> {
        return this.http.get<User[]>(this.rootURL+this.listUserURI, this.httpOptionsWithToken);
        
    }

    getUserById(id: String):Observable<Object> {
        return this.http.get<User>(this.rootURL+this.userURI+id, this.httpOptionsWithToken);
    }


    putUpdateUser(id: String, user: User ):Observable<Object> {
        return this.http.put(this.rootURL+this.userURI+id, user, this.httpOptionsWithToken);
    }

    postCreateUser(user: User):Observable<Object> {
        return this.http.post(this.rootURL+this.userURI, user, this.httpOptionsWithToken);
    }

    deleteUser(id: String):Observable<Object> {
        return this.http.delete(this.rootURL+this.userURI+id,this.httpOptionsWithToken);
    }
    
}