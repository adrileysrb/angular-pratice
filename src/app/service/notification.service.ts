import { Injectable } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { NotificationType } from '../enum/notification-type.enum';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private notifierService: NotifierService) { }

  public notify(type: NotificationType, message: string){
    if(message){
      this.notifierService.notify(type, message);
    } else {
      this.notifierService.notify(type, "Internal error has been occurred! Try again later.");
    }
    
  }
}
