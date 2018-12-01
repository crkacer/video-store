import {Component, OnInit, Input, ViewChild, TemplateRef} from '@angular/core';
import {UserService} from '../user.service';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { TableModel, TableItem, TableHeaderItem } from "carbon-components-angular";


interface UserData {
  users ?: User[],
  offset ?: number,
  count ?: number
}

const tableHeader: Array<TableHeaderItem> = [
  new TableHeaderItem({ data: "First Name" }),
  new TableHeaderItem({ data: "Last Name" }),
  new TableHeaderItem({ data: "Address" }),
  new TableHeaderItem({ data: "City" }),
  new TableHeaderItem({ data: "Status" }),
  new TableHeaderItem({ data: "Mobile Number" }),
  new TableHeaderItem({ data: "Update" }),
  new TableHeaderItem({ data: "Delete" })
]

@Component({
  selector: 'user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {

  constructor(
      private router: Router,
      private userService: UserService
  ) {}

  userData: UserData = {};
  loading=  true;

  @Input() userTable = new TableModel();

  @ViewChild("UpdateTemplateRef") updateRef: TemplateRef<any>;
  @ViewChild("DeleteTemplateRef") deleteRef: TemplateRef<any>;


  ngOnInit() {
    this.getListUser();
  }

  getListUser() {
    this.userTable.pageLength = 10;
    this.userService.getUserList()
        .subscribe(
            data => {
              this.userData = {users: data, offset: 0, count: data.length};
              this.userTable.data = this.generateContent(
                  this.userData.users
              );
              this.userTable.totalDataLength = this.userData.count;
              this.selectPage(1);
              this.userTable.header = tableHeader;
              this.loading = false;
            },
            error => console.log(error)
        );
  }

  deleteUser(id) {
    console.log(id);
    const confrm = confirm("Are you sure to delete User?");

    if (confrm) {

      this.userService.deleteUser(id)
          .subscribe(
              data => console.log(data),
              error => console.log(error)
          );
    }
  }

  updateFilter(event) {
    const search = event.target.value;
    this.userTable.header = tableHeader;
    this.userTable.data = this.generateContent(this.userData.users)
        .filter(data => data.reduce((acc, cell, i) =>
                (acc || cell.data.toString().toLowerCase().includes(search && search.toLowerCase()))
            , false)
        );
  }
  generateContent(users) {
    console.log(users);
    return users.map(user =>
        [
          new TableItem({ data: user.firstname }),
          new TableItem({ data: user.lastname }),
          new TableItem({ data: user.address }),
          new TableItem({ data: user.city }),
          new TableItem({ data: user.status }),
          new TableItem({ data: user.mobileNumber}),
          new TableItem({ data: user._id, template: this.updateRef }),
          new TableItem({data: user._id, template: this.deleteRef})
        ]
    );
  }

  customSort(index: number) {
    this.sort(this.userTable, index);
  }

  sort(model, index: number) {
    if (model.header[index].sorted) {
      model.header[index].ascending = model.header[index].descending;
    }
    model.sort(index);
  }
  getPage(page: number) {
    const line = data => data && data.map(column => {
      return { data: column.data, template: column.template };
    })

    const fullPage = [];

    for (let i = (page - 1) * this.userTable.pageLength; (i < page * this.userTable.pageLength && i < this.userTable.totalDataLength); i++) {
      fullPage.push(line(this.userTable.data[i]));
    }

    return new Promise(resolve =>
        setTimeout(() => resolve(fullPage), 10)
    );
  }

  updateUser(id) {
    this.router.navigateByUrl('/portal/user-edit/' + id);
  }
  selectPage(page) {
    this.getPage(page).then((data: Array<Array<any>>) => {
      this.userTable.data = this.prepareData(data);
      this.userTable.currentPage = page;
    });
  }
  prepareData(data: Array<Array<any>>) {
    let newData = [];
    data.forEach(dataRow => {
      let row = [];
      if (dataRow)
        dataRow.forEach(dataElement =>
            row.push( new TableItem({data: dataElement.data, template: dataElement.template })
            ));
      newData.push(row);
    });
    return newData;
  }


}
