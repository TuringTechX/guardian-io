// src/services/WebSocketAPI.ts

export class WebSocketAPI {
    private static instance: WebSocketAPI;
    private socket: WebSocket | null = null;
    private url: string;
    private reconnectAttempts = 0;
    private maxReconnectAttempts = 10;
    private isConnected = false;
    private listeners: { [key: string]: (data: any) => void } = {};
    private messageQueue: string[] = []; // Queue to hold messages when offline
  
    // Backoff settings
    private initialReconnectDelay = 1000; // Initial delay in ms
    private maxReconnectDelay = 30000; // Maximum delay
  
    private constructor(url: string) {
      this.url = url;
    }
  
    // Singleton pattern for a single WebSocket instance
    public static getInstance(url: string): WebSocketAPI {
      if (!WebSocketAPI.instance) {
        WebSocketAPI.instance = new WebSocketAPI(url);
      }
      return WebSocketAPI.instance;
    }
  
    // Connect to WebSocket with event listeners for handling connection status
    public connect(): void {
      this.socket = new WebSocket(this.url);
  
      this.socket.onopen = () => {
        this.isConnected = true;
        this.reconnectAttempts = 0;
        this.flushMessageQueue();
        console.info("WebSocket connected.");
      };
  
      this.socket.onmessage = (event) => {
        const messageData = JSON.parse(event.data);
        this.handleMessage(messageData);
      };
  
      this.socket.onclose = () => {
        this.isConnected = false;
        console.warn("WebSocket closed. Attempting to reconnect...");
        this.reconnectWithBackoff();
      };
  
      this.socket.onerror = (error) => {
        console.error("WebSocket error:", error);
        this.isConnected = false;
        this.socket?.close();
      };
    }
  
    // Send messages or queue them if the connection is offline
    public sendMessage(message: any): void {
      const messageString = JSON.stringify(message);
      if (this.isConnected && this.socket) {
        this.socket.send(messageString);
      } else {
        this.messageQueue.push(messageString);
      }
    }
  
    // Registers listeners for specific message types
    public addListener(eventType: string, callback: (data: any) => void): void {
      this.listeners[eventType] = callback;
    }
  
    // Removes listeners for a specific message type
    public removeListener(eventType: string): void {
      delete this.listeners[eventType];
    }
  
    // Handles incoming messages and dispatches to appropriate listeners
    private handleMessage(data: any): void {
      const eventType = data.type;
      const listener = this.listeners[eventType];
      if (listener) {
        listener(data.payload);
      } else {
        console.warn(`No listener registered for event type: ${eventType}`);
      }
    }
  
    // Reconnect with an exponential backoff strategy
    private reconnectWithBackoff(): void {
      if (this.reconnectAttempts >= this.maxReconnectAttempts) {
        console.error("Max reconnect attempts reached. WebSocket will not reconnect.");
        return;
      }
  
      const delay = Math.min(
        this.initialReconnectDelay * Math.pow(2, this.reconnectAttempts),
        this.maxReconnectDelay
      );
  
      setTimeout(() => {
        this.reconnectAttempts++;
        console.info(`Reconnecting... Attempt ${this.reconnectAttempts}`);
        this.connect();
      }, delay);
    }
  
    // Flushes queued messages once reconnected
    private flushMessageQueue(): void {
      while (this.messageQueue.length > 0 && this.isConnected) {
        const message = this.messageQueue.shift();
        if (message && this.socket) {
          this.socket.send(message);
        }
      }
    }
  
    // Disconnect WebSocket explicitly
    public disconnect(): void {
      if (this.socket) {
        this.socket.close();
        this.socket = null;
        this.isConnected = false;
        console.info("WebSocket disconnected.");
      }
    }
  }
  