import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationService {
  async sendNotification(userId: number, message: string) {
  }
}

