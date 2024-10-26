// src/services/realTimeService.ts

export const realTimeService = {
    connect: (onNewNotification: (notification: any) => void) => {
      const ws = new WebSocket('wss://example.com/notifications');
      ws.onmessage = event => onNewNotification(JSON.parse(event.data));
    },
    disconnect: () => {
      if (ws) ws.close();
    },
  };
  