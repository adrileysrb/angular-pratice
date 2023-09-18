import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthenticationService } from './service/authentication.service';
import { NotificationService } from './service/notification.service';
import { Router } from '@angular/router';
import { NotificationType } from './enum/notification-type.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  
  public items: MenuItem[] | undefined;

  ngOnInit(): void {
    this.items = [
      {
          label: 'Users',
          //icon: 'pi pi-fw pi-power-off',
          routerLink:"/user/management"
      },
      {
          label: 'Password Reset',
          //icon: 'pi pi-fw pi-power-off',
          routerLink:"/resetpassword"
      }
    ];
  }

  constructor(private authenticationService: AuthenticationService, private notificationService: NotificationService, private router: Router){}

  public onLogOut(): void {
    this.authenticationService.logOut();
    this.router.navigate(['/login']);
    this.sendNotification(NotificationType.SUCCESS, `You've been successfully logged out`);
  }
  
  private sendNotification(notificationType: NotificationType, message: string): void {
    if (message) {
      this.notificationService.notify(notificationType, message);
    } else {
      this.notificationService.notify(notificationType, 'An error occurred. Please try again.');
    }
  }

}
