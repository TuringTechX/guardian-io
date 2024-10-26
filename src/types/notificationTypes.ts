// guardian-io/src/types/notificationTypes.ts
export interface NotificationData {
    id: string;
    message: string;
    type: 'info' | 'warning' | 'error';
    date: string;
  }
  