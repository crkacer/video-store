import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'user-create',
  templateUrl: './user-creation.component.html',
  styleUrls: ['./user-creation.component.css']
})
export class UserCreationComponent implements OnInit {

  private user: User = {
    firstname: "",
    lastname: "",
    address: "",
    city: "",
    status: "Active",
    mobileNumber: ""
  }

  constructor(
      private userService: UserService,
      private router: Router
  ) { }

  ngOnInit() {
  }

  formValid() {
    return (this.user.firstname !== '' && this.user.lastname !== '' && this.user.address != '' && this.user.mobileNumber !== '');
  }

  createUser(event) {
    console.log(this.user);
    if (this.formValid())
      this.userService.postCreateUser(this.user)
        .subscribe(
            data => {
              console.log(data);
              alert("Create Successfully!");
              this.router.navigateByUrl("/portal/user-management");
            },
            error => alert("Failed to create!")
      );
  }

}
