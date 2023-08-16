import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../service/authentication.service';
import { UserService } from '../service/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CustomHttpResponse } from '../model/custom-http-response';
import { NgForm } from '@angular/forms';
import { NotificationService } from '../service/notification.service';
import { NotificationType } from '../enum/notification-type.enum';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {

  private subscriptions: Subscription[] = [];

  public loading: boolean = false;

  constructor(
    private userService: UserService,
    private notificationService: NotificationService
    ) {}

  resetPassword(resetPasswordForm: NgForm) {
    this.loading = true;
    this.subscriptions.push(
      this.userService.resetPassword(resetPasswordForm.value.email).subscribe({
        next: (response: CustomHttpResponse) => {
          this.notificationService.notify(NotificationType.SUCCESS, response.message);
          this.loading = false;
        },
        error: (errorResponse: HttpErrorResponse) => {
          this.notificationService.notify(NotificationType.ERROR, errorResponse.error.message);
          this.loading = false;
        }
      })
    );
  }

}
