import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, UrlSegment } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../models/user';

@Component({
  selector: 'user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  user: User;
  userID: String;

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit() {

     // this.videoID = this.activatedRoute.url.value[1].path;
     this.userID = this.activatedRoute.snapshot.params.id;
     console.log(this.userID);
 
     this.userService.getUserById(this.userID)
       .subscribe(user => { this.user = user; console.log(user)});

  }

    formValid() {
        return (this.user.firstname !== '' && this.user.lastname !== '' && this.user.address != '' && this.user.mobileNumber !== '');
    }

  updateUser(event, id) {
    if (this.formValid()) {

        console.log(this.user);
        this.userService.putUpdateUser(id, this.user)
            .subscribe(
                data => {
                    console.log(data);
                    alert("Update Successfully!");
                    this.router.navigateByUrl("/portal/user-management");
                },
                error => alert("Failed to update!")
            );
    }

  }

}
