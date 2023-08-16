import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { User } from '../model/user';
import { MenuItem } from 'primeng/api';
import { UserService } from '../service/user.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {

  public user: User = new User();

  public users: User[] = [];

  private subscriptions: Subscription[] = [];

  constructor(private authenticationService: AuthenticationService, private userService: UserService){}

  ngOnInit(): void {
    let user = this.authenticationService.getUserFromLocalCache();
    if(user){
      this.user = user;
    }

    this.subscriptions.push(
      this.userService.getUsers().subscribe({
        next: (response: User[]) => {
          this.users = response;
        },
        error: (e) => {
          console.log(e);
        },
        complete: () => {
          console.log('done');
        }      
      })
    ); 

  }

  getSeverity(status: boolean) {
    switch (status) {
      case true:
        return 'success';
      case false:
        return 'danger';
      default:
        return '';
    }
  }

  getStatusDescription(status: boolean): string{
    switch (status) {
      case true:
        return 'Active';
      case false:
        return 'Inactive';
      default:
        return '';
    }
  }

  ngOnDestroy(): void {
    
  }


}
