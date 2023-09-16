import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserService } from '../service/user.service';
import { User } from '../model/user';
import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { NotificationType } from '../enum/notification-type.enum';
import { FileUploadStatus } from '../model/file-upload-status';
import { NotificationService } from '../service/notification.service';
import { AuthenticationService } from '../service/authentication.service';
import { Role } from '../enum/role.enum';
import { Router } from '@angular/router';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';

interface City {
  name: string;
}

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit{

  cities!: City[];
  userProfileForm!: FormGroup;

  private subscriptions: Subscription[] = [];
  public user!: User | null;
  public profileImage!: File;
  public fileStatus = new FileUploadStatus();
  public fileName!: string;

  constructor(private userService: UserService,
     private notificationService: NotificationService,
     private authenticationService: AuthenticationService,
     private router: Router,
     private confirmationService: ConfirmationService,
      private messageService: MessageService){}

  ngOnInit(): void {
    
    this.userProfileForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      username: new FormControl(''),
      email: new FormControl(''),
      role: new FormControl<Role | null>(null),
      active: new FormControl<boolean | null>(null),
      unlocked: new FormControl<boolean | null>(null)
    });

    this.user = this.authenticationService.getUserFromLocalCache();
    console.log(this.user);

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
  }

  doIt() {
    console.log(this.userProfileForm.get('active')?.value)
  }
  
  public onProfileImageChange(event: Event): void {
    const target = event.target as HTMLInputElement;
      const files = target.files as FileList;
    this.profileImage = files[0];
    this.onUpdateProfileImage();
  }

  public onUpdateProfileImage(): void {
    const formData = new FormData();
    formData.append('username', this.user!.username);
    formData.append('profileImage', this.profileImage);
    console.log(this.user?.profileImageUrl)
    this.subscriptions.push(
      this.userService.updateProfileImage(formData).subscribe(
        (event: HttpEvent<any>) => {
          this.reportUploadProgress(event);
        },
        (errorResponse: HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
          this.fileStatus.status = 'done';
        }
      )
    );
  }

  private reportUploadProgress(event: HttpEvent<any>): void {
    switch (event.type) {
      case HttpEventType.UploadProgress:
        this.fileStatus.percentage = Math.round(100 * event.loaded / event.total!);
        this.fileStatus.status = 'progress';
        break;
      case HttpEventType.Response:
        if (event.status === 200) {
          this.user!.profileImageUrl = `${event.body.profileImageUrl}?time=${new Date().getTime()}`;
          this.sendNotification(NotificationType.SUCCESS, `${event.body.firstName}\'s profile image updated successfully`);
          this.fileStatus.status = 'done';
          break;
        } else {
          this.sendNotification(NotificationType.ERROR, `Unable to upload image. Please try again`);
          break;
        }
      default:
        `Finished all processes`;
    }
    
  }

  private sendNotification(notificationType: NotificationType, message: string): void {
    if (message) {
      this.notificationService.notify(notificationType, message);
    } else {
      this.notificationService.notify(notificationType, 'An error occurred. Please try again.');
    }
  }

  public onLogOut(): void {
    this.authenticationService.logOut();
    this.router.navigate(['/login']);
    this.sendNotification(NotificationType.SUCCESS, `You've been successfully logged out`);
  }

  confirm1() {
    this.confirmationService.confirm({
        message: 'Are you sure that you want to proceed?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'You have accepted' });
        },
        reject: (type: ConfirmEventType) => {
            switch (type) {
              case ConfirmEventType.REJECT:
                this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
                break;
              case ConfirmEventType.CANCEL:
                this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
                break;
            }
        }
    });
}

}
