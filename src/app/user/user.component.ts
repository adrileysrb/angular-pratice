import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { User } from '../model/user';
import { MenuItem } from 'primeng/api';
import { UserService } from '../service/user.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { Role } from '../enum/role.enum';

interface City {
  name: string;
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {

  public user: User = new User();

  public users: User[] = [];

  private subscriptions: Subscription[] = [];
  visible: boolean = false;
  visible2: boolean = false;
  cities!: City[];
  userProfileForm!: FormGroup;

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

    this.userProfileForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      username: new FormControl(''),
      email: new FormControl(''),
      role: new FormControl<Role | null>(null),
      active: new FormControl<boolean | null>(null),
      unlocked: new FormControl<boolean | null>(null)
    });
    
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

  showDialog(user: User) {
    this.user = user;
    const valuesForm = {
      firstName: this.user?.firstName,
      lastName:  this.user?.lastName,
      username:  this.user?.username,
      email:  this.user?.email,
      role:  this.user?.role,
      active:  this.user?.active,
      unlocked:  this.user?.notLocked
    }
    console.log(valuesForm)
    this.userProfileForm.setValue(valuesForm);
    
    this.visible = true;
  }

  showDialog2(user: User) {
    this.visible2 = true;
  }
  
  doIt() {

  }

  onLogOut() {
  
  }

  onProfileImageChange($event: Event) {
  
  }
}
