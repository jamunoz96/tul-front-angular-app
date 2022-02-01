import { Injectable } from '@angular/core';
import { NzNotificationPlacement, NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private notification: NzNotificationService) { }

  createNotification(type: string, title: string, message: string, position: NzNotificationPlacement = "topRight"): void {
    this.notification.create(
      type,
      title,
      message,
      { nzPlacement: position }
    );
  }

}
