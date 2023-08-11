import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { User } from '../model/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {

  public user: User = new User();

  constructor(private authenticationService: AuthenticationService){}

  ngOnInit(): void {
    let user = this.authenticationService.getUserFromLocalCache();
    if(user){
      this.user = user;
    }
  }

  ngOnDestroy(): void {
    
  }


}
